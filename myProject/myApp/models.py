from django.db import models
from google.cloud import bigquery
client = bigquery.Client()
query = """
    SELECT corpus AS title, COUNT(word) AS unique_words
    FROM `bigquery-public-data.samples.shakespeare`
    GROUP BY title
    ORDER BY unique_words
    DESC LIMIT 10
"""
results = client.query(query)

for row in results:
    title = row['title']
    unique_words = row['unique_words']
    print(f'{title:<20} | {unique_words}')

class Table1(models.Model):
    atr1 = models.CharField(max_length=80)
    atr2 = models.IntegerField()