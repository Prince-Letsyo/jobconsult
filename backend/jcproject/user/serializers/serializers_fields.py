
from rest_framework import serializers
from drf_yasg import openapi
from ..models import (Seeker, User, Sector,)
from .utils import user_field, sector_field, job_field


class JobSectorField(serializers.RelatedField):
    def to_internal_value(self, data):
        sector_text = data["sector"]
        seeker = data["seeker"]
        if seeker:
            sector, exist = self.get_queryset().objects.get_or_create(
                sector=sector_text, seeker=Seeker.objects.get(user=seeker))
            return sector
        else:
            data.pop("seeker")
            return data

    def to_representation(self, value):
        return {
            "id": value.id,
            "sector": value.sector,
            "seeker": value.seeker.user.id,
        }
        

    def get_fields(self):
        return sector_field

    class Meta:
        swagger_schema_fields = {
            "type": openapi.TYPE_OBJECT, "title": "Sector", "properties": sector_field
        }


class UserField(serializers.RelatedField):
    def to_internal_value(self, data):
        try:
            user = self.get_queryset().objects.filter(id=data.get("id")).first()
            data.pop("id", "")
            if len(data) != 0:
                for key, value in data.items():
                    setattr(user, key, value)
                user.save()
            return user
        except User.DoesNotExist:
            raise serializers.ValidationError(
                {"userr": "User does not exist."}, 404)

    def to_representation(self, value):
        return {
            "id": value.id,
            "first_name": value.first_name,
            "last_name": value.last_name,
            "middle_name": value.middle_name,
            "gender": value.gender,
            "email": value.email,
            "user_type": value.user_type,
            "phone_number": str(value.phone_number),
        }


    def get_fields(self):
        return user_field
    
    class Meta:
        swagger_schema_fields = {
            "type": openapi.TYPE_OBJECT, "title": "User", "properties": user_field
        }


class JobField(serializers.RelatedField):
    def to_internal_value(self, data):
        publisher = data.pop("publisher")
        if publisher:
            job, exist = self.get_queryset().objects.get_or_create(
                publisher=publisher, **data
            )
            return job
        else:
            return data

    def to_representation(self, value):
        return {
            'id': value.id,
            'title': value.title,
            "country": value.country,
            "city": value.city,
            'description': value.description,
            'image': value.image,
            'sector': value.sector,
            'type_of_job': value.type_of_job,
            'deadline': value.deadline,
            'minimum_qualification': value.minimum_qualification,
            'type_of_employment': value.type_of_employment,
            'experience_length': value.experience,
            'responsibilities': ResponsibilitiesField(many=True, read_only=True).to_representation(value.responsibilities),
            'requirements': RepresentativeField(many=True, read_only=True).to_representation(value.requirements),
            'number_of_required_applicantion': value.number_of_required_applicantion,
            'publisher': UserField(read_only=True).to_representation(value.publisher),
        }

    class Meta:
        swagger_schema_fields = {
            "type": openapi.TYPE_OBJECT, "title": "Job", "properties": job_field
        }


class RequirementsField(serializers.RelatedField):
    def to_representation(self, value):
        return {
            "id": value.id,
            "job": value.job.id,
            "requires": value.requires,
        }


class ResponsibilitiesField(serializers.RelatedField):
    def to_representation(self, value):
        return {
            "id": value.id,
            "job": value.job.id,
            "assign": value.assign,
        }


class RepresentativeField(serializers.RelatedField):
    def to_internal_value(self, data):
        try:
            return self.get_queryset().objects.filter(user_id=int(data)).first()
        except User.DoesNotExist:
            raise serializers.ValidationError("User does not exist.")

    def to_representation(self, value):
        user = User.objects.get(id=value.user.id)
        return {
            "user": UserField(read_only=True).to_representation(user),
            "position": value.position
        }


class SectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sector
        fields = [
            "id",
            'seeker',
            'sector',
        ]
