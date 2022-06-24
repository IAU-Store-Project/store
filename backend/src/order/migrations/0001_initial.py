# Generated by Django 4.0.3 on 2022-06-24 14:45

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Created Time')),
                ('updated', models.DateTimeField(auto_now=True, verbose_name='Updated Time')),
                ('amount', models.FloatField(default=0)),
                ('is_paid', models.BooleanField(default=False)),
                ('status', models.CharField(choices=[(1, 'CANCEL'), (2, 'PENDING'), (3, 'CONFIRMED'), (4, 'SHIPPING'), (5, 'COMPLETED')], default=1, max_length=2)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='OrderItems',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Created Time')),
                ('updated', models.DateTimeField(auto_now=True, verbose_name='Updated Time')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
