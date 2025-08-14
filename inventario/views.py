from rest_framework import generics
from .models import ProductoTerminado
from .serializers import ProductoTerminadoSerializer

# Esta vista es para la LISTA de productos (ver todos y crear uno nuevo)
class ProductoTerminadoListCreate(generics.ListCreateAPIView):
    queryset = ProductoTerminado.objects.all()
    serializer_class = ProductoTerminadoSerializer

# --- AÑADE ESTA NUEVA VISTA ---
# Esta vista es para UN SOLO producto (ver, actualizar o borrar)
class ProductoTerminadoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProductoTerminado.objects.all()
    serializer_class = ProductoTerminadoSerializer