# Generated by Django 3.1.5 on 2021-02-10 15:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0016_auto_20210210_1533'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='destination_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='chat.channel'),
        ),
    ]