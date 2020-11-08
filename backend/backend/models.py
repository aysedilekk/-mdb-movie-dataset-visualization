from django.db import models


class Movie(models.Model):
    title = models.CharField(max_length=800)
    year = models.IntegerField()
    date_published = models.CharField(max_length=100)
    genre = models.CharField(max_length=500)
    duration = models.IntegerField()
    country = models.CharField(max_length=300)
    language = models.CharField(max_length=300)
    director = models.CharField(max_length=300)
    writer = models.CharField(max_length=300)
    production_company = models.CharField(max_length=300)
    votes = models.FloatField()
    reviews_from_users = models.FloatField()
    reviews_from_critics = models.FloatField()
