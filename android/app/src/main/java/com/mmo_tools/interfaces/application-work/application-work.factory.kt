package com.mmo_tools.interfaces.applicationWork

object ApplicationWorkFactory {
    fun create(application: String): ApplicationWorkInterface {
        return when (application) {
            "tiktok" -> TiktokService()
            "shopee" -> ShopeeService()
            else -> throw IllegalArgumentException("Unknown application: $application")
        }
    }
}
