from django.shortcuts import render, get_object_or_404
from .models import Post, User
from .serializers import PostSerializer, UserRegisterSerialzier
from rest_framework import generics, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from django.db.models import F

# Create your views here.


class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.all().order_by('-id')
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            serializer.save(creator=self.request.user)
        else:
            raise ValueError("User must be authenticated to create a post.")


class UserPostList(generics.ListCreateAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        username = self.kwargs['username']
        user = get_object_or_404(User, username=username)
        queryset = Post.objects.filter(creator=user).order_by('-id')
        return queryset


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def register_user(request):
    serializer = UserRegisterSerialzier(data=request.data)
    if serializer.is_valid():
        username = serializer.validated_data['username']
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        User.objects.create_user(
            username=username, email=email, password=password)
        return Response(serializer.validated_data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def increase_likes(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    user = request.user
    if user in post.likes.all():
        post.likes.remove(user)
        post.likes_count -= 1
        post.save()
        return JsonResponse({})
    if user in post.dislikes.all():
        post.dislikes.remove(user)
        post.likes.add(user)
        post.likes_count += 2
        post.save()
        return JsonResponse({})
    post.likes.add(user)
    post.likes_count += 1
    post.save()

    return JsonResponse({})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def decrease_likes(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    user = request.user
    if user in post.dislikes.all():
        post.dislikes.remove(user)
        post.likes_count += 1
        post.save()
        return JsonResponse({})
    if user in post.likes.all():
        post.likes.remove(user)
        post.dislikes.add(user)
        post.likes_count -= 2
        post.save()
        return JsonResponse({})

    post.dislikes.add(user)
    post.likes_count -= 1
    post.save()
    return JsonResponse({})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_like_status(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    likes_count = post.likes.all().count() - (post.dislikes.all().count())
    user = request.user
    if user in post.likes.all():
        status = 'liked'
    elif user in post.dislikes.all():
        status = 'disliked'
    else:
        status = 'not-interacted'
    return JsonResponse({
        'status': status,
        'likes_count' : likes_count
        })
