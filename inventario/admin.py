from django.contrib import admin
from .models import Proveedor, MateriaPrima, ProductoTerminado

# Le decimos a Django: "Muestra estos modelos en el panel de admin"
admin.site.register(Proveedor)
admin.site.register(MateriaPrima)
admin.site.register(ProductoTerminado)