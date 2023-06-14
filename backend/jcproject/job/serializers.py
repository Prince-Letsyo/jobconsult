import os
from django_countries.serializer_fields import CountryField
from rest_framework import serializers
from .models import Job, Responsibility, Requirement, JobApproval
from user.serializers import UserField, User, CompanyInfo, RepresentativeField


class ResponsibilitiesField(serializers.RelatedField):
    def to_internal_value(self, data):
        assign_text = data["assign"]
        job = data["job"]
        if job is not None:
            requirement, exist = self.get_queryset().objects.get_or_create(
                assign=assign_text, job=Job.objects.get(id=job))
            return requirement
        else:
            data.pop("job")
            return data

    def to_representation(self, value):
        return {
            "id": value.id,
            "job": value.job.id,
            "assign": value.assign,
        }


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
        requires_text = data["requires"]
        job = data["job"]
        if job is not None:
            requirement, exist = self.get_queryset().objects.get_or_create(
                requires=requires_text, job=Job.objects.get(id=job))
            return requirement
        else:
            data.pop("job")
            return data

    def to_representation(self, value):
        return {
            "id": value.id,
            "job": value.job.id,
            "requires": value.requires,
        }


class RequirementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Requirement
        fields = [
            'id',
            'job',
            'requires',
        ]


class CompanyNameField(serializers.RelatedField):
    def to_internal_value(self, data):
        try:
            return self.get_queryset().objects.filter(representative=int(data)).first()
        except CompanyInfo.DoesNotExist:
            raise serializers.ValidationError(
                {"company": "Company does not exist."}, 404)

    def to_representation(self, value):
        imageUrl = None
        if value.image and hasattr(value.image, "url") and hasattr(self.context, "request"):
            request = self.context.get("request")
            imageUrl = request.build_absolute_uri(value.image.url)
        return {
            "representative": RepresentativeField(read_only=True).to_representation(value.representative),
            "company_name": value.company_name,
            "industry": value.industry,
            "number_of_employees": value.number_of_employees,
            "type_of_employer": value.type_of_employer,
            "hear_about": value.hear_about,
            "website": value.website,
            "contact_person": value.contact_person,
            "company_email": value.company_email,
            "company_phone_number": str(value.company_phone_number),
            "country": value.country,
            "city": value.city,
            "address": value.address,
            "image": "" if imageUrl is None else imageUrl
        }


class JobSerializer(serializers.ModelSerializer):
    responsibilities = ResponsibilitiesField(
        queryset=Responsibility, many=True)
    requirements = RequirementsField(queryset=Requirement, many=True)
    publisher = UserField(queryset=User)
    deadline = serializers.DateTimeField(
        default_timezone="UTC", input_formats="yyyy-MM-dd",)
    country = CountryField(default="GH")
    number_of_required_applicantion=serializers.IntegerField(required=True, min_value=1)

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


class JobApprovalSerializer(serializers.ModelSerializer):
    job = JobSerializer()

    class Meta:
        model = JobApproval
        fields = [
            'id',
            'job',
            'withdraw_date',
        ]
