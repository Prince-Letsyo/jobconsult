from django.db import models
from django.utils.translation import gettext_lazy as _
from job.models import Job
from user.models import Seeker
from Utils import CreatedAtWithOrder
from django.db.models import Q


class Application(CreatedAtWithOrder):
    job = models.OneToOneField(Job, on_delete=models.CASCADE)
    number_of_applicant = models.IntegerField(default=0)
    job_applications = models.ManyToManyField(
        "JobApplication", related_name="application_documents")
    sector = models.CharField(max_length=50)

    class Meta:
        verbose_name = 'Application'
        verbose_name_plural = 'Applications'

    def __str__(self):
        if self.number_of_applicant == 0:
            return f"No applicant for {self.job.title} "
        else:
            if self.number_of_applicant == 1:
                return f"{self.number_of_applicant} applicant for {self.job.title} "
            else:
                return f"{self.number_of_applicant} applicants for {self.job.title} "


class JobApplication(CreatedAtWithOrder):
    job = models.ForeignKey(Job, on_delete=models.CASCADE,
                            related_name="job_applied")
    seeker = models.ForeignKey(Seeker, on_delete=models.CASCADE,
                               related_name="applicant")
    code = models.CharField(verbose_name=_(
        "Job application code"), max_length=12, blank=True)
    documents = models.ManyToManyField(
        "ApplicantDoc", related_name="applicant_documents", blank=True)
    accepted = models.BooleanField(default=False)
    date_applied = models.DateTimeField()

    class Meta:
        verbose_name = 'Job Application'
        verbose_name_plural = 'Job Applications'

    def __str__(self):
        return f"{self.seeker.user.first_name} {self.seeker.user.last_name} applied for {self.job.title}"


def applicant_doc_directory_path(instance, filename):
    return f'documents/seeker_[{instance.job_application.job.title}]/{filename}'


class ApplicantDoc(CreatedAtWithOrder):
    job_application = models.ForeignKey(
        JobApplication, on_delete=models.CASCADE, related_name="application_doc")
    document = models.FileField(
        upload_to=applicant_doc_directory_path, max_length=100)

    class Meta:
        verbose_name = 'Application Doc'
        verbose_name_plural = 'Application Docs'

    def __str__(self):
        return self.job_application.job.title
