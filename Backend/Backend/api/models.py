from django.db import models
import datetime
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    followers = models.ManyToManyField(
        'self', blank=True, related_name="following", symmetrical=False)
    gender = models.CharField(default="Male", max_length=28)
    location = models.CharField(max_length=256, blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    bio = models.CharField(max_length=256, blank=True)

    # Other data like number of trip reviewed, exp level n others will be implemented later.

    # follower_count = models.PositiveIntegerField(default=0)
    # following_count = models.PositiveIntegerField(default=0)


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
    important_things_to_take = models.TextField(default="", blank=True)
    cautions = models.TextField(default="", blank=True)

    # Interactions
    likes = models.ManyToManyField(
        User, blank=True, related_name="users_who_like")
    dislikes = models.ManyToManyField(
        User, blank=True, related_name="users_who_dislike")


class PostImages(models.Model):
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(
        upload_to="img", default="", null=True, blank=True)


class Comment(models.Model):
    comment_text = models.TextField()
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    created_time = models.DateTimeField(auto_now_add=True)
    post = models.ForeignKey(
        'Post', on_delete=models.CASCADE, related_name='comments')

    def __str__(self):
        return f"{self.comment_text} by {self.creator} on {self.post}"
