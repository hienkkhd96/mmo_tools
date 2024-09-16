package com.mmo_tools.interfaces.platforms

import CompleteJobPayload
import Job
import JobResponse
import JobTDSubResponse
import SkipJobPayload
import golikeService
import retrofit2.Call
import tdsubService

interface PlatformService {
    fun getJobs(accountId: String, authHeader: String): Call<Any>
    fun getAuthHeader(authheader: String): String
    fun completeJob(payload: CompleteJobPayload, authHeader: String): Call<Any>
    fun skipJob(payload: SkipJobPayload, authHeader: String): Call<Any>
    fun transformBodyGetJobs(body: Any): Any {
        throw NotImplementedError("Not implemented")
    }
}

class GolikeService : PlatformService {
    val application: String
    constructor(application: String) {
        this.application = application
    }
    override fun getAuthHeader(authheader: String): String {
        return "Bearer ${authheader}"
    }

    override fun getJobs(accountId: String, authHeader: String): Call<Any> {
        val url = "api/advertising/publishers/${this.application}/jobs"
        return golikeService.getJobs(url, data = null, accountId, authHeader)
    }

    override fun completeJob(payload: CompleteJobPayload, authHeader: String): Call<Any> {
        val url = "api/advertising/publishers/${this.application}/complete-jobs"
        return golikeService.completeJob(url, payload, authHeader).let { it }
    }

    override fun skipJob(payload: SkipJobPayload, authHeader: String): Call<Any> {
        val url = "api/advertising/publishers/${this.application}/skip-jobs"
        return golikeService.skipJob(url, payload, authHeader)
    }
    override fun transformBodyGetJobs(body: Any): JobResponse {
        return body as JobResponse
    }
}

class TDSubService : PlatformService {
    val application: String
    constructor(application: String) {
        this.application = application
    }
    override fun getAuthHeader(authheader: String): String {
        return authheader
    }
    override fun getJobs(accountId: String, authHeader: String): Call<Any> {
        return tdsubService.getJobs(type = "tiktok_follow", authHeader)
    }
    override fun completeJob(payload: CompleteJobPayload, authHeader: String): Call<Any> {
        throw NotImplementedError("Not implemented")
    }
    override fun skipJob(payload: SkipJobPayload, authHeader: String): Call<Any> {
        throw NotImplementedError("Not implemented")
    }
    override fun transformBodyGetJobs(body: Any): JobResponse {
        val res = body as JobTDSubResponse
        val firstJob = res.data[0]
        val job =
                JobResponse(
                        data =
                                Job(
                                        id = firstJob.id,
                                        link = firstJob.link,
                                        object_id = firstJob.uniqueID,
                                        type = firstJob.type
                                )
                )
        return job
    }
}
