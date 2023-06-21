# Generated by Django 4.1.7 on 2023-06-20 08:24

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('job', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='job',
            name='publisher',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='job_publisher', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='job',
            name='requirements',
            field=models.ManyToManyField(blank=True, related_name='job_requirements', to='job.requirement'),
        ),
        migrations.AddField(
            model_name='job',
            name='responsibilities',
            field=models.ManyToManyField(blank=True, related_name='job_responsibilities', to='job.responsibility'),
        ),
    ]
