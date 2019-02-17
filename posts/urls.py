from rest_framework import routers
from .views import PostViewSet, CommentViewSet, CategoryViewSet, MyUserViewSet

router = routers.DefaultRouter()
# /api/posts/でPostViewSetを使う
router.register('posts', PostViewSet, base_name="posts")
router.register('comments', CommentViewSet, base_name="comments")
router.register('categories', CategoryViewSet, base_name="categories")
router.register('users', MyUserViewSet, base_name="users")