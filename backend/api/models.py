from django.db import models
from django.contrib.auth.models import User


# Create your models here.



class Task(models.Model):
    content = models.CharField(max_length=255)
    date = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)