from django.contrib import admin
from django import forms
from .models import Job, JobApproval, Requirement, Responsibility


class JobFormAdmin(forms.ModelForm):
    class Meta:
        model = Job
        fields = (
            "title",
            "publisher",
            "description",
            "image",
            "sector",
            "type_of_job",
            "minimum_qualification",
            "type_of_employment",
            "country",
            "city",
            "experience_length",
            "responsibilities",
            "requirements",
            "number_of_required_applicantion",
            "deadline",
        )


class JobAdmin(admin.ModelAdmin):
    form = JobFormAdmin
    
    class Media:
        js = ('js/admin/job/job_admin.js',)
        
    list_display = ['title',  'sector', 'deadline', 'publisher']
    search_fields = ['title', 'sector']


class JobApprovalAdmin(admin.ModelAdmin):
    list_display = ['job', 'is_publish', 'publish_date']
    search_fields = ['job', 'is_publish']
    actions = ["publish_job_to_Applications"]

    def publish_job_to_Applications(self, request, queryset):
        queryset.update(is_publish=True)
        for q in queryset:
            q.save()

    publish_job_to_Applications.short_description = "Publish jobs to Applications"


admin.site.register(Job, JobAdmin)
admin.site.register(JobApproval, JobApprovalAdmin)
admin.site.register(Requirement)
admin.site.register(Responsibility)
