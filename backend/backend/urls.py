from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from . import views

urlpatterns = [
    path('', views.index),
    path('auth/register/', views.UserCreate.as_view(), name='auth_register'),
    path('auth/login/', obtain_auth_token, name='auth_login'),
    path('movies/', views.MovieListAPIView.as_view(), name='movies'),
    path('movie-count-for-genre/', views.movie_count_by_genre),
    path('movie-count-for-year/', views.movie_count_by_year),
    path('most-voted-movies/', views.most_voted_movies),
    path('review-count-for-random-movies/', views.review_count_for_random_movies),
]
