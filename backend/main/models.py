from django.contrib.auth.models import AbstractBaseUser
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

class CustomUser(AbstractBaseUser):
    username = models.CharField(max_length=30)
    email = models.EmailField(_('email address'), unique=True)
    date_joined = models.DateTimeField(default=timezone.now)
    is_staff = models.BooleanField(default=False)

    REQUIRED_FIELDS = ['username', 'email', 'password']

    def __str__(self):
        return self.email
