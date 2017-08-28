# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-08-22 21:46
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('drawing', '0003_auto_20170706_1438'),
        ('hnfp', '0022_auto_20170822_1313'),
    ]

    operations = [
        migrations.CreateModel(
            name='AOI',
            fields=[
                ('aoi_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='drawing.AOI')),
            ],
            options={
                'abstract': False,
            },
            bases=('drawing.aoi',),
        ),
    ]