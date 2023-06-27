import os
from django.utils import timezone
from application.models import Application
from django.db.models.signals import pre_save, post_save, pre_delete
from django.dispatch import receiver
from .models import Job, JobApproval
from user.models import CompanyRep, Staff


@receiver(post_save, sender=Job)
def post_save_create_job_approval(sender, instance, created, **kwargs):
    if created:
        JobApproval.objects.create(job=instance).save()

        if instance.publisher.user_type == "company-rep":
            rep = CompanyRep.objects.get(user=instance.publisher.id)
            rep.jobs.add(instance)
            rep.save()
        elif instance.publisher.user_type == "staff":
            staff = Staff.objects.get(user=instance.publisher.id)
            staff.jobs.add(instance)
            staff.save()


@receiver(pre_delete, sender=Job)
def delete_job_file(sender, instance, **kwargs):
    file_path = instance.image.path
    if os.path.isfile(file_path):
        os.remove(file_path)


@receiver(pre_save, sender=JobApproval)
def add_publish_and_withdraw_date(sender, instance, **kwargs):
    if not instance.is_publish:
        deadline = instance.job.deadline
        instance.withdraw_date = deadline
        instance.publish_date = timezone.now()

    if instance.is_publish and instance.withdraw_date == instance.publish_date:
        instance.is_publish = False


@receiver(post_save, sender=JobApproval)
def post_save_create_job_approval(sender, instance, created, **kwargs):
    if instance.is_publish:
        Application.objects.get_or_create(
            job=instance.job, sector=instance.job.sector)
