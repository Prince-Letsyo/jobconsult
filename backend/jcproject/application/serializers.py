from rest_framework import serializers

from .models import Application, JobApplication, ApplicantDoc


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = [
            'id',
            'job',
            'number_of_applicant',
            'job_applications',
            'sector',
        ]


class JobApplicationSerializer(serializers.ModelSerializer):
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


class ApplicantDocSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplicantDoc
        fields = [
            'id',
            'seeker',
            'document'
        ]
