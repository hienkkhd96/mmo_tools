package com.mmo_tools.interfaces.platforms

object PlatformFactory {
    fun create(platform: String, application: String): PlatformService {
        return when (platform) {
            "golike" -> GolikeService(application)
            "tds" -> TDSubService(application)
            "ttc" -> TTCheoService(application)
            // Thêm các platform khác ở đây
            else -> throw IllegalArgumentException("Unknown platform: $platform")
        }
    }
}
