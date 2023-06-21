
from rest_framework import serializers

from Utils.serializers_fields import UserField
from .user_serializers_fields import SectorField
from user.models import (Seeker, User, Sector, )


class SeekerSerializer(serializers.ModelSerializer):
    user = UserField(queryset=User)
    job_sector = SectorField(queryset=Sector, many=True)

    class Meta:
        model = Seeker
        fields = [
            'user',
            'date_of_birth',
            'nationality',
            'city',
            'high_qualification',
            'years_of_experience',
            'available',
            'job_sector',
        ]

    def create(self, validated_data):
        seeker_sectors = validated_data.pop("job_sector")

        instance = self.Meta.model.objects.create(**validated_data)

        for sector in seeker_sectors:
            Sector.objects.get_or_create(
                seeker=instance, sector=sector["sector"])

        instance.job_sector.set(
            Sector.objects.filter(seeker=instance))

        instance.save()
        return instance