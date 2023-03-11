from rest_framework import serializers

from .models import (AdminPermission, AdminType, AdminUser, CompanyInfo,
                     CompanyRep, Seeker, Staff, User)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'first_name',
            'last_name',
            'middle_name',
            'username',
            'gender',
            'user_type',
            'email',
            'phone_number',
        ]


class AdminTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminType
        fields = [
            'id',
            'admin_type',
            'permissions',
        ]


class AdminPermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminPermission
        fields = [
            'id',
            'type_permission',
            'permission',
        ]


class AdminUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminUser
        fields = [
            'user',
            'type_id',
            'last_login',
        ]


class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = [
            'user',
            'position',
            'supervisor',
        ]


class SeekerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seeker
        fields = [
            'user',
            'date_of_birth',
            'gender',
            'nationality',
            'location',
            'high_qualification',
            'years_of_experience',
            'available',
            'job_sector',
        ]


class CompanyRepSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyRep
        fields = [
            'user',
            'position',
        ]


class CompanyInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyInfo
        fields = [
            'representative',
            'company_name',
            'industry',
            'number_of_employees',
            'type_of_employer',
            'hear_about',
            'website',
            'contact_person',
            'company_email',
            'company_phone_number',
            'country',
            'address',
            'image',
        ]
