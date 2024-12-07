from rest_framework import serializers
from rest_framework.response import Response

from .models import (
    CustomUser,
    Post,
)

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'username', 'password')
        extra_kwargs = {
            'password': { "write_only": True }
        }

    def create(self, validated_data):
        user = CustomUser(
            email=validated_data['email'],
            username=validated_data['username'],
        )
        user.set_password(validated_data['password'])
        user.save()

        return user

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'avatar', 'bio')
 
class PostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(required=False)
    class Meta:
        model = Post
        fields = "__all__"

    def create(self, validated_data):
        print(validated_data)
        return super().create(validated_data)
    

class ProfileSerializer(serializers.ModelSerializer):
    profile_posts = serializers.SerializerMethodField()
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'avatar', 'bio', 'profile_posts')

    def get_profile_posts(self, user):
        posts = user.posts.all()
        serializers = PostSerializer(posts, many=True)
        for i in serializers.data:
            del i['author']
        return serializers.data