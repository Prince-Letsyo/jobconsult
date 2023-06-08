from typing import Any, Tuple
from django.contrib import admin
from django.db.models.query import QuerySet
from django.db.models import Q
from django.http.request import HttpRequest

from .models import *


class SeekerInline(admin.TabularInline):
    model = Seeker


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


class CompanyInfoAdmin(admin.ModelAdmin):

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
