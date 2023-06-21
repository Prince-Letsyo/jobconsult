from rest_framework import serializers

from .models import Application, JobApplication, ApplicantDoc, Application
from job.serializers import JobSerializer
from user.serializers import SeekerSerializer


class ApplicantDocSerializer(serializers.ModelSerializer):
    document = serializers.FileField()

    class Meta:
        model = ApplicantDoc
        fields = [
            'id',
            'job_application',
            'seeker',
            'document'
        ]


class JobApplicationSerializer(serializers.ModelSerializer):
    job = JobSerializer()
    seeker = SeekerSerializer()
    documents = ApplicantDocSerializer(many=True)

    class Meta:
        model = JobApplication
        fields = [
            'id',
            'job',
            'seeker',
            'documents',
            'accepted',
            'date_applied',
        ]


class ApplicationSerializer(serializers.ModelSerializer):
    job_applications = JobApplicationSerializer(many=True, read_only=True)

    class Meta:
        model = Application
        fields = [
            'id',
            'job',
            'number_of_applicant',
            'job_applications',
            'sector'
        ]
