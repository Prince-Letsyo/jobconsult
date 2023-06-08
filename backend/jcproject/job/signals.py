import os
from application.models import Application
from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver

from .models import Job, JobApproval


@receiver(post_save, sender=Job)
def post_save_create_job_approval(sender, instance, created, **kwargs):
    if created:
        JobApproval.objects.create(job=instance).save()


@receiver(pre_delete, sender=Job)
def delete_job_file(sender, instance, **kwargs):
    file_path=instance.image.path
    if os.path.isfile(file_path):
        os.remove(file_path)


@receiver(post_save, sender=JobApproval)
def post_save_create_job_approval(sender, instance, created, **kwargs):
    if instance.is_publish:
        Application.objects.get_or_create(job=instance.job, sector=instance.job.sector)


