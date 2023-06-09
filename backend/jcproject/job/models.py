from django.db import models
from django.db.models import Q
from django.template.defaultfilters import slugify
from django.utils.translation import gettext_lazy as _
from django_countries.fields import CountryField
from django_countries.fields import CountryField
from user.models import User
from Utils import (EmploymentType, JobType, MinimumQualification,
                   SectorChoices, TimeStampsWithOrder, CityBasedOnCountryChoices)


def job_logo_directory_path(instance, filename):
    return f'jobs/{instance.title}/{filename}'


class Job(TimeStampsWithOrder):
    title = models.CharField(max_length=200)
    country = CountryField(default="GH")
    city = models.CharField(
        max_length=30, choices=CityBasedOnCountryChoices.choices, default=CityBasedOnCountryChoices.SELECT)
    description = models.TextField()
    image = models.ImageField(upload_to=job_logo_directory_path)
    sector = models.CharField(
        max_length=50, choices=SectorChoices.choices, default=SectorChoices.SELECT, null=False, blank=False)
    type_of_job = models.CharField(
        max_length=50, choices=JobType.choices, default=JobType.SELECT, null=False, blank=False)
    deadline = models.DateTimeField()
    minimum_qualification = models.CharField(
        max_length=20, choices=MinimumQualification.choices, default=MinimumQualification.SELECT, null=False, blank=False)
    type_of_employment = models.CharField(
        max_length=30, choices=EmploymentType.choices, default=EmploymentType.SELECT, null=False, blank=False)
    experience_length = models.IntegerField(default=1)
    responsibilities = models.ManyToManyField(
        "Responsibility", related_name="job_responsibilities", blank=True)
    requirements = models.ManyToManyField(
        "Requirement", related_name="job_requirements", blank=True)
    number_of_required_applicantion = models.IntegerField(default=1)
    slug = models.SlugField(blank=True)
    publisher = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="job_publisher")

    class Meta:
        verbose_name = 'Job'
        verbose_name_plural = 'Jobs'

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title[:30])
        super().save(*args, **kwargs)


class JobApproval(TimeStampsWithOrder):
    job = models.ForeignKey(Job, on_delete=models.CASCADE,
                            related_name="waiting_approval_jobs")
    is_publish = models.BooleanField(default=False)
    publish_date = models.DateTimeField(null=True, blank=True)
    withdraw_date = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name = 'Job Approval'
        verbose_name_plural = 'Jobs Approval'

    def __str__(self):
        return self.job.title


class Responsibility(TimeStampsWithOrder):
    job = models.ForeignKey(Job, on_delete=models.CASCADE,
                            related_name="job_responsibility")
    assign = models.TextField()

    class Meta:
        verbose_name = 'Responsibility'
        verbose_name_plural = 'Responsibilities'

    def __str__(self):
        return self.assign

    def save(self, *args, **kwargs):
        all_responsibility = Responsibility.objects.filter(
            Q(job=self.job) & Q(assign=self.assign))
        if all_responsibility.exists():
            return
        return super().save(*args, **kwargs)


class Requirement(TimeStampsWithOrder):
    job = models.ForeignKey(Job, on_delete=models.CASCADE,
                            related_name="job_requirement")
    requires = models.TextField()

    class Meta:
        verbose_name = 'Requirement'
        verbose_name_plural = 'Requirements'

    def __str__(self):
        return self.requires

    def save(self, *args, **kwargs):
        all_requirement = Requirement.objects.filter(
            Q(job=self.job) & Q(requires=self.requires))
        if all_requirement.exists():
            return
        return super().save(*args, **kwargs)
