package com.mmo_tools.accessibility

import android.content.Intent
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class AccessibilityModule(private val reactContext: ReactApplicationContext) :
        ReactContextBaseJavaModule(reactContext) {
    public var data: String? = null

    override fun getName(): String {
        return "AccessibilityModule"
    }

    @ReactMethod
    fun clickButtonOnOtherApp() {
        val intent = Intent("com.mmo_tools.accessibility.ACTION_CLICK_BUTTON")
        intent.putExtra("data_mmo", this.data)
        reactContext.sendBroadcast(intent)
    }
    @ReactMethod
    fun sendDataToNative(data: String) {
        this.data = data
    }

    @ReactMethod
    fun stopAutoCollect() {
        val intent = Intent("com.mmo_tools.accessibility.STOP_AUTO_COLLECT")
        intent.putExtra("data_mmo", this.data)
        reactContext.sendBroadcast(intent)
    }
}
