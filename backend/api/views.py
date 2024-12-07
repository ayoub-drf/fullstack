from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_204_NO_CONTENT,
)
from rest_framework.exceptions import (
    NotFound,
    PermissionDenied,
)

from django.contrib.auth import get_user_model

from .serializers import (
    UserRegisterSerializer,
    PostSerializer,
    ProfileSerializer,
)
from .models import (
    Post,
)
from .paginator import (
    BlogPaginator,
)

User = get_user_model()

@api_view(['POST', ])
def register_view(request):
    data = request.data
    serializer = UserRegisterSerializer(data=data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()

    return Response({ "id": user.id, 'username': user.username }, HTTP_201_CREATED)


@api_view(['GET', ])
@permission_classes([])
def posts_list_view(request):
    posts = Post.objects.all()
    paginator = BlogPaginator()
    paginated_posts = paginator.paginate_queryset(posts, request)
    serializer = PostSerializer(paginated_posts, many=True)
    
    return Response(serializer.data, HTTP_200_OK)


@api_view(['GET', ])
@permission_classes([])
def single_post_view(request, slug=None):
    if slug:
        try:
            post = Post.objects.get(slug=slug)
        except Post.DoesNotExist:
            raise NotFound(f'post with this slug ({slug}) does not exists')
        
        serializer = PostSerializer(post)
        return Response(serializer.data, HTTP_200_OK)
    
    return Response({}, HTTP_400_BAD_REQUEST)
        

@api_view(['POST', ])
@permission_classes([IsAuthenticated, ])
def create_post_view(request):
    data = request.data
    serializer = PostSerializer(data=data)
    serializer.is_valid(raise_exception=True)
    serializer.save(author=request.user)

    return Response(serializer.data, HTTP_201_CREATED)

@api_view(['PUT', ])
@permission_classes([IsAuthenticated,])
def update_post_view(request, slug=None):
    if slug:
        try:
            post = Post.objects.get(slug=slug)
        except Post.DoesNotExist:
            raise NotFound(f'post with this slug ({slug}) does not exists')
        
        if post.author != request.user:
            raise PermissionDenied('Permission Denied')
        
        serializer = PostSerializer(post, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, HTTP_200_OK)
    
    return Response({}, HTTP_400_BAD_REQUEST)

@api_view(['DELETE', ])
@permission_classes([IsAuthenticated,])
def delete_post_view(request, slug=None):
    if slug:
        try:
            post = Post.objects.get(slug=slug)
        except Post.DoesNotExist:
            raise NotFound(f'post with this slug ({slug}) does not exists')
        
        if post.author != request.user:
            raise PermissionDenied('Permission Denied')
        
        post.delete()

        return Response({}, HTTP_204_NO_CONTENT)
    
    return Response({}, HTTP_400_BAD_REQUEST)


@api_view(['GET', ])
@permission_classes([])
def profile_view(request, username=None):
    if username:
        try:
            profile = User.objects.get(username=username)
        except User.DoesNotExist:
            raise NotFound(f'user with this username ({username}) does not exists')
        
        serializer = ProfileSerializer(profile)

        return Response(serializer.data, HTTP_200_OK)
        
    return Response({}, HTTP_400_BAD_REQUEST)


@api_view(['PUT', ])
@permission_classes([IsAuthenticated, ])
def update_profile_view(request, username=None):
    if username:
        try:
            profile = User.objects.get(username=username)
        except User.DoesNotExist:
            raise NotFound(f'user with this username ({username}) does not exists')
        
        if profile != request.user:
            raise PermissionDenied('Permission Denied')

        
        serializer = ProfileSerializer(profile, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, HTTP_200_OK)
        
    return Response({}, HTTP_400_BAD_REQUEST)

@api_view(['GET', ])
@permission_classes([IsAuthenticated, ])
def get_username_view(request):
    username = request.user.username
    id = request.user.id

    return Response({"username": username, "id": id}, HTTP_200_OK)