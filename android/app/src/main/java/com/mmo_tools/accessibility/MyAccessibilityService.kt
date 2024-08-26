package com.mmo_tools.accessibility

import CompleteJobPayload
import TiktokJobResponse
import android.accessibilityservice.AccessibilityService
import android.accessibilityservice.GestureDescription
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.graphics.Path
import android.graphics.Rect
import android.net.Uri
import android.util.Log
import android.view.accessibility.AccessibilityEvent
import android.view.accessibility.AccessibilityNodeInfo
import com.google.gson.Gson
import golikeService
import kotlinx.coroutines.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import android.widget.Button
import android.widget.ImageView
import android.view.View
import android.view.WindowMetrics
import android.view.WindowManager
import android.view.WindowInsets
data class FormField(
        val platform: String,
        val platformAccount: String,
        val channel: String,
        val workAccount: String,
        val stopBeforeSuccess: Int,
        val stopBeforeError: Int,
        val timeDelay: Int
)

class MyAccessibilityService : AccessibilityService() {
    public var appData: FormField? = null
    public var isStoped: Boolean = false
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
                        isStoped = false
                        val data = intent.getStringExtra("data_mmo").toString()
                        val gson = Gson()
                        val appForm = gson.fromJson(data, FormField::class.java)
                        appData = appForm
                        handleAutoCollect()
                    } else if (intent.action == "com.mmo_tools.accessibility.STOP_AUTO_COLLECT") {
                        isStoped = true
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
        registerReceiver(
                receiver,
                IntentFilter("com.mmo_tools.accessibility.STOP_AUTO_COLLECT"),
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
    private fun handleAutoCollect() {
        if (appData == null || isStoped) {
            return
        }
        val (screenWidth, screenHeight) = getScreenSize()
        val dataCollector = appData
        val account_id = dataCollector?.workAccount
        if (account_id == null) {
            return
        }
        val call =
                golikeService.getJobs(
                        null,
                        accountId = account_id,
                        authHeader = "Bearer ${dataCollector?.platformAccount}"
                )
        call.enqueue(
                object : Callback<TiktokJobResponse> {
                    override fun onResponse(
                            call: Call<TiktokJobResponse>,
                            response: Response<TiktokJobResponse>
                    ) {
                        if (response.isSuccessful) {
                            val job = response.body()
                            val type = job?.data?.type
                            val objectId = job?.data?.object_id
                            val job_id = job?.data?.id
                            if (type == null || objectId == null || job_id == null) {
                                return
                            }
                            if (type == "like") {
                                openSchemaUrl(url = "tiktok://aweme/detail/$objectId")
                                delay(2000)
                                performClickOnTarget("com.ss.android.ugc.trill:id/d8k",type="byId")
                            } else if (type == "follow") {
                                openSchemaUrl(url = "tiktok://profile?id=$objectId")
                                delay(2000)
                                performClickOnTarget("com.ss.android.ugc.trill:id/cu9",type="byId")
                            }
                            delay(2000)
                            completeJob(account_id, job_id.toString())
                            delay(10000)
                            if (!isStoped) {
                                handleAutoCollect()
                            }
                        } else {

                            println("Request failed with status: ${response.code()}")
                        }
                    }

                    override fun onFailure(call: Call<TiktokJobResponse>, t: Throwable) {
                        println("Error: ${t.message}")
                    }
                }
        )
    }
    private fun performClickOnTarget(buttonText: String,type:String) {
        val cellSize = 40
        val rootNode: AccessibilityNodeInfo? = rootInActiveWindow
        rootNode?.let {
            var nodes:List<AccessibilityNodeInfo>?
            if (type ==="byId") {
                nodes = findNodesByViewId(buttonText)
            } else {
                nodes = findNodesByText(rootNode,buttonText)
            }
         
            if (nodes.isNotEmpty()) {
                val nodeToClick = nodes[0]
                if (type === "byId") {
                    Log.d("MyAccessibilityService", "Clicking node: ${nodeToClick.text}")
                    val (buttonX, buttonY) = getViewPositionOnScreen(nodeToClick)
                    val buttonXCell = getCellIndex(buttonX, cellSize)
                    val buttonYCell = getCellIndex(buttonY, cellSize)
                    println(buttonXCell)
                    println(buttonYCell)
                    autoClick(buttonX, buttonY)

                } else {
                    Log.d("MyAccessibilityService", "Clicking node: ${nodeToClick.text}")
                    val centerX = getCenterX(nodeToClick)
                    val centerY = getCenterY(nodeToClick)
                    autoClick(centerX, centerY)
                }
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
    public fun openSchemaUrl(url: String) {
        println("Opening schema url: ${Uri.parse(url)}")
        val intent = Intent(Intent.ACTION_VIEW).apply { data = Uri.parse(url) }
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
        startActivity(intent)
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
    public fun getViewPositionOnScreen(node:AccessibilityNodeInfo):Pair<Int,Int> {
        val rect = Rect()
        node.getBoundsInScreen(rect)
        val centerX = rect.centerX()
        val centerY = rect.centerY()
        return Pair(centerX, centerY)
    }

    public fun completeJob(account_id: String, job_id: String) {
        if (appData == null) {
            return
        }
        val dataCollector = appData
        val call =
                golikeService.completeJob(
                        CompleteJobPayload(
                                ads_id = job_id,
                                account_id = account_id,
                                async = true,
                                data = null
                        ),
                        authHeader = "Bearer ${dataCollector?.platformAccount}"
                )

        call.enqueue(
                object : Callback<Any> {
                    override fun onResponse(call: Call<Any>, response: Response<Any>) {
                        if (response.isSuccessful) {
                            println("Job completed successfully")
                        } else {
                            println("Request failed with status: ${response.message()}")
                        }
                    }
                    override fun onFailure(call: Call<Any>, t: Throwable) {
                        println("Error: ${t.message}")
                    }
                }
        )
    }
    public fun delay(time: Long) {
        Thread.sleep(time)
    }
    fun getScreenSize(): Pair<Int, Int> {
        val wm = this.getSystemService(Context.WINDOW_SERVICE) as WindowManager
        val windowMetrics: WindowMetrics = wm.currentWindowMetrics
        val insets = windowMetrics.windowInsets.getInsetsIgnoringVisibility(WindowInsets.Type.systemBars())
        
        val width = windowMetrics.bounds.width() - insets.left - insets.right
        val height = windowMetrics.bounds.height() - insets.top - insets.bottom
    
        return Pair(width, height)
    }
    fun getCellIndex(position: Int, cellSize: Int): Int {
        return position / cellSize
    }
    
}
