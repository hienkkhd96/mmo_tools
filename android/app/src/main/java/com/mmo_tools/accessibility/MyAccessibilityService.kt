package com.mmo_tools.accessibility

import CompleteJobPayload
import SkipJobPayload
import TiktokJobResponse
import android.accessibilityservice.AccessibilityService
import android.accessibilityservice.GestureDescription
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.content.SharedPreferences
import android.graphics.Path
import android.graphics.PixelFormat
import android.graphics.Point
import android.graphics.Rect
import android.net.Uri
import android.os.Build
import android.util.Log
import android.view.Gravity
import android.view.LayoutInflater
import android.view.MotionEvent
import android.view.View
import android.view.WindowInsets
import android.view.WindowManager
import android.view.WindowMetrics
import android.view.accessibility.AccessibilityEvent
import android.view.accessibility.AccessibilityNodeInfo
import android.widget.TextView
import com.google.gson.Gson
import com.mmo_tools.R
import kotlinx.coroutines.*
import kotlinx.coroutines.delay
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import android.util.DisplayMetrics
import com.mmo_tools.interfaces.platforms.PlatformFactory
import com.mmo_tools.interfaces.platforms.PlatformService



data class FormField(
        val platform: String,
        val platformAccount: String,
        val channel: String,
        val workAccount: String,
        val stopAfterSuccess: Int,
        val stopAfterError: Int,
        val timeDelay: Long
)

interface JobCallback {
    fun onSuccess()
    fun onFailure()
}

class MyAccessibilityService : AccessibilityService() {
    public var appData: FormField? = null
    public var isStoped: Boolean = false
    public var rowSize: Int = 0
    public var columnSize: Int = 0
    public val positionFollow: Pair<Int, Int> = Pair(31, 38)
    public val positionLike: Pair<Int, Int> = Pair(100, 6)
    public var successJob: Int = 0
    public var failedJob: Int = 0
    private var currentToastView: View? = null
    private val jobScope = CoroutineScope(Dispatchers.Main + Job())
    private lateinit var floatingView: View
    private lateinit var windowManager: WindowManager
    private lateinit var sharedPreferences: SharedPreferences
    private lateinit var platformService: PlatformService
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
                        successJob = 0
                        failedJob = 0
                        showCustomToast("App đang chạy", autoClose = false)
                        handleAutoCollect()
                    } else if (intent.action == "com.mmo_tools.accessibility.STOP_AUTO_COLLECT") {
                        showCustomToast("App đang dừng", autoClose = true)
                        isStoped = true
                    }
                }
            }

    override fun onAccessibilityEvent(event: AccessibilityEvent?) {
        if (isStoped) return
    }
    override fun onServiceConnected() {
        super.onServiceConnected()
        setAccessibilityService(this)
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
        jobScope.cancel()
        unregisterReceiver(receiver)
        super.onDestroy()
    }

    fun showCustomToast(message: String, autoClose: Boolean) {
        // Inflate custom toast layout
        val inflater = LayoutInflater.from(this)
        val toastView = inflater.inflate(R.layout.custom_toast_layout, null)
        toastView.keepScreenOn = true
        // Set the message on the toast
        val textView = toastView.findViewById<TextView>(R.id.toast_message)
        val successView = toastView.findViewById<TextView>(R.id.success_job)
        successView.text = "Thành công: $successJob"
        val failedView = toastView.findViewById<TextView>(R.id.failed_job)
        failedView.text = "Thất bại: $failedJob"
        textView.text = message

        // Create and configure the WindowManager parameters
        val windowManager = getSystemService(WINDOW_SERVICE) as WindowManager

        // Nếu có một toastView hiện tại đang được hiển thị, loại bỏ nó
        currentToastView?.let {
            try {
                windowManager.removeView(it)
            } catch (e: IllegalArgumentException) {
                // Log lỗi nhưng không làm gì
                Log.e("MyAccessibilityService", "Failed to remove view from WindowManager", e)
            }
        }

        // Cập nhật biến currentToastView với toast mới
        currentToastView = toastView

        val params =
                WindowManager.LayoutParams(
                        WindowManager.LayoutParams.WRAP_CONTENT,
                        WindowManager.LayoutParams.WRAP_CONTENT,
                        WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY,
                        WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE or
                                WindowManager.LayoutParams.FLAG_NOT_TOUCHABLE,
                        PixelFormat.TRANSLUCENT
                )
        params.gravity = Gravity.CENTER_HORIZONTAL or Gravity.TOP
        params.y = 100

        // Thêm view mới vào WindowManager
        windowManager.addView(toastView, params)
        if (autoClose) {
            CoroutineScope(Dispatchers.Main).launch {
                delay(2000) // 2 seconds delay
                windowManager.removeView(toastView)
            }
        }
    }

    override fun onInterrupt() {
        // Xử lý khi dịch vụ bị ngắt
    }

    private fun handleAutoCollect() {
        if (appData == null || isStoped) {
            return
        }

        val dataCollector = appData
        val account_id = dataCollector?.workAccount ?: return
        val stopAfterError = dataCollector.stopAfterError
        val stopAfterSuccess = dataCollector.stopAfterSuccess
        val platform = dataCollector.platform
        platformService = PlatformFactory.create(platform)
        if (successJob >= stopAfterSuccess || failedJob >= stopAfterError) {
            showCustomToast("Đã hoàn tất lịch trình", autoClose = false)
            isStoped = true
            return
        }

        val call =
                platformService.getJobs(
                        accountId = account_id,
                        authHeader = "Bearer ${dataCollector.platformAccount}"
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
                                showCustomToast("Đang thực hiện job like", autoClose = false)
                                openSchemaUrl(url = "tiktok://aweme/detail/$objectId")
                                jobScope.launch {
                                    delay(3000)
                                    if (!isStoped) {
                                        clickDoubleCenterScreen(this@MyAccessibilityService)
                                        completeJob(
                                                account_id,
                                                job_id.toString(),
                                                objectId,
                                                type,
                                                1,
                                                object : JobCallback {
                                                    override fun onSuccess() {
                                                        if (!isStoped) {
                                                            jobScope.launch {
                                                                val timeDelay =
                                                                        dataCollector.timeDelay *
                                                                                1000
                                                                delay(timeDelay)
                                                                handleAutoCollect()
                                                            }
                                                        }
                                                    }

                                                    override fun onFailure() {
                                                        println("Failed to complete job")
                                                    }
                                                }
                                        )
                                    }
                                }
                            } else if (type == "follow") {
                                showCustomToast("Đang thực hiện job follow", autoClose = false)
                                openSchemaUrl(url = "tiktok://profile?id=$objectId")
                                jobScope.launch {
                                    delay(3000)
                                    if (!isStoped) {
                                        performClickOnTarget("Follow", type = "byText")
                                        completeJob(
                                                account_id,
                                                job_id.toString(),
                                                objectId,
                                                type,
                                                1,
                                                object : JobCallback {
                                                    override fun onSuccess() {
                                                        if (!isStoped) {
                                                            jobScope.launch {
                                                                delay(8000)
                                                                handleAutoCollect()
                                                            }
                                                        }
                                                    }

                                                    override fun onFailure() {
                                                        println("Failed to complete job")
                                                    }
                                                }
                                        )
                                    }
                                }
                            } else {
                                showCustomToast("Skip job comment", autoClose = false)
                                skipJob(
                                        account_id,
                                        job_id.toString(),
                                        objectId,
                                        type,
                                        object : JobCallback {
                                            override fun onSuccess() {
                                                if (!isStoped) {
                                                    jobScope.launch {
                                                        delay(3000)
                                                        handleAutoCollect()
                                                    }
                                                }
                                            }

                                            override fun onFailure() {
                                                println("Failed to skip job")
                                            }
                                        }
                                )
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
    private fun performClickOnTarget(buttonText: String, type: String, count: Int = 0) {
        if (isStoped) return
        
        val rootNode: AccessibilityNodeInfo? = rootInActiveWindow
        rootNode?.let {
            var nodes: List<AccessibilityNodeInfo>?
            if (type === "byId") {
                nodes = findNodesByViewId(buttonText)
            } else {
                nodes = findNodesByText(rootNode, buttonText)
            }

            if (nodes.isNotEmpty()) {
                val nodeToClick = nodes[0]
                if (type === "byId") {
                    Log.d("MyAccessibilityService", "Clicking node: ${nodeToClick.text}")
                    val (buttonX, buttonY) = getViewPositionOnScreen(nodeToClick)
                    autoClick(buttonX, buttonY)
                } else {
                    Log.d("MyAccessibilityService", "Clicking node: ${nodeToClick.text}")
                    val centerX = getCenterX(nodeToClick)
                    val centerY = getCenterY(nodeToClick)
                    autoClick(centerX, centerY)
                }
            } else {
                jobScope.launch {
                    if (count <= 2) {
                        delay(1500)
                        performClickOnTarget(buttonText, type, count + 1)
                    } else {
                        Log.e("MyAccessibilityService", "Button not found")
                    }
                }
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
    public fun getViewPositionOnScreen(node: AccessibilityNodeInfo): Pair<Int, Int> {
        val rect = Rect()
        node.getBoundsInScreen(rect)
        val centerX = rect.centerX()
        val centerY = rect.centerY()
        return Pair(centerX, centerY)
    }

    public fun completeJob(
            account_id: String,
            job_id: String,
            object_id: String,
            type: String,
            count: Int,
            callback: JobCallback
    ) {
        showCustomToast("Đang báo cáo job", autoClose = false)

        if (appData == null || isStoped) {
            callback.onFailure() // Gọi onFailure nếu điều kiện không thỏa mãn
            return
        }

        if (count > 5) {
            return skipJob(account_id, job_id, object_id, type, callback)
        }

        val dataCollector = appData
        println("job_id: $job_id account_id:")
        val call =
                platformService.completeJob(
                        CompleteJobPayload(
                                ads_id = job_id.toInt(),
                                account_id = account_id.toInt(),
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
                            successJob += 1
                            callback.onSuccess() // Gọi onSuccess khi hoàn thành
                        } else {
                            println("Request failed with status: ${response}")
                            jobScope.launch {
                                delay(2000)
                                if (!isStoped) {
                                    completeJob(
                                            account_id,
                                            job_id,
                                            object_id,
                                            type,
                                            count + 1,
                                            callback
                                    )
                                }
                            }
                        }
                    }

                    override fun onFailure(call: Call<Any>, t: Throwable) {
                        println("Error: ${t.message}")
                        jobScope.launch {
                            delay(2000)
                            if (!isStoped) {
                                completeJob(
                                        account_id,
                                        job_id,
                                        object_id,
                                        type,
                                        count + 1,
                                        callback
                                )
                            }
                        }
                    }
                }
        )
    }

    public fun skipJob(
            account_id: String,
            job_id: String,
            object_id: String,
            type: String,
            callback: JobCallback
    ) {
        showCustomToast("Đang skip job", autoClose = false)

        if (appData == null || isStoped) {
            callback.onFailure()
            return
        }

        val dataCollector = appData
        val call =
            platformService.skipJob(
                        SkipJobPayload(
                                ads_id = job_id,
                                account_id = account_id,
                                object_id = object_id,
                                type = type,
                        ),
                        authHeader = "Bearer ${dataCollector?.platformAccount}"
                )

        call.enqueue(
                object : Callback<Any> {
                    override fun onResponse(call: Call<Any>, response: Response<Any>) {
                        if (response.isSuccessful) {
                            println("Skip job successfully")
                            failedJob += 1
                            callback.onSuccess() // Gọi onSuccess khi hoàn thành
                        } else {
                            println("Request failed with status: ${response.code()}")
                            callback.onFailure()
                        }
                    }

                    override fun onFailure(call: Call<Any>, t: Throwable) {
                        println("Error: ${t.message}")
                        callback.onFailure()
                    }
                }
        )
    }
    fun getScreenSize(): Pair<Int, Int> {
        val wm = this.getSystemService(Context.WINDOW_SERVICE) as WindowManager

        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            // For Android 11 (API level 30) and above
            val windowMetrics: WindowMetrics = wm.currentWindowMetrics
            val insets =
                    windowMetrics.windowInsets.getInsetsIgnoringVisibility(
                            WindowInsets.Type.systemBars()
                    )

            val width = windowMetrics.bounds.width() - insets.left - insets.right
            val height = windowMetrics.bounds.height() - insets.top - insets.bottom

            Pair(width, height)
        } else {
            // For Android 10 (API level 29) and below
            val display = wm.defaultDisplay
            val size = Point()
            display.getSize(size)

            val width = size.x
            val height = size.y

            Pair(width, height)
        }
    }
    fun getCellIndex(position: Int, cellSize: Int): Int {
        return position / cellSize
    }

   
    fun clickDoubleCenterScreen(context: Context) {
        val (centerX, centerY) = getScreenCenter(context)
        jobScope.launch {
            autoClick(centerX, centerY)
            delay(200)
            autoClick(centerX, centerY)
        }
        
    }
    fun getScreenCenter(context: Context): Pair<Int, Int> {
        // Get the WindowManager service
        val windowManager = context.getSystemService(Context.WINDOW_SERVICE) as WindowManager
    
        // Create a DisplayMetrics object to hold the screen metrics
        val displayMetrics = DisplayMetrics()
    
        // Get the display metrics from the default display
        windowManager.defaultDisplay.getMetrics(displayMetrics)
    
        // Calculate the center position
        val centerX = displayMetrics.widthPixels / 2
        val centerY = displayMetrics.heightPixels / 2
    
        return Pair(centerX, centerY)
    }
}
