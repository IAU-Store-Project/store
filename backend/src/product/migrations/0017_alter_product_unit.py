# Generated by Django 4.0.3 on 2022-06-10 19:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0016_alter_product_unit'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='unit',
            field=models.CharField(choices=[('ITEM', 'ITEM'), ('KG', 'KG'), ('QTY', 'QTY')], default='QTY', max_length=5, verbose_name='Unit'),
        ),
    ]
