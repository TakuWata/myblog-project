from django.db import models
from django.utils import timezone
from users.models import MyUser
# from tinymce.models import HTMLField
# from froala_editor.fields import FroalaField

class Category(models.Model):
    title = models.CharField(max_length=100, primary_key=True)

class Post(models.Model):
    title = models.CharField(max_length=150)
    author = models.ForeignKey(MyUser, on_delete=models.SET_NULL, null=True)
    body = models.TextField (blank=True, null=True)
    is_draft = models.BooleanField (default=False)
    created_at = models.DateTimeField (auto_now_add=True)
    published_at = models.DateTimeField (auto_now=True)
    modified_at = models.DateTimeField(auto_now=True)
    related = models.ManyToManyField("self", blank=True)
    category = models.ManyToManyField(Category, blank=True)
    image = models.ImageField(upload_to='images/', blank=True, null=True)


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    author = models.CharField(max_length=100)
    text = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    is_approved = models.BooleanField(default=False)

    

