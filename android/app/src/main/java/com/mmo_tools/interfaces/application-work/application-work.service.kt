package com.mmo_tools.interfaces.applicationWork

interface ApplicationWorkInterface {
    fun like() {}
    fun follow() {}
    fun getUrlToAction(type: String, objectId: String): String
    fun getButtonToClick(type: String): String {
        return when (type) {
            "like" -> "like"
            "follow" -> "follow"
            else -> "unknown"
        }
    }
    fun getName(): String {
        return ""
    }
}

class TiktokService : ApplicationWorkInterface {
    override fun getName(): String {
        return "tiktok"
    }
    override fun getButtonToClick(type: String): String {
        return when (type) {
            "like" -> "CLICK_DOUBLE_SCREEN"
            "follow" -> "Follow"
            else -> "unknown"
        }
    }
    override fun getUrlToAction(type: String, objectId: String): String {
        return when (type) {
            "like" -> "tiktok://aweme/detail/$objectId"
            "follow" -> "tiktok://profile?id=$objectId"
            else -> "https://tiktok.com/home"
        }
    }
}

class ShopeeService : ApplicationWorkInterface {
    override fun getName(): String {
        return "shopee"
    }
    override fun getButtonToClick(type: String): String {
        return when (type) {
            "like" -> "CLICK_DOUBLE_SCREEN"
            "follow" -> "Follow"
            else -> "unknown"
        }
    }
    override fun getUrlToAction(type: String, objectId: String): String {
        return when (type) {
            "like" -> "shopeevn://$objectId"
            "follow" -> "https://shopee.vn/$objectId"
            else -> "https://tiktok.com/home"
        }
    }
}
