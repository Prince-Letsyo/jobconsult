from Utils import TimeStampsWithOrder
from django.db import  models

from .user import User


class Staff(TimeStampsWithOrder):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True, related_name="staff_user")
    position = models.CharField(max_length=150)
    supervisor = models.ForeignKey(
        "self", on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} ({self.position})"

