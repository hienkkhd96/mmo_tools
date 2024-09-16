data class JobTDSub(
        val id: Int,
        val link: String,
        val object_id: String,
        val type: String,
        val uniqueID: String
)

data class JobTDSubResponse(val data: List<JobTDSub>)
