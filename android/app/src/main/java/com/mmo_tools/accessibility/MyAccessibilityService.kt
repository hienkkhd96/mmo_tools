package com.mmo_tools.accessibility

import android.accessibilityservice.AccessibilityService
import android.accessibilityservice.GestureDescription
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.graphics.Path
import android.graphics.Rect
import android.util.Log
import android.view.accessibility.AccessibilityEvent
import android.view.accessibility.AccessibilityNodeInfo

class MyAccessibilityService : AccessibilityService() {
    companion object {
        private var accessibilityService: MyAccessibilityService? = null

        private fun setAccessibilityService(accessibilityService: MyAccessibilityService) {
            this.accessibilityService = accessibilityService
        }
    }
    private val receiver =
            object : BroadcastReceiver() {
                override fun onReceive(context: Context, intent: Intent) {
                    if (intent.action == "com.mmo_tools.accessibility.ACTION_CLICK_BUTTON") {
                        val buttonText = intent.getStringExtra("BUTTON_TEXT")
                        performClickOnTarget(buttonText ?: "")
                    }
                }
            }

    override fun onCreate() {
        super.onCreate()
        registerReceiver(
                receiver,
                IntentFilter("com.mmo_tools.accessibility.ACTION_CLICK_BUTTON"),
                Context.RECEIVER_EXPORTED
        )
    }

    override fun onDestroy() {
        unregisterReceiver(receiver)
        super.onDestroy()
    }
    override fun onAccessibilityEvent(event: AccessibilityEvent?) {
        // Xử lý sự kiện nếu cần thiết
    }

    override fun onInterrupt() {
        // Xử lý khi dịch vụ bị ngắt
    }
    override fun onServiceConnected() {
        super.onServiceConnected()
        setAccessibilityService(this)
    }
    private fun performClickOnTarget(buttonText: String) {
        val rootNode: AccessibilityNodeInfo? = rootInActiveWindow
        rootNode?.let {
            val nodes = findNodesByViewId(buttonText)
            nodes.forEach(
                    action = { node -> Log.d("MyAccessibilityService", "Found node: ${node.text}") }
            )
            if (nodes.isNotEmpty()) {
                val nodeToClick = nodes[0]
                Log.d("MyAccessibilityService", "Clicking node: ${nodeToClick.text}")
                val centerX = getCenterX(nodeToClick)
                val centerY = getCenterY(nodeToClick)
                autoClick(centerX, centerY)
            } else {
                Log.e("MyAccessibilityService", "Button not found")
            }
        }
                ?: Log.e("MyAccessibilityService", "Root node is null")
    }
    private fun findNodesByViewId(viewId: String): List<AccessibilityNodeInfo> {
        if (accessibilityService == null) {
            return emptyList()
        }
        val root: AccessibilityNodeInfo? = accessibilityService?.rootInActiveWindow
        root.let {
            val nodes = root?.findAccessibilityNodeInfosByViewId(viewId)
            if (nodes == null) {
                return emptyList()
            }
            return nodes
        }
    }
    private fun findNodesByText(
            rootNode: AccessibilityNodeInfo,
            text: String
    ): List<AccessibilityNodeInfo> {
        val result = mutableListOf<AccessibilityNodeInfo>()
        val stack = mutableListOf(rootNode)
        while (stack.isNotEmpty()) {
            val node = stack.removeAt(stack.size - 1)
            if (node.text?.toString() == text) {
                result.add(node)
            }
            for (i in 0 until node.childCount) {
                node.getChild(i)?.let { stack.add(it) }
            }
        }
        return result
    }
    fun autoClick(x: Int, y: Int) {
        val gestureBuilder = GestureDescription.Builder()
        val path = Path().apply { moveTo(x.toFloat(), y.toFloat()) }
        gestureBuilder.addStroke(GestureDescription.StrokeDescription(path, 0, 100))
        dispatchGesture(gestureBuilder.build(), null, null)
    }

    public fun getCenterX(node: AccessibilityNodeInfo): Int {
        val rect = Rect()
        node.getBoundsInScreen(rect)
        val centerX = rect.centerX()
        return centerX.toInt()
    }
    public fun getCenterY(node: AccessibilityNodeInfo): Int {
        val rect = Rect()
        node.getBoundsInScreen(rect)
        val centerY = rect.centerY()
        return centerY.toInt()
    }
}
