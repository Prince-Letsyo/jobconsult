from rest_framework import serializers

from .models import Application, JobApplication, ApplicantDoc
from job.serializers import JobSerializer
from user.serializers import SeekerSerializer


class JobApplicationSerializer(serializers.ModelSerializer):
    job = JobSerializer()
    seeker = SeekerSerializer()

    class Meta:
        model = JobApplication
        fields = [
            'id',
            'job',
            'seeker',
            'code',
            'documents',
            'accepted',
            'date_applied',
        ]


class ApplicationSerializer(serializers.ModelSerializer):
    job_applications = JobApplicationSerializer(many=True, read_only=True)
    job = JobSerializer()

    class Meta:
        model = Application
        fields = [
            'id',
            'job',
            'number_of_applicant',
            'job_applications',
            'sector',
        ]


class ApplicantDocSerializer(serializers.ModelSerializer):
    seeker= SeekerSerializer()
    
    class Meta:
        model = ApplicantDoc
        fields = [
            'id',
            'seeker',
            'document'
        ]
