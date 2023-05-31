from rest_framework.permissions import BasePermission
from rest_framework import permissions


class IsVerified(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_verified)


class IsSectorOwner(IsVerified):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True 
        return obj.seeker.user_id==request.user.id
    
class IsUser(IsVerified):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True 
        return obj.id==request.user.id 
    
class IsSeeker(IsVerified):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True 
        return obj.user_id==request.user.id 
    
class IsCompanyRep(IsVerified):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True 
        return obj.user_id==request.user.id 

class IsCompanyInfoRep(IsVerified):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True 
        print(obj)
        return obj.representative.user_id==request.user.id 
class IsJobOwner(IsVerified):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True 
        return obj.publisher.user_id==request.user.id 

class IsProfile(IsVerified):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user
