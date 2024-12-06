from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.text import slugify
from django.conf import settings

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    avatar = models.ImageField(upload_to="profiles/%Y/%m/%d/", default='profiles/avatar.png')
    bio = models.TextField(default='', blank=True)

    REQUIRED_FIELDS = ('username', )
    USERNAME_FIELD = 'email'
    def __str__(self):
        return self.email
    
class Post(models.Model):
    CATEGORY_CHOICES = (
        ("Frontend", "Frontend"),
        ("Backend", "Backend"),
        ("Fullstack", "Fullstack"),
    )

    title = models.CharField(max_length=120)
    post_image = models.ImageField(upload_to="posts/%Y/%m/%d/", default='posts/post.png')
    content = models.TextField(default='', blank=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, blank=True, null=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='posts', blank=True, null=True)
    slug = models.SlugField(unique=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def save(self, **kwargs):
        slug = slugify(self.title)

        self.slug = slug

        super().save(**kwargs)

    class Meta:
        ordering = ('-updated', '-created')


    def __str__(self):
        return f'{self.slug}'
    
        
