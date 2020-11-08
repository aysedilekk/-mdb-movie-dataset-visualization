from rest_framework.test import APITestCase

from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User


class ApiTest(APITestCase):
    def setUp(self):
        """
        Create user. (Registration Test)
        """
        self.credentials = {
            'username': 'testuser',
            'password': 'secret'}
        self.user = User.objects.create_user(**self.credentials)
        self.token = Token.objects.create(user=self.user)

    def test_login(self):
        """
        Login with created user. (Login Test)
        Returns 200 if success.
        """
        # send login data
        response = self.client.post(
            '/auth/login/', self.credentials, follow=True)
        # should be logged in now
        self.assertEqual(response.status_code, 200)

    def test_data_endpoint_without_authentication(self):
        """
        Get data without authentication. (Endpoint Test)
        Returns 401 unauthorized.
        """
        response = self.client.get('/most-voted-movies/')
        self.assertEqual(response.status_code, 401)

    def test_data_endpoint_with_authentication(self):
        """
        Get data without authentication. (Endpoint Test)
        Returns 200 if success.
        """
        token = Token.objects.get(user__username='testuser')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

        response = self.client.get('/most-voted-movies/')
        self.assertEqual(response.status_code, 200)
