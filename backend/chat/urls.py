from django.conf.urls import url
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token 
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt import views as jwt_views
from . import views

router = DefaultRouter()
router.register('profile', views.ProfileViewSet)

urlpatterns = [
    #  path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    url(r'', include(router.urls)),
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'), #Access token
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'), #Refresh token 
    path('users/', views.UserList.as_view()), # create user with username + password
]
