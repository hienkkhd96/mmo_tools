import java.util.concurrent.TimeUnit
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

val okHttpClient =
        OkHttpClient.Builder()
                .addInterceptor { chain ->
                        val originalRequest = chain.request()
                        val newRequest =
                                originalRequest
                                        .newBuilder()
                                        .addHeader("Content-Type", "application/json")
                                        .build()
                        chain.proceed(newRequest)
                }
                .readTimeout(20, TimeUnit.SECONDS)
                .connectTimeout(20, TimeUnit.SECONDS)
                .build()

class RetrofitPlatform {
        fun build(platform: String): Retrofit {
                when (platform) {
                        "golike" ->
                                return Retrofit.Builder()
                                        .baseUrl("https://gateway.golike.net/")
                                        .client(okHttpClient)
                                        .addConverterFactory(GsonConverterFactory.create())
                                        .build()
                        "tdsub" ->
                                return Retrofit.Builder()
                                        .baseUrl("https://api.mmotools.online/")
                                        .client(okHttpClient)
                                        .addConverterFactory(GsonConverterFactory.create())
                                        .build()
                        else -> throw IllegalArgumentException("Unknown platform: $platform")
                }
        }
}

val golikeService: GolikeRequest =
        RetrofitPlatform().build("golike").create(GolikeRequest::class.java)
val tdsubService: TDSubRequest = RetrofitPlatform().build("tdsub").create(TDSubRequest::class.java)
