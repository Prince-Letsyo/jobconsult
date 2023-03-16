# Generated by Django 4.1.7 on 2023-03-14 05:09

import application.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ApplicantDoc',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('document', models.FileField(upload_to=application.models.applicant_doc_directory_path)),
            ],
            options={
                'verbose_name': 'Application Doc',
                'verbose_name_plural': 'Application Docs',
            },
        ),
        migrations.CreateModel(
            name='Application',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('number_of_applicant', models.IntegerField(default=0)),
                ('sector', models.CharField(max_length=50)),
            ],
            options={
                'verbose_name': 'Application',
                'verbose_name_plural': 'Applications',
            },
        ),
        migrations.CreateModel(
            name='JobApplication',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('code', models.CharField(max_length=12, null=True, verbose_name='Job application code')),
                ('accepted', models.BooleanField(default=False)),
                ('date_applied', models.DateTimeField()),
                ('documents', models.ManyToManyField(related_name='applicant_documents', to='application.applicantdoc')),
            ],
            options={
                'verbose_name': 'Job Application',
                'verbose_name_plural': 'Job Applications',
            },
        ),
    ]