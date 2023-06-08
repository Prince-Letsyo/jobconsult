from django.db.models.signals import pre_save
from django.dispatch import receiver
from .models import Sector

# @receiver(pre_save, sender=Sector)
# def delete_duplicate(sender, instance, **kwargs):
#     print(instance)