from django.contrib import admin

from .models import ApplicantDoc, Application, JobApplication


class ApplicationAdmin(admin.ModelAdmin):
    list_display = [
        'job',
        'number_of_applicant',
        'sector',
    ]
    search_fields = [
        'job',
        'number_of_applicant',
        'sector',
    ]


class JobApplicationAdmin(admin.ModelAdmin):
    list_display = [
        'job',
        'seeker',
        'code',
        'accepted',
        'date_applied',
    ]

    search_fields = [
        'job',
        'seeker',
        'code',
    ]


admin.site.register(Application, ApplicationAdmin)
admin.site.register(JobApplication, JobApplicationAdmin)
admin.site.register(ApplicantDoc)
