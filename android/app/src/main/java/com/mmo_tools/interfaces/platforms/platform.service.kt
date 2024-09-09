package com.mmo_tools.interfaces.platforms
import golikeService
import CompleteJobPayload
import SkipJobPayload
import TiktokJobResponse
import retrofit2.Call

interface PlatformService {
    fun getJobs(accountId: String, authHeader: String): Call<TiktokJobResponse>
    fun completeJob(payload: CompleteJobPayload, authHeader: String): Call<Any>
    fun skipJob(payload: SkipJobPayload, authHeader: String): Call<Any>
}

class GolikeService : PlatformService {
    override fun getJobs(accountId: String, authHeader: String): Call<TiktokJobResponse> {
        return golikeService.getJobs(null, accountId = accountId, authHeader = authHeader)
    }

    override fun completeJob(payload: CompleteJobPayload, authHeader: String): Call<Any> {
        return golikeService.completeJob(payload, authHeader = authHeader)
    }

    override fun skipJob(payload: SkipJobPayload, authHeader: String): Call<Any> {
        return golikeService.skipJob(payload, authHeader = authHeader)
    }
}
