from django.shortcuts import render, get_object_or_404
from .models import Post, User, Comment
from .serializers import PostSerializer, UserRegisterSerialzier, CommentSerializer
from rest_framework import generics, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.http import JsonResponse
from django.db.models import F
from rest_framework.parsers import MultiPartParser, FormParser

# Create your views here.


class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.all().order_by('-id')
    parser_class = [MultiPartParser, FormParser]
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


# # USER INTERACTION VIEWS
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def increase_likes(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    user = request.user
    if user in post.likes.all():
        post.likes.remove(user)
        post.save()
        
        return JsonResponse({})
    if user in post.dislikes.all():
        post.dislikes.remove(user)
        post.likes.add(user)
        post.save()

        return JsonResponse({})
    post.likes.add(user)
    post.save()

    return JsonResponse({})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def decrease_likes(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    user = request.user
    if user in post.dislikes.all():
        post.dislikes.remove(user)
        post.save()

        return JsonResponse({})
    if user in post.likes.all():
        post.likes.remove(user)
        post.dislikes.add(user)
        post.save()

        return JsonResponse({})

    post.dislikes.add(user)
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
        'likes_count': likes_count
    })


class CommentList(generics.ListCreateAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        post_id = self.kwargs['post_id']
        queryset = Comment.objects.filter(post_id=post_id).order_by('-id')
        # BUG need to send the queryset count later on.
        # count = queryset.count()
        # data = {'count': count, 'queryset': list(queryset.values())}
        return queryset

    def perform_create(self, serializer):
        post_id = self.kwargs['post_id']
        serializer.save(creator=self.request.user, post_id=post_id)


class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


# FOLLOW/UNFOLLOW
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def follow(request, username):
    user = User.objects.get(username=username)
    if request.user != user and not request.user.following.filter(pk=user.pk).exists():
        request.user.following.add(user)
    return JsonResponse({})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def unfollow(request, username):
    user = User.objects.get(username=username)
    if request.user != user and request.user.following.filter(pk=user.pk).exists():
        request.user.following.remove(user)
    return JsonResponse({})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def f_data(request, username):
    user = get_object_or_404(User, username=username)
    is_following = request.user.following.filter(pk=user.pk).exists()
    followers_count = user.followers.count()
    following_count = user.following.count()
    context = {
        'is_following': is_following,
        'followers_count': followers_count,
        'following_count': following_count,
    }

    return JsonResponse(context)
