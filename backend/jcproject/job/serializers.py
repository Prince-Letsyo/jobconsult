from rest_framework import serializers
from Utils.serializers_fields import JobSerializer

from .models import JobApproval
from .serializers import (JobSerializer)


class JobApprovalSerializer(serializers.ModelSerializer):
    job = JobSerializer()

    class Meta:
        model = JobApproval
        fields = [
            'id',
            'job',
            'withdraw_date',
        ]
