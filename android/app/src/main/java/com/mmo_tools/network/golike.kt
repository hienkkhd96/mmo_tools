import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST
import retrofit2.http.Query

data class TiktokJob(
        val id: Int,
        val link: String,
        val object_id: String,
        val quantity: Int,
        val time_expired: String,
        val type: String,
        val count_success: Int,
        val countIsRun: Int,
        val status: Int,
        val description: String?,
        val notes: String?,
        val pricePer: Int,
        val isHidden: Int,
        val objectNotExist: Int,
        val pricePerAfterCost: Int,
        val packageName: String,
        val isRemoved: Int,
        val viewer: Int,
        val isLock: Int,
        val updatedAt: String,
        val priceAfterCost: Int,
        val statusMessage: String,
        val pricePerAgency: Int,
        val timeExpiredFormat: String
)

data class CompleteJobPayload(
        val ads_id: Int,
        val account_id: Int,
        val async: Boolean,
        val data: String?,
)

data class SkipJobPayload(
        val ads_id: String,
        val account_id: String,
        val object_id: String,
        val type: String,
)

data class TiktokJobResponse(val data: TiktokJob)

interface GolikeServie {
        @GET("advertising/publishers/tiktok/jobs")
        fun getJobs(
                @Query("data") data: String?,
                @Query("account_id") accountId: String?,
                @Header("Authorization") authHeader: String?,
        ): Call<TiktokJobResponse>

        @POST("advertising/publishers/tiktok/complete-jobs")
        fun completeJob(
                @Body requestBody: CompleteJobPayload,
                @Header("Authorization") authHeader: String?,
                @Header("t") t: String? = "VFZSamVVNUVZekpPVkVGNlRuYzlQUT09",
        ): Call<Any>

        @POST("advertising/publishers/tiktok/skip-jobs")
        fun skipJob(
                @Body requestBody: SkipJobPayload,
                @Header("Authorization") authHeader: String?,
        ): Call<Any>
}
