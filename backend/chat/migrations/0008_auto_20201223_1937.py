# Generated by Django 3.1.4 on 2020-12-23 19:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0007_message_sender_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='channel',
            name='description',
            field=models.CharField(default='', max_length=128),
        ),
        migrations.AddField(
            model_name='channel',
            name='topic',
            field=models.CharField(default='', max_length=128),
        ),
    ]
