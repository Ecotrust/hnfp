# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-08-22 20:13
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hnfp', '0021_auto_20170822_1249'),
    ]

    operations = [
        migrations.AlterField(
            model_name='observation',
            name='comments',
            field=models.CharField(blank=True, default=None, max_length=20000, null=True),
        ),
        migrations.AlterField(
            model_name='observation',
            name='observation_tally',
            field=models.CharField(blank=True, default=1, max_length=100, null=True),
        ),
    ]