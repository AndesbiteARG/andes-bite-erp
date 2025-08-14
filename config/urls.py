from django.contrib import admin
from django.urls import path, include # <-- ASEGÚRATE DE AÑADIR ", include"

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('inventario.urls')), # <-- AÑADE ESTA LÍNEA
]
