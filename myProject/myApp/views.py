from django.shortcuts import render
from rest_framework import generics
from myApp import serializers
from myApp.models import Table1
from django.http import JsonResponse
from google.cloud import bigquery

def consultar_bigquery(request):
    try:
        if 'query' in request.GET:
            # Obtén la consulta desde los parámetros de la URL
            query = request.GET['query']
            print('Consulta recibida:', query)
        else:
            # Si no se proporciona una consulta, utiliza una consulta predeterminada
            query = """
            SELECT *
            FROM `bigquery-public-data.world_bank_intl_education.series_summary`
            LIMIT 10
            """

        client = bigquery.Client()
        
        query_job = client.query(query)
        results = [dict(row) for row in query_job.result()]

        return JsonResponse(results, safe=False)
    except Exception as e:
        # Maneja los errores de la consulta y devuelve un mensaje de error con la excepción
        print(f'Error en la consulta: {e}')
        return JsonResponse({'error': str(e)}, status=400)

class myAppAPIView(generics.ListCreateAPIView):
    queryset = Table1.objects.all()
    serializer_class = serializers.Table1Serializer

class myAppAPIMod(generics.RetrieveUpdateDestroyAPIView):
    queryset = Table1.objects.all()
    serializer_class = serializers.Table1Serializer

