from django.urls import path
from myApp import views

urlpatterns = [
    path('myApp/',views.myAppAPIView.as_view()),
    path('Table1/<int:pk>/',views.myAppAPIMod.as_view()),
    
]