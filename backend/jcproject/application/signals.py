import random
import string

from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver

from .models import Application, JobApplication


def generate_code():
    chars = string.ascii_uppercase + string.digits
    return ''.join(random.choice(chars) for x in range(15))


@receiver(post_save, sender=JobApplication)
def post_save_job_application(sender, instance, created, **kwargs):
    if created:
        job = instance.job 
        application = Application.objects.get(job=job)
        application.number_of_applicant += 1
        instance.code = generate_code()
        instance.save()
        application.save()


@receiver(pre_delete, sender=JobApplication)
def pre_delete_job_application(sender, instance, **kwargs):
    Application.objects.get(job=instance.job).delete()
