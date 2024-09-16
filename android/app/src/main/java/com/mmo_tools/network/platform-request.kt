import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST
import retrofit2.http.Query
import retrofit2.http.Url

interface GolikeRequest {
        @GET
        fun getJobs(
                @Url url: String,
                @Query("data") data: String?,
                @Query("account_id") accountId: String?,
                @Header("Authorization") authHeader: String?,
        ): Call<Any>

        @POST
        fun completeJob(
                @Url url: String,
                @Body requestBody: CompleteJobPayload,
                @Header("Authorization") authHeader: String?,
                @Header("t") t: String? = "VFZSamVVNUVZekpPVkVGNlRuYzlQUT09",
        ): Call<Any>

        @POST
        fun skipJob(
                @Url url: String,
                @Body requestBody: SkipJobPayload,
                @Header("Authorization") authHeader: String?,
        ): Call<Any>
}

interface TDSubRequest {
        @GET("api/")
        fun getJobs(
                @Query("fields") type: String?,
                @Query("access_token") authHeader: String?,
        ): Call<Any>
}
