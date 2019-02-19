from django.views.generic import View
from django.shortcuts import render

from .serializer import PostSerializer, CommentSerializer, CategorySerializer, MyUserSerializer
from .models import Post, Comment, Category
from users.models import MyUser

from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters, generics
from rest_framework.pagination import LimitOffsetPagination
from django.db.models.functions import TruncMonth

class FrontendRenderView(View):
    def get(self, request, *args, **kwargs):
        return render(request, "front/build/index.html", {})

# def home (request):
#     return render (request, 'posts/home.html')

class PostViewSet(viewsets.ModelViewSet):
    """
    PostのMain API。
    """

    serializer_class = PostSerializer
    filter_backends = (DjangoFilterBackend, OrderingFilter, filters.SearchFilter)
    ordering_fields = '__all__'
    ordering = ('created_at')
    search_fields = ('title', 'body', 'created_at')
    pagination_class = LimitOffsetPagination

    def get_queryset(self):
        queryset = Post.objects.all()
        category = self.request.query_params.get('category', None)
        if category is not None:
            queryset = queryset.filter(category=category)
        return queryset

class CommentViewSet(viewsets.ModelViewSet):
    """
    CommentのMain API。
    """

    serializer_class = CommentSerializer
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    ordering_fields = '__all__'
    ordering = ('created_at')

    def get_queryset(self):
        queryset = Comment.objects.all()
        return queryset

class CategoryViewSet(viewsets.ModelViewSet):
    """
    CategoryのMain API。
    """

    serializer_class = CategorySerializer

    def get_queryset(self):
        queryset = Category.objects.all()
        return queryset

class MyUserViewSet(viewsets.ModelViewSet):
    """
    CategoryのMain API。
    """

    serializer_class = MyUserSerializer

    def get_queryset(self):
        queryset = MyUser.objects.all()
        return queryset

