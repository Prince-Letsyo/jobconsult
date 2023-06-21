
from rest_framework import serializers
from drf_yasg import openapi
from user.models import (Sector,)
from Utils.view_utils import (sector_field)


class SectorField(serializers.RelatedField):
    def to_internal_value(self, data):
        id = data.get("id", None)
        seeker = data.get("seeker", None)
        if id:
            sector = Sector.objects.filter(id=id, seeker=seeker)
            if sector.exists():
                instance = sector.first()
                nested_serializer = SectorSerializer(
                    instance=instance, data=data)
                nested_serializer.is_valid(raise_exception=True)
                nested_serializer.save()
                return instance
            else:
                raise serializers.ValidationError(
                    {"sector": "Sector does not exist."}, 404)
        else:
            return data

    def to_representation(self, value):
        id = value.id
        seeker = value.seeker
        instance = Sector.objects.filter(id=id, seeker=seeker).first()
        nested_serializer = SectorSerializer(instance)
        return nested_serializer.data

    class Meta:
        swagger_schema_fields = {
            "type": openapi.TYPE_OBJECT,
            "title": "Sector",
            "properties": sector_field,
            "required": ["seeker"]
        }


class SectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sector
        fields = [
            "id",
            'seeker',
            'sector',
        ]
