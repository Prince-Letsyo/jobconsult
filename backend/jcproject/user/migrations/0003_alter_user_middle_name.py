# Generated by Django 4.1.7 on 2023-04-10 17:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_alter_seeker_job_sector_alter_user_middle_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='middle_name',
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
    ]
