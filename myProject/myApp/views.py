from django.shortcuts import render
from rest_framework import generics
from myApp import serializers
from myApp.models import Table1

class myAppAPIView(generics.ListCreateAPIView):
    queryset = Table1.objects.all()
    serializer_class = serializers.Table1Serializer

class myAppAPIMod(generics.RetrieveUpdateDestroyAPIView):
    queryset = Table1.objects.all()
    serializer_class = serializers.Table1Serializer

