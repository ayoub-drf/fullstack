# Generated by Django 5.1.3 on 2024-12-05 12:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='post_image',
            field=models.ImageField(default='posts/post.png', upload_to='posts/%Y/%m/%d/'),
        ),
    ]