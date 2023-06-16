import os
from django_countries.serializer_fields import CountryField
from rest_framework import serializers

from job.models import Requirement, Responsibility

from .serializers_fields import JobField, RepresentativeField, UserField
from ..models import (CompanyInfo,
                      CompanyRep, User, )
from job.models import Job


class CompanyRepSerializer(serializers.ModelSerializer):
    user = UserField(queryset=User)
    jobs = JobField(queryset=Job, many=True)

    class Meta:
        model = CompanyRep
        fields = [
            'user',
            'position',
            "jobs"
        ]

    def create(self, validated_data):
        jobs = validated_data.pop("jobs")

        instance = CompanyRep.objects.get(**validated_data)

        for job in jobs:
            publisher = job.pop("publisher")
            responsibilities = job.pop("responsibilities")
            requirements = job.pop("requirements")

            job_instance, exist = Job.objects.get_or_create(
                publisher=publisher, **job)

            for requirement in requirements:
                Requirement.objects.get_or_create(
                    job=job_instance, **requirement)
            job_instance.requirements.set(
                Requirement.objects.filter(job=job_instance))

            for responsibility in responsibilities:
                Requirement.objects.get_or_create(
                    job=job_instance, **responsibility)
                
            job_instance.responsibilities.set(
                Responsibility.objects.filter(job=job_instance))

        instance.jobs.set(Job.objects.filter(publisher=instance.publisher))

        instance.save()
        return instance


class CompanyInfoSerializer(serializers.ModelSerializer):
    representative = RepresentativeField(queryset=CompanyRep)
    image = serializers.ImageField()
    country = CountryField()

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
