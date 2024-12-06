from django.urls import path

from .views import (
    register_view,
    posts_list_view,
    single_post_view,
    create_post_view,
    update_post_view,
    delete_post_view,
    profile_view,
    update_profile_view,
    get_username_view,
)

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # Start Auth
    path('auth/', TokenObtainPairView.as_view(), name="Auth"),
    path('auth/refresh/', TokenRefreshView.as_view(), name="Auth_refresh"),
    path('register/', register_view, name="Register"),
    # End Auth

    # Start Posts
    path('posts/', posts_list_view, name="Posts"),
    path('posts/<str:slug>/', single_post_view, name="Posts-detail"),
    path('create-post/', create_post_view, name="Posts-create"),
    path('update-post/<str:slug>/', update_post_view, name="Posts-update"),
    path('delete-post/<str:slug>/', delete_post_view, name="Posts-delete"),
    # End Posts

    # Start Profile
    path('user/profile/<str:username>/', profile_view, name="User-profile"),
    path('user/update/<str:username>/', update_profile_view, name="User-profile-update"),
    path('user/get-username/', get_username_view, name="User-username"),
    # End Profile
]
