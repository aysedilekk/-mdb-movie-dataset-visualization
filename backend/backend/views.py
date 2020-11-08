from django.contrib.auth.models import User
from django.shortcuts import render
from rest_framework import generics
from rest_framework import permissions
from rest_framework import decorators
from rest_framework import response

from django.db.models import Count

from .serializers import UserSerializer, MovieSerializer

from .create_db import create_db

from .models import Movie


def index(request):
    movies = Movie.objects.all()
    if len(movies):
        pass
    else:
        create_db()
    return render(request, 'index.html', {'entries': "entries"})


# Register
class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny, )


@decorators.api_view(['GET'])
@decorators.permission_classes((permissions.IsAuthenticated, ))
def movie_count_by_genre(request):
    non_singular_genres = Movie.objects.values('genre').annotate(
        genre_count=Count('id'))
    genre_counts = {}
    for genre_data in non_singular_genres:
        genres = genre_data['genre'].split(',')
        for genre in genres:
            genre = genre.strip()
            if genre not in genre_counts:
                genre_counts[genre] = 0
            genre_counts[genre] += genre_data['genre_count']
    print(genre_counts)
    return response.Response(genre_counts)


@decorators.api_view(['GET'])
@decorators.permission_classes((permissions.IsAuthenticated, ))
def movie_count_by_year(request):
    movie_count_for_years = Movie.objects.order_by('year').values(
        'year').annotate(movie_count=Count('id'))
    movie_count = {}
    for movie in movie_count_for_years:
        movie_count[movie['year']] = movie['movie_count']
    print(movie_count)
    return response.Response(movie_count)


@decorators.api_view(['GET'])
@decorators.permission_classes((permissions.IsAuthenticated, ))
def most_voted_movies(request):
    most_voted_50_movies = Movie.objects.values('title', 'votes').order_by(
        "-votes")[:50]
    most_voted_movies = {}
    for movie in most_voted_50_movies:
        most_voted_movies[movie['title']] = movie['votes']
    print(most_voted_movies)
    return response.Response(most_voted_movies)


@decorators.api_view(['GET'])
@decorators.permission_classes((permissions.IsAuthenticated, ))
def review_count_for_random_movies(request):
    review_count_for_random_movies = Movie.objects.values(
        'title', 'reviews_from_users', 'reviews_from_critics').order_by(
            '?')[:50]
    review_count = {}
    review_count[0] = {}
    review_count[1] = {}
    for movie in review_count_for_random_movies:
        review_count[0][movie['title']] = movie['reviews_from_users']
        review_count[1][movie['title']] = movie['reviews_from_critics']
    return response.Response(review_count)


# Example for url protect (/movies)
class MovieListAPIView(generics.ListAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    permission_classes = (permissions.IsAuthenticated, )
