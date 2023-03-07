from rest_framework import serializers
from .models import Post, User, Comment


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class UserRegisterSerialzier(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()

        return user


class PostSerializer(serializers.ModelSerializer):
    creator = UserSerializer(read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'creator', 'post', 'place', 'trip_date',
                  'trip_duration', 'people_count', 'cost_per_person',
                  'transportation_data', 'staying_place', 'staying_place_cost',
                  'staying_place_rating', 'trip_rating', 'important_things_to_take',
                  'cautions', 'likes', 'dislikes'
                  ]


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'comment_text', 'creator', 'created_time', 'post')
        read_only_fields = ('creator', 'created_time', 'post')

    def create(self, validated_data):
        post_id = self.context['view'].kwargs['post_id']
        validated_data['creator'] = self.context['request'].user
        validated_data['post'] = Post.objects.get(pk=post_id)
        return super().create(validated_data)
