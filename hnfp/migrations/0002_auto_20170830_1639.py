# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-08-30 23:39
from __future__ import unicode_literals

import django.contrib.gis.db.models.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hnfp', '0001_squashed_0026_auto_20170822_1712'),
    ]

    operations = [
        migrations.CreateModel(
            name='Alert',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('alert_date', models.CharField(blank=True, max_length=100, null=True)),
                ('alert_time', models.CharField(blank=True, max_length=20, null=True)),
                ('alert_type', models.CharField(blank=True, max_length=400, null=True)),
                ('alert_created', models.DateTimeField(auto_now_add=True)),
                ('alert_updated', models.DateTimeField(auto_now=True)),
                ('alert_username', models.CharField(blank=True, max_length=800, null=True)),
                ('alert_location', django.contrib.gis.db.models.fields.PointField(blank=True, default=None, null=True, srid=3857)),
                ('alert_comment', models.CharField(blank=True, default=None, max_length=20000, null=True)),
            ],
            options={
                'verbose_name_plural': 'Alerts',
            },
        )
    ]
