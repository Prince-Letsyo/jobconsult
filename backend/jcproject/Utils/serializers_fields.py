
from rest_framework import serializers
from drf_yasg import openapi
from Utils.choices import make_choices_data
from user.models import (User,)
from .view_utils import (user_field,
                         requirements, responsibilities)
from job.models import Job, Responsibility, Requirement
import os
from django_countries.serializer_fields import CountryField


class RequirementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Requirement
        fields = [
            'id',
            'job',
            'requires',
        ]


class ResponsibilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Responsibility
        fields = [
            'id',
            'job',
            'assign',
        ]


class RequirementsField(serializers.RelatedField):
    def to_internal_value(self, data):
        id = data.get("id", None)
        job = data.get("job", None)
        if id and job:
            responsibility = Requirement.objects.filter(id=id, job=job)
            if responsibility.exists():
                instance = responsibility.first()
                nested_serializer = RequirementSerializer(
                    instance=instance, data=data)
                nested_serializer.is_valid(raise_exception=True)
                nested_serializer.save()
                return instance
            else:
                raise serializers.ValidationError(
                    {"requirement": "Requirement does not exist."}, 404)
        else:
            return data

    def to_representation(self, value):
        id = value.id
        job = value.job
        instance = Requirement.objects.filter(id=id, job=job).first()
        nested_serializer = RequirementSerializer(instance)
        return nested_serializer.data

    class Meta:
        swagger_schema_fields = {
            "type": openapi.TYPE_OBJECT,
            "title": "Requirement",
            "properties": requirements,
            "required": ["job"]
        }


class ResponsibilitiesField(serializers.RelatedField):
    def to_internal_value(self, data):
        id = data.get("id", None)
        job = data.get("job", None)
        if id and job:
            responsibility = Responsibility.objects.filter(id=id, job=job)
            if responsibility.exists():
                instance = responsibility.first()
                nested_serializer = ResponsibilitySerializer(
                    instance=instance, data=data)
                nested_serializer.is_valid(raise_exception=True)
                nested_serializer.save()
                return instance
            else:
                raise serializers.ValidationError(
                    {"responsibility": "Responsibility does not exist."}, 404)
        else:
            return data

    def to_representation(self, value):
        id = value.id
        job = value.job
        instance = Responsibility.objects.filter(id=id, job=job).first()
        nested_serializer = ResponsibilitySerializer(instance)
        return nested_serializer.data

    class Meta:
        swagger_schema_fields = {
            "type": openapi.TYPE_OBJECT,
            "title": "Responsibility",
            "properties": responsibilities,
            "required": ["assign", "job"]
        }


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'first_name',
            'last_name',
            'middle_name',
            'gender',
            'user_type',
            'email',
            'phone_number',
        ]


class UserField(serializers.RelatedField):
    def to_internal_value(self, data):
        id = data.get("id", None)
        if id:
            user = User.objects.filter(id=id)
            if user.exists():
                instance = user.first()
                nested_serializer = UserSerializer(
                    instance=instance, data=data)
                nested_serializer.is_valid(raise_exception=True)
                nested_serializer.save()
                return instance
            else:
                raise serializers.ValidationError(
                    {"user": "User does not exist."}, 404)
        else:
            nested_serializer = UserSerializer(data=data)
            nested_serializer.is_valid(raise_exception=True)
            nested_serializer.save()
            return User.objects.filter(id=nested_serializer.data['id'])

    def to_representation(self, value):
        id = value.id
        instance = User.objects.filter(id=id).first()
        nested_serializer = UserSerializer(instance)
        return nested_serializer.data

    class Meta:
        swagger_schema_fields = {
            "type": openapi.TYPE_OBJECT,
            "title": "User",
            "properties": user_field,
            "required": [
                "first_name",
                "last_name",
                "middle_name",
                "gender",
                "email",
                "user_type",
                "phone_number",
            ]
        }


class JobSerializer(serializers.ModelSerializer):
    responsibilities = ResponsibilitiesField(
        queryset=Responsibility, many=True)
    requirements = RequirementsField(queryset=Requirement, many=True)
    publisher = UserField(queryset=User)
    deadline = serializers.DateTimeField(
        default_timezone="UTC", input_formats="yyyy-MM-dd", )
    country = CountryField(default="GH")
    city = serializers.ChoiceField(choices=make_choices_data(key="name", value="state_code",
                                                             file="./states.json", filter_by="all"))
    number_of_required_applicantion = serializers.IntegerField(
        required=True, min_value=1)
    experience_length = serializers.IntegerField(required=True, min_value=1)

    class Meta:
        model = Job
        fields = [
            'id',
            'title',
            "country",
            "city",
            'description',
            'image',
            'sector',
            'type_of_job',
            'deadline',
            'minimum_qualification',
            'type_of_employment',
            'experience_length',
            'responsibilities',
            'requirements',
            'number_of_required_applicantion',
            'publisher',
        ]

    def create(self, validated_data):
        responsibilities = validated_data.pop("responsibilities")
        requirements = validated_data.pop("requirements")

        instance = Job.objects.create(**validated_data)
        instance.save()

        for responsibility in responsibilities:
            res, res_exist = Responsibility.objects.get_or_create(
                job=instance.job, assign=responsibility['assign'])
        instance.responsibilities.set(
            Responsibility.objects.filter(job=instance))

        for requirement in requirements:
            req, req_exist = Requirement.objects.get_or_create(
                job=instance.job,  requires=requirement['requires'])

        instance.requirements.set(Requirement.objects.filter(job=instance))

        instance.save()
        return instance

    def update(self, instance, validated_data):
        if instance.image and hasattr(instance.image, "name") and validated_data.get("image", None) != None:
            if instance.image.name.split("/")[-1] == validated_data["image"].name:
                validated_data.pop("image")
            else:
                file_path = instance.image.path
                if os.path.isfile(file_path):
                    os.remove(file_path)

        return super().update(instance, validated_data)
