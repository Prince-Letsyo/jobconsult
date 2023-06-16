from drf_yasg import openapi


user_field = {
    "id": openapi.Schema(
        title="User id",
        type=openapi.TYPE_INTEGER
    ),
    "first_name": openapi.Schema(
        title="First name",
        type=openapi.TYPE_STRING
    ),
    "last_name": openapi.Schema(
        title="Last name",
        type=openapi.TYPE_STRING
    ),
    "middle_name": openapi.Schema(
        title="Middle name",
        type=openapi.TYPE_STRING
    ),
    "gender": openapi.Schema(
        title="Gender",
        type=openapi.TYPE_STRING
    ),
    "email": openapi.Schema(
        title="Email",
        type=openapi.TYPE_STRING
    ),
    "user_type": openapi.Schema(
        title="User Type",
        type=openapi.TYPE_STRING
    ),
    "phone_number": openapi.Schema(
        title="Phone number",
        type=openapi.TYPE_STRING,

    ),
}

sector_field = {
    "id": openapi.Schema(
        title="Id",
        type=openapi.TYPE_INTEGER
    ),
    "sector": openapi.Schema(
        title="Sector Name",
        type=openapi.TYPE_STRING
    ),
    "seeker": openapi.Schema(
        title="User id",
        type=openapi.TYPE_STRING
    ),

}

job_field = {
    "sector": openapi.Schema(
        title="Sector Name",
        type=openapi.TYPE_STRING
    ),
}

