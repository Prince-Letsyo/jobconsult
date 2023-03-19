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

class ApplicantDocSerializer(serializers.ModelSerializer):
    seeker= SeekerSerializer()
    
    class Meta:
        model = ApplicantDoc
        fields = [
            'id',
            'seeker',
            'document'
        ]
