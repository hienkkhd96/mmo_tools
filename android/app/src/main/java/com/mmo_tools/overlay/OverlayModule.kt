package com.mmo_tools.overlay

import android.content.Context
import android.content.Intent
import android.graphics.Color
import android.net.Uri
import android.os.Build
import android.provider.Settings
import android.view.Gravity
import android.view.WindowManager
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Callback
import android.view.MotionEvent

class OverlayModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private var overlayLayout: LinearLayout? = null
    private val windowManager: WindowManager by lazy {
        reactContext.applicationContext.getSystemService(Context.WINDOW_SERVICE) as WindowManager
    }

    private var onStartCallback: Callback? = null
    private var onStopCallback: Callback? = null

    init {
        // Request permissions if necessary
        requestOverlayPermission()
    }

    override fun getName(): String {
        return "OverlayModule"
    }

    @ReactMethod
    fun startOverlay(onStart: Callback) {
        val context = reactContext.applicationContext

        if (overlayLayout != null) {
            stopOverlay() // Ensure any existing overlay is removed
        }

        onStartCallback = onStart

        val params = WindowManager.LayoutParams(
            WindowManager.LayoutParams.WRAP_CONTENT,
            WindowManager.LayoutParams.WRAP_CONTENT,
            WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY,
            WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE,
            android.graphics.PixelFormat.TRANSLUCENT
        )
        params.gravity = Gravity.TOP or Gravity.START
        overlayLayout = LinearLayout(context).apply {
            orientation = LinearLayout.VERTICAL
            gravity = Gravity.TOP
            setPadding(16, 16, 16, 16) // Padding to avoid edge touching
        }

        val buttonLayout = LinearLayout(context).apply {
            orientation = LinearLayout.HORIZONTAL
            gravity = Gravity.TOP
            
            layoutParams = LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.WRAP_CONTENT
            )
        }

        val startButton = Button(context).apply {
            this.text = "Start"
            this.setOnClickListener {
                // Invoke the JavaScript callback when the "Start" button is clicked
                onStartCallback?.invoke()
            }
        }

        val stopButton = Button(context).apply {
            this.text = "Stop"
            this.setOnClickListener {
                stopOverlay()
            }
        }

        buttonLayout.addView(startButton)
        buttonLayout.addView(stopButton)

        overlayLayout?.addView(buttonLayout)
        windowManager.addView(overlayLayout, params)
        overlayLayout?.setOnTouchListener { v, event ->
            if (event.action == MotionEvent.ACTION_DOWN) {
                if (event.rawY <= buttonLayout.bottom) {
                    return@setOnTouchListener false
                }
                return@setOnTouchListener true
            }
            false
        }
    }

    @ReactMethod
    fun stopOverlay() {
        overlayLayout?.let {
            windowManager.removeView(it)
            overlayLayout = null
        }
    }

    private fun requestOverlayPermission() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && !Settings.canDrawOverlays(reactContext)) {
            val intent = Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION, Uri.parse("package:${reactContext.packageName}"))
            reactContext.startActivity(intent)
        }
    }
}
