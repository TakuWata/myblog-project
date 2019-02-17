from .models import Post, Comment, Category
from users.models import MyUser
from rest_framework import serializers

class PostSerializer(serializers.ModelSerializer):
    #created_at = serializers.DateTimeField(format="%Y/%m/%d")
    #published_at = serializers.DateTimeField(format="%Y/%m/%d")
    #modified_at = serializers.DateTimeField(format="%Y/%m/%d")
    class Meta:
        model = Post
        fields = ('__all__')

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('__all__')

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('__all__')

class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ('__all__')