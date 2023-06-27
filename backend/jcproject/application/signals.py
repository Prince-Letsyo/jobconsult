import random
import string

from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver

from .models import Application, JobApplication, ApplicantDoc


def generate_code():
    chars = string.ascii_uppercase + string.digits
    return ''.join(random.choice(chars) for x in range(15))


@receiver(post_save, sender=JobApplication)
def post_save_job_application(sender, instance, created, **kwargs):
    if created:
        applications = Application.objects.filter(job=instance.job)
        if applications.exists():
            application = applications.first()
            application.number_of_applicant += 1.0
            application.job_applications.add(instance)
            instance.code = generate_code()
            instance.save()
            application.save()


@receiver(post_save, sender=ApplicantDoc)
def post_save_add_doc_to_job(sender, instance, created, **kwargs):
    if created:
        jobs = JobApplication.objects.filter(id=instance.job_application.id)
        if jobs.exists():
            job = jobs.first()
            job.documents.add(instance)
            job.save()


@receiver(pre_delete, sender=JobApplication)
def pre_delete_job_application(sender, instance, **kwargs):
    applications = Application.objects.filter(job=instance.job)
    if applications.exists():
        application = applications.first()
        if application.number_of_applicant >= 0:
            application.number_of_applicant -= 1
            application.save()
