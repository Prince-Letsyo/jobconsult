from application.models import Application
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Job, JobApproval


@receiver(post_save, sender=Job)
def post_save_create_job_approval(sender, instance, created, **kwargs):
    if created:
        JobApproval.objects.create(job=instance).save()
        Application.objects.create(job=instance, sector=instance.sector).save()
