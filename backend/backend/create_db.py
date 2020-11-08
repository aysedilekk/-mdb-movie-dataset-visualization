import csv
from .models import Movie

""" Save dataset to the database using the Django’s ORM create method. """


def create_db():
    data = csv.DictReader(open("./IMDBmovies.csv"))
    for row in data:
        duration = 0 if row['duration'] == '' else int(row['duration'])
        votes = 0 if row['votes'] == '' else float(row['votes'])
        reviews_from_users = 0 if row['reviews_from_users'] == '' else float(row['reviews_from_users'])
        reviews_from_critics = 0 if row['reviews_from_critics'] == '' else float(row['reviews_from_critics'])

        Movie.objects.create(
            title=row['title'],
            year=int(row['year']),
            date_published=row['date_published'],
            genre=row['genre'],
            duration=duration,
            country=row['country'],
            language=row['language'],
            director=row['director'],
            writer=row['writer'],
            production_company=row['production_company'],
            votes=votes,
            reviews_from_users=reviews_from_users,
            reviews_from_critics=reviews_from_critics,
            )
