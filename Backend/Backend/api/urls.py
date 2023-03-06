from django.urls import path
from api import views
from .views import MyTokenObtainPairView
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('posts/', views.PostList.as_view()),
    path('posts/<int:pk>', views.PostDetail.as_view()),
    path('user/register', views.register_user, name="register"),
    path('users/<str:username>/posts/',
         views.UserPostList.as_view(), name='user_posts'),

    # Interactions
    path('post/<int:post_id>/like', views.increase_likes, name="increase_likes"),
    path('post/<int:post_id>/unlike', views.decrease_likes, name="decrease_likes"),
    path('post/<int:post_id>/like_status',
         views.check_like_status, name="check_like_status"),
    
    path('post/<int:post_id>/comments/', views.CommentList.as_view(), name="comment"),
    path('post/<int:post_id>/comments/<int:pk>',
         views.CommentDetail.as_view(), name="comment_detail"),
    # JWT endpoints
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
