# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-10-25 16:09
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hnfp', '0011_auto_20171025_0852'),
    ]

    operations = [
        migrations.AddField(
            model_name='alert',
            name='alert_photo',
            field=models.ImageField(blank=True, max_length=2000, null=True, upload_to='alerts/%Y/%m/%d'),
        ),
    ]
