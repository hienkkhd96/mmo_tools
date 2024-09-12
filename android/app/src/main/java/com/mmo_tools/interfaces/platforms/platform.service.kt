package com.mmo_tools.interfaces.platforms

import CompleteJobPayload
import JobResponse
import SkipJobPayload
import golikeService
import retrofit2.Call

interface PlatformService {
    fun getJobs(accountId: String, authHeader: String): Call<JobResponse>
    fun completeJob(payload: CompleteJobPayload, authHeader: String): Call<Any>
    fun skipJob(payload: SkipJobPayload, authHeader: String): Call<Any>
}

class GolikeService : PlatformService {
    val application: String
    constructor(application: String) {
        this.application = application
    }
    override fun getJobs(accountId: String, authHeader: String): Call<JobResponse> {
        val url = "api/advertising/publishers/${this.application}/jobs"
        println(url)
        return golikeService.getJobs(url, data = null, accountId, authHeader)
    }

    override fun completeJob(payload: CompleteJobPayload, authHeader: String): Call<Any> {
        val url = "api/advertising/publishers/${this.application}/complete-jobs"
        return golikeService.completeJob(url, payload, authHeader)
    }

    override fun skipJob(payload: SkipJobPayload, authHeader: String): Call<Any> {
        val url = "api/advertising/publishers/${this.application}/skip-jobs"
        return golikeService.skipJob(url, payload, authHeader)
    }
}
