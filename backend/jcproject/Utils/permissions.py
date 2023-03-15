from rest_framework.permissions import BasePermission


class IsVerified(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_verified)


class IsOwner(IsVerified):
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user


class IsProfile(IsVerified):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user
