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
                .build()

val retrofit =
        Retrofit.Builder()
                .baseUrl("https://gateway.golike.net/api/")
                .client(okHttpClient)
                .addConverterFactory(GsonConverterFactory.create())
                .build()

val golikeService: GolikeServie = retrofit.create(GolikeServie::class.java)
