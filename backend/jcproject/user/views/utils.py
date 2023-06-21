from drf_yasg import openapi
from rest_framework import serializers

class CustomRequestSchema():
    properties = {}
    required = []
    

    @staticmethod
    def request_body(serializer_class, remove_fields=[]):

        for field_name, field in serializer_class().fields.items():
            if isinstance(field, (serializers.ManyRelatedField, serializers.RelatedField)):
                if hasattr(field, "Meta"):
                    CustomRequestSchema.get_many_related_schema(
                        field, field_name, remove_fields)
                
                elif hasattr(field, "child_relation"):
                    inner_field = field.child_relation
                    if hasattr(inner_field, "Meta"):
                        CustomRequestSchema.get_many_related_schema(
                            inner_field, field_name, remove_fields)
            else:
                CustomRequestSchema.properties[field_name] = CustomRequestSchema.get_schema(
                    field_name, field)
                if field.required:
                    CustomRequestSchema.required.append(field_name)
        return openapi.Schema(
            title="Seeker",
            type=openapi.IN_FORM,
            properties=CustomRequestSchema.properties,
            required=CustomRequestSchema.required
        )

    @staticmethod
    def get_many_related_schema(field, field_name, remove_fields=[]):
        inner_properties = {}
        for key, value in field.Meta.swagger_schema_fields["properties"].items():
            if key not in remove_fields:
                inner_properties[key] = CustomRequestSchema.get_schema(
                    key, value)

        inner_schema = field.Meta.swagger_schema_fields
            
        CustomRequestSchema.properties[field_name] = openapi.Schema(
            type=inner_schema["type"],
            properties=inner_properties,
            title=inner_schema["title"],
            required=inner_schema["required"]
        )

    @staticmethod
    def get_schema(field_name, field):
        if isinstance(field, serializers.ChoiceField):
            return openapi.Schema(
                type=openapi.TYPE_STRING,
                enum=[key for key, _ in field.choices.items()],
                title=' '.join(
                    [word for word in field_name.capitalize().split("_")])
            )
        elif isinstance(field, serializers.DateField):
            return openapi.Schema(
                type=openapi.TYPE_STRING,
                format=openapi.FORMAT_DATE,
                description="Date format: YYYY-MM-DD",
                title=' '.join(
                    [word for word in field_name.capitalize().split("_")])
            )
        elif isinstance(field, serializers.DateTimeField):
            return openapi.Schema(
                type=openapi.TYPE_STRING,
                format=openapi.FORMAT_DATETIME,
                description="Date format: YYYY-MM-DDThh:mm:ss",
                title=' '.join(
                    [word for word in field_name.capitalize().split("_")])
            )
        elif isinstance(field, serializers.IntegerField):
            return openapi.Schema(
                type=openapi.TYPE_INTEGER,
                title=' '.join(
                    [word for word in field_name.capitalize().split("_")])
            )
        elif isinstance(field, serializers.FloatField):
            return openapi.Schema(
                type=openapi.TYPE_NUMBER,
                title=' '.join(
                    [word for word in field_name.capitalize().split("_")])
            )
        elif isinstance(field, serializers.FileField):
            return openapi.Schema(
                type=openapi.TYPE_FILE,
                title=' '.join(
                    [word for word in field_name.capitalize().split("_")])
            )
        elif isinstance(field, serializers.EmailField,):
            return openapi.Schema(
                type=openapi.TYPE_STRING,
                title=' '.join(
                    [word for word in field_name.capitalize().split("_")])
            )
        else:
            return openapi.Schema(
                type=openapi.TYPE_STRING,
                title=' '.join(
                    [word for word in field_name.capitalize().split("_")])
            )
