# Generated by Django 4.2.7 on 2023-11-20 00:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myApp', '0002_rename_atr1_table1_country_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='table1',
            old_name='Coments',
            new_name='comments',
        ),
        migrations.RenameField(
            model_name='table1',
            old_name='Country',
            new_name='country',
        ),
        migrations.RenameField(
            model_name='table1',
            old_name='Indicator',
            new_name='indicator',
        ),
        migrations.RenameField(
            model_name='table1',
            old_name='Title',
            new_name='title',
        ),
        migrations.RenameField(
            model_name='table1',
            old_name='User',
            new_name='user',
        ),
        migrations.RenameField(
            model_name='table1',
            old_name='YearMax',
            new_name='yearmax',
        ),
        migrations.RenameField(
            model_name='table1',
            old_name='YearMin',
            new_name='yearmin',
        ),
    ]
