

import android.accessibilityservice.AccessibilityService
import android.view.accessibility.AccessibilityEvent
import android.view.accessibility.AccessibilityNodeInfo

class MyAccessibilityService : AccessibilityService() {
    
    override fun onAccessibilityEvent(event: AccessibilityEvent?) {
        if (event?.eventType == AccessibilityEvent.TYPE_WINDOW_CONTENT_CHANGED) {
            performFollowAction()
        }
    }

    override fun onInterrupt() {
        // Xử lý khi dịch vụ bị ngắt
    }

    private fun performFollowAction() {
        val rootNode: AccessibilityNodeInfo? = rootInActiveWindow
        rootNode?.let { node ->
            val followButtonId = "com.zhiliaoapp.musically:id/follow_button" // ID của nút "Follow"
            val nodes = findNodesByViewId(node, followButtonId)
            if (nodes.isNotEmpty()) {
                nodes[0].performAction(AccessibilityNodeInfo.ACTION_CLICK)
            }
        }
    }

    private fun findNodesByViewId(rootNode: AccessibilityNodeInfo, viewId: String): List<AccessibilityNodeInfo> {
        val result = mutableListOf<AccessibilityNodeInfo>()
        val stack = mutableListOf(rootNode)
        while (stack.isNotEmpty()) {
            val node = stack.removeAt(stack.size - 1)
            if (node.viewIdResourceName == viewId) {
                result.add(node)
            }
            for (i in 0 until node.childCount) {
                node.getChild(i)?.let { stack.add(it) }
            }
        }
        return result
    }
}
