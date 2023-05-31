from django.db import models
from django.template.defaultfilters import slugify
from django.utils.translation import gettext_lazy as _
from user.models import  User, CompanyInfo
from Utils import (EmploymentType, JobType, MinimumQualification,
                   PublisherType, SectorChoices, TimeStampsWithOrder)


def job_logo_directory_path(instance, filename):
    return f'jobs/{instance.company_name.company_name}_{instance.title}/{filename}'


class Job(TimeStampsWithOrder):
    title = models.CharField(max_length=200)
    location = models.CharField(max_length=150)
    description = models.TextField()
    company_name = models.ForeignKey(
        CompanyInfo, on_delete=models.CASCADE, related_name="company_job")
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
    type_of_publisher = models.CharField(
        max_length=2, choices=PublisherType.choices, default=PublisherType.STAFF)
    publisher = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="job_publisher")

    class Meta:
        verbose_name = 'Job'
        verbose_name_plural = 'Jobs'

    def __str__(self):
        return self.title

    def save(self,*args, **kwargs):
        self.slug = slugify(self.title[:30])
        super().save(*args, **kwargs)


class JobApproval(TimeStampsWithOrder):
    job = models.ForeignKey(Job, on_delete=models.CASCADE,
                            related_name="waiting_approval_jobs")
    is_publish = models.BooleanField(default=False)
    publish_date = models.DateTimeField(null=True)

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


class Requirement(TimeStampsWithOrder):
    job = models.ForeignKey(Job, on_delete=models.CASCADE,
                            related_name="job_requirement")
    requires = models.TextField()

    class Meta:
        verbose_name = 'Requirement'
        verbose_name_plural = 'Requirements'

    def __str__(self):
        return self.requires
