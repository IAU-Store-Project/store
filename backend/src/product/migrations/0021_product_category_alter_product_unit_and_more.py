# Generated by Django 4.0.3 on 2022-06-21 20:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('category', '0006_alter_category_options'),
        ('product', '0020_alter_product_unit_alter_productcategory_product'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='category',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='category.category'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='product',
            name='unit',
            field=models.CharField(choices=[('KG', 'KG'), ('QTY', 'QTY'), ('ITEM', 'ITEM')], default='QTY', max_length=5, verbose_name='Unit'),
        ),
        migrations.DeleteModel(
            name='ProductCategory',
        ),
    ]