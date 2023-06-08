from django.contrib import admin

from .models import Job, JobApproval, Requirement, Responsibility


class JobAdmin(admin.ModelAdmin):
    list_display = ['title', 'company_name', 'sector', 'deadline', 'publisher']
    search_fields = ['title', 'company_name']


class JobApprovalAdmin(admin.ModelAdmin):
    list_display = ['job', 'is_publish', 'publish_date']
    search_fields = ['job', 'is_publish']
    actions=["publish_job_to_Applications"]
    
    def publish_job_to_Applications(self,request,queryset):
        queryset.update(is_publish=True)
        for q in queryset:
            q.save()
    
    publish_job_to_Applications.short_description="Publish jobs to Applications"
        


admin.site.register(Job, JobAdmin)
admin.site.register(JobApproval, JobApprovalAdmin)
admin.site.register(Requirement)
admin.site.register(Responsibility)
