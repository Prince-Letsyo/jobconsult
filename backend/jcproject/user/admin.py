from django.contrib import admin

from .models import *


class SeekerInline(admin.TabularInline):
    model = Seeker


class CompanyRepInline(admin.TabularInline):
    model = CompanyRep


class AdminUserInline(admin.TabularInline):
    model = AdminUser


class UserAdmin(admin.ModelAdmin):
    inlines = [
        SeekerInline, AdminUserInline,  CompanyRepInline
    ]
    list_display = ['email', 'first_name',
                    'last_name', 'is_verified', 'phone_number','user_type']
    search_fields = ['first_name', 'last_name']


class StaffAdmin(admin.ModelAdmin):
    list_display = ['user', 'position']
    search_fields = ['user', 'position']


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


class CompanyRepAdmin(admin.ModelAdmin):
    inlines = [CompanyRepInline]


admin.site.register(User, UserAdmin)
admin.site.register(Sector)
admin.site.register(Staff, StaffAdmin)
admin.site.register(CompanyInfo, CompanyInfoAdmin)
admin.site.register(AdminType)
admin.site.register(AdminPermission)
