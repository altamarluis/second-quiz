from django.shortcuts import render
from rest_framework import generics
from myApp import serializers
from myApp.models import Table1
from django.http import JsonResponse
from google.cloud import bigquery
from django.core.paginator import Paginator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view


# handles queries to Google BigQuery
def consultar_bigquery(request):
    try:
        if 'query' in request.GET:
            # Get the query from the URL parameters
            query = request.GET['query']
        else:
            # If no query is provided, use a default query
            query = """
            SELECT *
            FROM `bigquery-public-data.world_bank_intl_education.series_summary`
            LIMIT 10
            """
        # Set up the BigQuery client
        client = bigquery.Client()

        # Run the query
        query_job = client.query(query)

        # Fetch the results
        result_list = list(query_job.result())
        results = [dict(row) for row in query_job.result()]

        return JsonResponse(results, safe=False)
    except Exception as e:
        # Handles query errors and returns an error message with the exception
        print(f'Error en la consulta: {e}')
        return JsonResponse({'error': str(e)}, status=400)

# provides a List and Create API endpoint for the Table1 model,
class myAppAPIView(generics.ListCreateAPIView):
    queryset = Table1.objects.all()
    serializer_class = serializers.Table1Serializer

# provides Retrieve, Update, and Destroy API endpoints for the Table1 model
class myAppAPIMod(generics.RetrieveUpdateDestroyAPIView):
    queryset = Table1.objects.all()
    serializer_class = serializers.Table1Serializer

