package com.mmo_tools.interfaces.platforms

object PlatformFactory {
    fun create(platform: String): PlatformService {
        return when (platform) {
            "golike" -> GolikeService()
            // Thêm các platform khác ở đây
            else -> throw IllegalArgumentException("Unknown platform: $platform")
        }
    }
}