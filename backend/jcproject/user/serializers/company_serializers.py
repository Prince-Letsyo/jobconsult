import os
from django_countries.serializer_fields import CountryField
from rest_framework import serializers
from Utils.serializers_fields import JobSerializer
from Utils.choices import make_choices_data
from Utils.serializers_fields import   UserField
from user.models import (CompanyInfo,
                      CompanyRep, User, )


class CompanyRepSerializer(serializers.ModelSerializer):
    user = UserField(queryset=User)
    jobs = JobSerializer(many=True, read_only=True)

    class Meta:
        model = CompanyRep
        fields = [
            'user',
            'position',
            "jobs"
        ]
  

class RepresentativeField(serializers.RelatedField):
    def to_internal_value(self, data):
        id = data["user"].get("id", None)        
        if id:
            rep = CompanyRep.objects.filter(user_id=id)
            if rep.exists():
                instance = rep.first()
                nested_serializer = CompanyRepSerializer(instance=instance, data=data)
                nested_serializer.is_valid(raise_exception=True)
                nested_serializer.save()
                return instance
            else:
                raise serializers.ValidationError(
                    {"Rep": "Company Rep does not exist."}, 404)
        else:
            nested_serializer = CompanyRepSerializer(data=data)
            nested_serializer.is_valid(raise_exception=True)
            nested_serializer.save()
            return CompanyRep.objects.filter(id=nested_serializer['id'])

    def to_representation(self, value):
        id = value.user_id
        instance = CompanyRep.objects.filter(user_id=id).first()
        nested_serializer = CompanyRepSerializer(instance)
        return nested_serializer.data



class CompanyInfoSerializer(serializers.ModelSerializer):
    representative = RepresentativeField(queryset=CompanyRep)
    image = serializers.ImageField()        
    country = CountryField(default="GH")
    city = serializers.ChoiceField(choices=make_choices_data(key="name", value="state_code",
                                                             file="./states.json", filter_by="all"))

    class Meta:
        model = CompanyInfo
        fields = [
            'representative',
            'company_name',
            'industry',
            'number_of_employees',
            'type_of_employer',
            'hear_about',
            'website',
            'contact_person',
            'company_email',
            'company_phone_number',
            'country',
            'city',
            'address',
            'image',
        ]


    def update(self, instance, validated_data):
        if instance.image and hasattr(instance.image, "name") and validated_data["image"]:
            if instance.image.name.split("/")[-1] == validated_data["image"].name:
                validated_data.pop("image")
            else:
                file_path = instance.image.path
                if os.path.isfile(file_path):
                    os.remove(file_path)
        return super().update(instance, validated_data)
