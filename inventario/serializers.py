from rest_framework import serializers
from .models import Proveedor, MateriaPrima, ProductoTerminado

class ProductoTerminadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductoTerminado
        fields = ['id', 'nombre', 'descripcion', 'stock', 'precio_venta']