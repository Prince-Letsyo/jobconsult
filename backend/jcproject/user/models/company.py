from django.db import models
from django.utils.translation import gettext_lazy as _
from phonenumber_field.modelfields import PhoneNumberField
from Utils import (EmployeesNumber, EmployerType, Position, SectorChoices,
                   TimeStampsWithOrder, Website)

from .user import User


class CompanyRep(TimeStampsWithOrder):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True, related_name="company_rep")
    position = models.CharField(
        max_length=30, choices=Position.choices, default=Position.SELECT)  

    class Meta:
        verbose_name = 'Company Representative'
        verbose_name_plural = 'Company Representatives'

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"


def job_logo_directory_path(instance, filename):
    print(filename)
    return f'company_logo/{instance.company_name}/{filename}'


class CompanyInfo(TimeStampsWithOrder):
    representative = models.OneToOneField(
        CompanyRep, on_delete=models.CASCADE, primary_key=True)
    company_name = models.CharField(max_length=150, unique=True)
    industry = models.CharField(
        max_length=50, choices=SectorChoices.choices, default=SectorChoices.SELECT)
    number_of_employees = models.CharField(
        max_length=2, choices=EmployeesNumber.choices, default=EmployeesNumber.SELECT)
    type_of_employer = models.CharField(
        max_length=30, choices=EmployerType.choices, default=EmployerType.SELECT)
    hear_about = models.CharField(verbose_name=_(
        "Where did you hear about us?"), max_length=50, choices=Website.choices, default=Website.SELECT)
    website = models.CharField(max_length=100, null=True)
    contact_person = models.CharField(max_length=100)
    company_email = models.CharField(max_length=100)
    company_phone_number = PhoneNumberField()
    country = models.CharField(max_length=100)
    address = models.TextField()
    image = models.ImageField(upload_to=job_logo_directory_path)

    class Meta:
        verbose_name = 'Company Information'
        verbose_name_plural = 'Companies Information'

    def __str__(self):
        return self.company_name
