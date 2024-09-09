import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.util.concurrent.TimeUnit

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
                .readTimeout(10, TimeUnit.SECONDS)
                .connectTimeout(10, TimeUnit.SECONDS)
                .build()

val retrofit =
        Retrofit.Builder()
                .baseUrl("https://gateway.golike.net/api/")
                .client(okHttpClient)
                .addConverterFactory(GsonConverterFactory.create())
                .build()

val golikeService: GolikeRequest = retrofit.create(GolikeRequest::class.java)
