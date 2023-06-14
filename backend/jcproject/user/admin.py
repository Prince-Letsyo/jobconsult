from typing import Any, List, Optional, Tuple
from django import forms
from django.forms import inlineformset_factory
from django.forms.models import BaseInlineFormSet
from django.contrib import admin
from django.contrib.admin.options import InlineModelAdmin
from django.db import models
from django.db.models.query import QuerySet
from django.db.models import Q
from django.http.request import HttpRequest
from Utils import *
from .models import *


class SeekerAdminForm(forms.ModelForm):
    class Meta:
        model = Seeker
        fields = (
            "user",
            "date_of_birth",
            "nationality",
            "city",
            "high_qualification",
            "years_of_experience",
            "available",
            "job_sector",
        )

class SeekerInline(admin.TabularInline):
    form = SeekerAdminForm
    model = Seeker
   

    class Media:
        js = ('js/admin/seeker/seeker_admin.js',)


class CompanyRepInline(admin.TabularInline):
    model = CompanyRep


class AdminUserInline(admin.TabularInline):
    model = AdminUser


class UserAdmin(admin.ModelAdmin):
    inlines = [SeekerInline, CompanyRepInline]
    list_display = ['email', 'first_name',
                    'last_name', 'is_verified', 'phone_number', 'user_type']
    search_fields = ['first_name', 'last_name']


class StaffAdmin(admin.ModelAdmin):
    inlines = [
        AdminUserInline
    ]
    list_display = ['user', 'first_name',
                    'last_name', 'position', "supervisor"]
    search_fields = ['position']

    def first_name(self, obj):
        return obj.user.first_name

    def last_name(self, obj):
        return obj.user.last_name

    first_name.short_description = "Fisrt Name"
    last_name.short_description = "Last Name"

    def get_search_results(self, request: HttpRequest, queryset: QuerySet[Any], search_term: str) -> Tuple[QuerySet[Any], bool]:
        queryset, use_distinct = super().get_search_results(request, queryset, search_term)

        try:
            staff_ids = Staff.objects.filter(
                Q(user__email__icontains=search_term) |
                Q(user__last_name__icontains=search_term) |
                Q(user__first_name__icontains=search_term)
            ).values_list("user", flat=True)
            queryset |= self.model.objects.filter(user__id__in=staff_ids)
        except ValueError:
            pass
        return queryset, use_distinct


class CompanyInfoAdminForm(forms.ModelForm):
    class Meta:
        model = CompanyInfo
        fields = (
            "representative",
            "company_name",
            "industry",
            "number_of_employees",
            "type_of_employer",
            "hear_about",
            "website",
            "contact_person",
            "company_email",
            "company_phone_number",
            "country",
            "city",
            "address",
            "image",
        )


class CompanyInfoAdmin(admin.ModelAdmin):
    form = CompanyInfoAdminForm

    class Media:
        js = ('js/admin/company/company_admin.js',)

    list_display = ['representative',
                    'company_name',
                    'industry',
                    'type_of_employer',
                    'hear_about'
                    ]
    search_fields = ['representative',
                     'company_name',
                     'industry',
                     'type_of_employer',
                     'hear_about'
                     ]


admin.site.register(User, UserAdmin)
admin.site.register(Sector)
admin.site.register(Staff, StaffAdmin)
admin.site.register(CompanyInfo, CompanyInfoAdmin)
admin.site.register(AdminType)
admin.site.register(AdminPermission)
