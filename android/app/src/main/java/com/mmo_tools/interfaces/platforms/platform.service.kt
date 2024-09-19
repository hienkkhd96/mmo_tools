package com.mmo_tools.interfaces.platforms

import CompleteJobPayload
import JobResponse
import SkipJobPayload
import golikeService
import retrofit2.Call
import tdsubService

interface PlatformService {
    fun getJobs(accountId: String, authHeader: String, type: String? = null): Call<JobResponse>
    fun getAuthHeader(authheader: String): String
    fun completeJob(payload: CompleteJobPayload, authHeader: String): Call<Any>
    fun skipJob(payload: SkipJobPayload, authHeader: String): Call<Any>? {
        return null
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

    override fun getJobs(accountId: String, authHeader: String, type: String?): Call<JobResponse> {
        val url = "api/advertising/publishers/${this.application}/jobs"
        return golikeService.getJobs(url, data = null, accountId, this.getAuthHeader(authHeader))
    }

    override fun completeJob(payload: CompleteJobPayload, authHeader: String): Call<Any> {
        val url = "api/advertising/publishers/${this.application}/complete-jobs"
        return golikeService.completeJob(url, payload, this.getAuthHeader(authHeader)).let { it }
    }

    override fun skipJob(payload: SkipJobPayload, authHeader: String): Call<Any> {
        val url = "api/advertising/publishers/${this.application}/skip-jobs"
        return golikeService.skipJob(url, payload, this.getAuthHeader(authHeader))
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
    override fun getJobs(accountId: String, authHeader: String, type: String?): Call<JobResponse> {
        return tdsubService.getJobs(
                type = "follow",
                applicationName = this.application,
                platform = "tds",
                authHeader = this.getAuthHeader(authHeader)
        )
    }
    override fun completeJob(payload: CompleteJobPayload, authHeader: String): Call<Any> {
        return tdsubService.completeJob(
                applicationName = this.application,
                platform = "tds",
                requestBody = payload,
                authHeader = this.getAuthHeader(authHeader)
        )
    }
    override fun skipJob(payload: SkipJobPayload, authHeader: String): Call<Any> {
        throw NotImplementedError("Not implemented")
    }
}

class TTCheoService : PlatformService {
    val application: String
    constructor(application: String) {
        this.application = application
    }
    override fun getAuthHeader(authheader: String): String {
        return authheader
    }
    override fun getJobs(accountId: String, authHeader: String, type: String?): Call<JobResponse> {
        return tdsubService.getJobs(
                type = "follow",
                applicationName = this.application,
                platform = "ttc",
                authHeader = this.getAuthHeader(authHeader)
        )
    }
    override fun completeJob(payload: CompleteJobPayload, authHeader: String): Call<Any> {
        return tdsubService.completeJob(
                applicationName = this.application,
                platform = "ttc",
                requestBody = payload,
                authHeader = this.getAuthHeader(authHeader)
        )
    }
    override fun skipJob(payload: SkipJobPayload, authHeader: String): Call<Any> {
        throw NotImplementedError("Not implemented")
    }
}
