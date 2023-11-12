from google.cloud import bigquery
from django.db import models


class Table1(models.Model):
    atr1 = models.CharField(max_length=80)
    atr2 = models.IntegerField()