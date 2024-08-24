package com.mmo_tools.accessibility

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import android.content.Context
import android.content.Intent
import android.accessibilityservice.AccessibilityService

class AccessibilityModule(private val  reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "AccessibilityModule"
    }

    @ReactMethod
    fun clickButtonOnOtherApp(buttonText: String) {
        val intent = Intent("com.mmo_tools.accessibility.ACTION_CLICK_BUTTON")
        intent.putExtra("BUTTON_TEXT", buttonText)
        reactContext.sendBroadcast(intent)
    }
    @ReactMethod
    fun sendDataToNative(data: String) {
        // Xử lý dữ liệu từ React Native
        println("Received data from React Native: $data")
    }
}