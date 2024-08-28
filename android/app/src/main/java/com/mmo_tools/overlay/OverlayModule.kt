package com.mmo_tools.overlay

import android.accessibilityservice.AccessibilityServiceInfo
import android.content.Context
import android.content.Intent
import android.os.Build
import android.provider.Settings
import android.util.Log
import android.view.Gravity
import android.view.WindowManager
import android.view.accessibility.AccessibilityManager
import android.widget.Button
import android.widget.LinearLayout
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule

class OverlayModule(private val reactContext: ReactApplicationContext) :
        ReactContextBaseJavaModule(reactContext) {

    private var overlayLayout: LinearLayout? = null
    private val windowManager: WindowManager by lazy {
        reactContext.applicationContext.getSystemService(Context.WINDOW_SERVICE) as WindowManager
    }
    private var toggleButton: Button? = null
    private var likeButton: Button? = null
    private var isStarted = false
    private var isShowLikePosition = false

    override fun getName(): String {
        return "OverlayModule"
    }

    @ReactMethod
    fun startOverlay() {
        val context = reactContext.applicationContext

        if (overlayLayout != null) {
            return
        }

        val params =
                WindowManager.LayoutParams(
                        WindowManager.LayoutParams.WRAP_CONTENT,
                        WindowManager.LayoutParams.WRAP_CONTENT,
                        WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY,
                        WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE,
                        android.graphics.PixelFormat.TRANSLUCENT
                )
        params.gravity = Gravity.TOP or Gravity.START

        overlayLayout =
                LinearLayout(context).apply {
                    orientation = LinearLayout.VERTICAL
                    gravity = Gravity.TOP
                    setPadding(16, 16, 16, 16)
                }
        likeButton =
                Button(context).apply {
                    this.text = "Vị trí like"
                    this.setOnClickListener {
                        if (isShowLikePosition) {
                            sendHideLikePosition(context)
                            isShowLikePosition = false
                        } else {
                            sendShowLikePosition(context)
                            isShowLikePosition = true
                        }
                    }
                }
        toggleButton =
                Button(context).apply {
                    this.text = "Start"
                    this.setOnClickListener {
                        if (isStarted) {
                            sendEvent("onStopEvent", null)
                            isStarted = false
                            overlayLayout?.addView(likeButton)
                            stopOverlay()
                        } else {
                            this.text = "Stop"
                            sendHideLikePosition(context)
                            overlayLayout?.removeView(likeButton)
                            sendEvent("onStartEvent", null)
                            isStarted = true
                        }
                    }
                }

        overlayLayout?.addView(toggleButton)
        overlayLayout?.addView(likeButton)
        windowManager.addView(overlayLayout, params)
    }

    @ReactMethod
    fun stopOverlay() {
        overlayLayout?.let {
            windowManager.removeView(it)
            overlayLayout = null
        }
    }

    @ReactMethod
    fun checkOverlayPermission(promise: Promise) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (Settings.canDrawOverlays(reactApplicationContext)) {
                promise.resolve(true)
            } else {
                promise.resolve(false)
            }
        } else {
            promise.resolve(true) // quyền overlay được mặc định cấp trên Android thấp hơn M
        }
    }

    private fun sendEvent(eventName: String, params: WritableMap?) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(eventName, params)
    }

    @ReactMethod
    fun isAccessibilityServiceEnabled(promise: Promise) {
        try {
            val accessibilityManager =
                    reactApplicationContext.getSystemService(Context.ACCESSIBILITY_SERVICE) as
                            AccessibilityManager
            val enabledServices =
                    accessibilityManager.getEnabledAccessibilityServiceList(
                            AccessibilityServiceInfo.FEEDBACK_ALL_MASK
                    )

            val packageName = reactApplicationContext.packageName
            val isServiceEnabled =
                    enabledServices.any { it.resolveInfo.serviceInfo.packageName == packageName }

            promise.resolve(isServiceEnabled)
        } catch (e: Exception) {
            promise.reject("ERROR_ACCESSIBILITY_CHECK", "Error checking accessibility service", e)
        }
    }

    @ReactMethod
    fun openAccessibilitySettings() {
        try {
            val intent = Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS)
            intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
            reactApplicationContext.startActivity(intent)
        } catch (e: Exception) {
            Log.e("AccessibilityServiceModule", "Error opening accessibility settings", e)
        }
    }
    @ReactMethod
    fun changeStatusApp(status: Boolean) {
        isStarted = status
    }

    fun sendShowLikePosition(context: Context) {
        val intent = Intent("com.mmo_tools.showLikePosition")
        context.sendBroadcast(intent)
    }
    fun sendHideLikePosition(context: Context) {
        val intent = Intent("com.mmo_tools.hideLikePosition")
        context.sendBroadcast(intent)
    }
}
