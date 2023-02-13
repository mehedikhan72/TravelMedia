from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'creator', 'post', 'place', 'trip_date',
            'trip_duration', 'people_count', 'cost_per_person',
            'transportation_data', 'staying_place', 'staying_place_cost',
            'staying_place_rating', 'trip_rating', 'important_things_to_take',
            'cautions',
        ]
