from django.contrib import admin

from .models import Job, JobApproval, Requirement, Responsibility


class JobAdmin(admin.ModelAdmin):
    list_display = ['title', 'company_name', 'sector', 'deadline', 'publisher']
    search_fields = ['title', 'company_name']


class JobApprovalAdmin(admin.ModelAdmin):
    list_display = ['job', 'is_publish', 'publish_date']
    search_fields = ['job', 'is_publish']


admin.site.register(Job, JobAdmin)
admin.site.register(JobApproval, JobApprovalAdmin)
admin.site.register(Requirement)
admin.site.register(Responsibility)
