package com.mmo_tools.overlay

import android.content.Context
import android.view.Gravity
import android.view.WindowManager
import android.widget.Button
import android.widget.LinearLayout
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
    private var isStarted = false

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

        toggleButton =
                Button(context).apply {
                    this.text = "Start"
                    this.setOnClickListener {
                        if (isStarted) {
                            this.text = "Start"
                            sendEvent("onStopEvent", null)
                            isStarted = false
                        } else {
                            this.text = "Stop"
                            sendEvent("onStartEvent", null)
                            isStarted = true
                        }
                    }
                }

        overlayLayout?.addView(toggleButton)
        windowManager.addView(overlayLayout, params)
    }

    @ReactMethod
    fun stopOverlay() {
        overlayLayout?.let {
            windowManager.removeView(it)
            overlayLayout = null
        }
    }

    private fun sendEvent(eventName: String, params: WritableMap?) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(eventName, params)
    }
}
