from django.db import models
from Utils import TimeStamps, Admin_Type, PermissionChoice

from .user import User


class AdminType(TimeStamps):
    admin_type = models.CharField(
        max_length=30, choices=Admin_Type.choices, default=Admin_Type.SUPERADMIN)
    permissions = models.ManyToManyField("AdminPermission")


class AdminPermission(models.Model):
    type_permission = models.ForeignKey(AdminType, on_delete=models.CASCADE)
    permission = models.CharField(
        max_length=30, choices=PermissionChoice.choices, default=PermissionChoice.VIEW)


class AdminUser(TimeStamps):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True, related_name="admin_user")
    type_id = models.ForeignKey(
        AdminType, on_delete=models.CASCADE, null=True, related_name="user_admin_type")
    last_login = models.DateTimeField()
