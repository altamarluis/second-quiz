from google.cloud import bigquery
from django.db import models

#table to store the saved queries
class Table1(models.Model):
    title = models.CharField(max_length=80)
    user = models.CharField(max_length=80)
    country = models.CharField(max_length=80)
    indicator = models.CharField(max_length=100)
    yearmin = models.IntegerField()
    yearmax = models.IntegerField()
    comments = models.CharField(max_length=255)