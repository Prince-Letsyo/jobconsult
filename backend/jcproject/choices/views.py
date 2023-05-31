from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from Utils.choices import (MinimumQualification, Position, Sex, EmployeesNumber,
                           EmployerType, EmploymentType, JobType, SectorChoices, Website)
from .serializers import ChoicesDisplayField

# Create your views here.


class GenericChoiceAPIView(APIView):
    def get(self,  request, choice, *args, **kwargs):
        choices = None
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
            return Response({"choice": "choice not found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(ChoicesDisplayField().to_representation(choices), status=status.HTTP_200_OK)
