data class Job(
        val id: Int,
        val link: String,
        val object_id: String,
        val type: String,
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

data class JobResponse(val data: Job)
