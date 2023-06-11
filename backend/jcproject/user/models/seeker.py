from django_countries.fields import CountryField
from django.db import models
from django.db.models import Q
from Utils import (MinimumQualification, SectorChoices,
                   TimeStampsWithOrder, nationality_choices, CityBasedOnNationalityChoices)

from .user import User


class Seeker(TimeStampsWithOrder):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True, related_name="job_seeker")
    date_of_birth = models.DateField()
    nationality = models.CharField(
        max_length=30, choices=nationality_choices.choices, default=nationality_choices.choices[0][0])
    city = models.CharField(
        max_length=30, choices=CityBasedOnNationalityChoices.choices, default=CityBasedOnNationalityChoices.SELECT)
    high_qualification = models.CharField(
        max_length=15, choices=MinimumQualification.choices, default=MinimumQualification.SELECT)
    years_of_experience = models.IntegerField(default=1)
    available = models.BooleanField(default=True)
    job_sector = models.ManyToManyField(
        "Sector", related_name="sector_list", blank=True)

    def __str__(self):
        return f"{self.user.email}"

    class Meta:
        verbose_name = 'Job seeker'
        verbose_name_plural = 'Job seekers'


class Sector(models.Model):
    seeker = models.ForeignKey(
        Seeker, on_delete=models.CASCADE, related_name="seeker_sector")
    sector = models.CharField(
        max_length=50, choices=SectorChoices.choices, default=SectorChoices.SELECT)

    def __str__(self):
        return self.sector

    def save(self, *args, **kwargs):
        allSector = Sector.objects.filter(
            Q(sector=self.sector) & Q(seeker=self.seeker))
        if allSector.exists():
            return
        return super().save(*args, **kwargs)

    class Meta:
        verbose_name = 'Sector'
        verbose_name_plural = 'Sectors'
