from django.urls import path
# Importamos la nueva vista
from .views import ProductoTerminadoListCreate, ProductoTerminadoDetail

urlpatterns = [
    # Ruta para la lista de productos
    path('productos/', ProductoTerminadoListCreate.as_view(), name='lista-productos'),
    # --- AÑADE ESTA NUEVA RUTA ---
    # Ruta para un producto individual. <int:pk> captura el ID.
    path('productos/<int:pk>/', ProductoTerminadoDetail.as_view(), name='detalle-producto'),
]