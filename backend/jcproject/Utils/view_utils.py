from drf_yasg import openapi

from Utils.choices import (
    JobType, Sex, MinimumQualification,
    EmploymentType, SectorChoices, nationality_choices,
    make_choices_data
)


user_field = {
    "id": openapi.Schema(
        title="User id",
        type=openapi.TYPE_INTEGER,
        read_only=True
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
        type=openapi.TYPE_STRING, enum=[sex[0] for sex in Sex.choices]
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
        type=openapi.TYPE_INTEGER,
        read_only=True,
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
    "id": openapi.Schema(
        title="Job Id",
        type=openapi.TYPE_INTEGER
    ),
    "title": openapi.Schema(
        title="Title",
        type=openapi.TYPE_STRING
    ),
    "country": openapi.Schema(
        title="Country",
        type=openapi.TYPE_STRING,
        enum=[city[0]
              for city in nationality_choices.choices]
    ),
    "city": openapi.Schema(
        title="City",
        type=openapi.TYPE_STRING,
        description="""City is based on the `Country code` selected. 
        The default is currently: `GH`""",
        enum=[city[0]
              for city in make_choices_data(key="name", value="state_code",
                                            file="./states.json", filter_by="GH")]
    ),
    "description": openapi.Schema(
        title="Description",
        type=openapi.TYPE_STRING
    ),
    "image": openapi.Schema(
        title="Image",
        type=openapi.TYPE_FILE
    ),
    "type_of_job": openapi.Schema(
        title="Type of job",
        type=openapi.TYPE_STRING,
        enum=[job[0] for job in JobType.choices]
    ),
    "deadline": openapi.Schema(
        type=openapi.TYPE_STRING,
        format=openapi.FORMAT_DATETIME,
        description="Date format: YYYY-MM-DDThh:mm",
    ),
    "minimum_qualification": openapi.Schema(
        title="Minimum qualification",
        type=openapi.TYPE_STRING,
        enum=[mini[0] for mini in MinimumQualification.choices]
    ),
    "type_of_employment": openapi.Schema(
        title="Type of employment",
        type=openapi.TYPE_STRING,
        enum=[employ[0] for employ in EmploymentType.choices]
    ),
    "experience_length": openapi.Schema(
        title="Experience length",
        type=openapi.TYPE_INTEGER
    ),
    "sector": openapi.Schema(
        title="Sector",
        type=openapi.TYPE_STRING,
        enum=[sector[0] for sector in SectorChoices.choices]
    ),
    "responsibilities": openapi.Schema(
        title="Responsibilities",
        type=openapi.TYPE_ARRAY,
        uniqueItems=True,
        items=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            title="Responsibility",
            properties={
                "id": openapi.Schema(
                    title="Responsibility Id",
                    type=openapi.TYPE_INTEGER
                ),
                "job": openapi.Schema(
                    title="Job Id",
                    type=openapi.TYPE_INTEGER
                ),
                "assign": openapi.Schema(
                    title="Assign",
                    type=openapi.TYPE_STRING
                ),
            }
        )
    ),
    "requirements": openapi.Schema(
        title="Requirements",
        type=openapi.TYPE_ARRAY,
        uniqueItems=True,
        items=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            title="Requirement",
            properties={
                "id": openapi.Schema(
                    title="Requirement Id",
                    type=openapi.TYPE_INTEGER
                ),
                "job": openapi.Schema(
                    title="Job Id",
                    type=openapi.TYPE_INTEGER
                ),
                "requires": openapi.Schema(
                    title="requires",
                    type=openapi.TYPE_STRING
                ),
            }
        )
    ),
    "number_of_required_applicantion": openapi.Schema(
        title="Number of required applicantion",
        type=openapi.TYPE_INTEGER
    ),
    "publisher": openapi.Schema(
        title="User",
        type=openapi.TYPE_OBJECT,
        properties=user_field,
    ),
}
responsibilities = {
    "id": openapi.Schema(
        title="Responsibility Id",
        type=openapi.TYPE_INTEGER,
        read_only=True
    ),
    "job": openapi.Schema(
        title="Job Id",
        type=openapi.TYPE_INTEGER
    ),
    "assign": openapi.Schema(
        title="Assign",
        type=openapi.TYPE_STRING,
    ),
}
requirements = {
    "id": openapi.Schema(
        title="Requirement Id",
        type=openapi.TYPE_INTEGER,
        read_only=True
    ),
    "job": openapi.Schema(
        title="Job Id",
        type=openapi.TYPE_INTEGER
    ),
    "requires": openapi.Schema(
        title="requires",
        type=openapi.TYPE_STRING,
    ),
}
