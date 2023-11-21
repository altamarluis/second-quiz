from rest_framework.test import APITestCase, APIRequestFactory
from .views import myAppAPIView
from django.urls import reverse
from rest_framework import status


#this tests the conection to the API of BigQuery
class ApiTesting(APITestCase):
    def test1(self):
        response = self.client.get(reverse("consultar_bigquery"))

        self.assertEqual(response.status_code,status.HTTP_200_OK)

#this tests the conections to the postgres dataset, get and post
class AnotherApiTesting(APITestCase):

    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = myAppAPIView.as_view()
        self.url = 'historial'

    def test2(self):
        request = self.factory.get(self.url)
        response = self.view(request)
        self.assertEqual(response.status_code,status.HTTP_200_OK)

    def test3(self):
        sample_post = {
            'title':'Sample',
            'user':'tester',
            'country':'testCountry',
            'indicator':'test',
            'yearmin':0,
            'yearmax':2000,
            'comments':'this is a sample'
        }
        request = self.factory.post(self.url,sample_post)
        response = self.view(request)
        self.assertEqual(response.status_code,status.HTTP_201_CREATED)
