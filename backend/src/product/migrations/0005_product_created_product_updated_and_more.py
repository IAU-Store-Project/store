# Generated by Django 4.0.3 on 2022-05-12 18:46

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0004_product_img_alter_product_unit'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now, verbose_name='Created Time'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='product',
            name='updated',
            field=models.DateTimeField(auto_now=True, verbose_name='Updated Time'),
        ),
        migrations.AddField(
            model_name='productcategory',
            name='created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now, verbose_name='Created Time'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='productcategory',
            name='updated',
            field=models.DateTimeField(auto_now=True, verbose_name='Updated Time'),
        ),
        migrations.AlterField(
            model_name='product',
            name='unit',
            field=models.CharField(choices=[('ITEM', 'ITEM'), ('KG', 'KG'), ('QTY', 'QTY')], default='QTY', max_length=5, verbose_name='Unit'),
        ),
    ]