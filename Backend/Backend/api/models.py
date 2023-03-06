from django.db import models
import datetime
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    pass

class Post(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    post = models.TextField(default="")
    place = models.CharField(max_length=256, default="")
    trip_date = models.DateField(default=datetime.date.today)
    trip_duration = models.PositiveIntegerField(default=0)
    people_count = models.PositiveIntegerField(default=0)
    cost_per_person = models.PositiveIntegerField(default=0)
    transportation_data = models.TextField(default="")
    staying_place = models.CharField(default="", max_length=256)
    staying_place_cost = models.PositiveIntegerField(default=0)
    staying_place_rating = models.PositiveIntegerField(default=0)
    trip_rating = models.PositiveIntegerField(default=0)
    important_things_to_take = models.TextField(default="")
    cautions = models.TextField(default="")

    # Interactions
    likes_count = models.IntegerField()
    likes = models.ManyToManyField(User, blank=True, related_name="likes")
    dislikes = models.ManyToManyField(User, blank=True, related_name="dislikes")

