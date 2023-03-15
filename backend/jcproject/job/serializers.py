from rest_framework import serializers

from .models import Job, JobApproval, Responsibility, Requirement
from user.serializers import UserSerializer, CompanyInfoSerializer


class ResponsibilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Responsibility
        fields = [
            'id',
            'job',
            'assign',
        ]


class RequirementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Requirement
        fields = [
            'id',
            'job',
            'requires',
        ]


class JobSerializer(serializers.ModelSerializer):
    responsibilities = ResponsibilitySerializer(many=True, read_only=True)
    requirements = RequirementSerializer(many=True, read_only=True)
    publisher = UserSerializer()
    company_name = CompanyInfoSerializer()

    class Meta:
        model = Job
        fields = [
            'id',
            'title',
            'location',
            'description',
            'company_name',
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
            'slug',
            'type_of_publisher',
            'publisher',
        ]


class JobApprovalSerializer(serializers.ModelSerializer):
    job = JobSerializer()

    class Meta:
        model = JobApproval
        fields = [
            'id',
            'job',
            'is_publish',
            'publish_date',
        ]
