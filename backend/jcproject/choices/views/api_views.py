from django_countries import countries
from django.db.models import TextChoices
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from Utils.choices import (MinimumQualification, Position, Sex, EmployeesNumber,
                           EmployerType, EmploymentType, JobType, SectorChoices, Website, nationality_choices, make_choices_data)
from choices.serializers import ChoicesDisplayField, CountryDisplayField, CityDisplayField

class GenericChoiceAPIView(APIView):
    choices_param_config = openapi.Parameter(name="choices", in_=openapi.IN_QUERY,
                                             description="choices", type=openapi.TYPE_STRING)

    @swagger_auto_schema(manual_parameters=[choices_param_config])
    def get(self,  request, *args, **kwargs):
        choice = request.GET.get("choices")

        if choice == "position":
            choices = Position
        elif choice == "sex":
            choices = Sex
        elif choice == "qualication":
            choices = MinimumQualification
        elif choice == "sector":
            choices = SectorChoices
        elif choice == "number_employers":
            choices = EmployeesNumber
        elif choice == "employer_type":
            choices = EmployerType
        elif choice == "heard":
            choices = Website
        elif choice == "type_of_job":
            choices = JobType
        elif choice == "type_employment":
            choices = EmploymentType
        else:
            return Response({"choices": "choice not found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(ChoicesDisplayField().to_representation(choices), status=status.HTTP_200_OK)


class NationalityList(APIView):
    def get(self,  request, *args, **kwargs):
        return Response(ChoicesDisplayField().to_representation(nationality_choices), status=status.HTTP_200_OK)


class CountryListView(APIView):
    def get(self, request, *args, **kwargs):
        country_data = list(countries)
        return Response(CountryDisplayField().to_representation(country_data), status=status.HTTP_200_OK)


class CityListView(APIView):
    country_code_param_config = openapi.Parameter(name="country_code", in_=openapi.IN_QUERY,
                                                  description="description", type=openapi.TYPE_STRING)

    @swagger_auto_schema(manual_parameters=[country_code_param_config])
    def get(self, request, *args, **kwargs):
        country_code = request.GET.get("country_code")

        if country_code:
            try:
                cities = make_choices_data(key="name", value="state_code",
                                           file="./states.json", filter_by=country_code)
                return Response(CityDisplayField().to_representation(cities),
                                status=status.HTTP_200_OK)
            except Exception:
                return Response({"error": "Internal server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response({"country_code": "Counntry not found"}, status=status.HTTP_404_NOT_FOUND)
