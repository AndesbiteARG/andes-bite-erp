from django.db import models

# Modelo para registrar a nuestros proveedores
class Proveedor(models.Model):
    nombre = models.CharField(max_length=100, unique=True, help_text="Nombre de la empresa proveedora")
    contacto = models.CharField(max_length=100, blank=True, help_text="Nombre de la persona de contacto")
    telefono = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)

    def __str__(self):
        return self.nombre

# Modelo para las materias primas que compramos
class MateriaPrima(models.Model):
    UNIDADES = [
        ('kg', 'Kilogramos'),
        ('g', 'Gramos'),
        ('l', 'Litros'),
        ('ml', 'Mililitros'),
        ('un', 'Unidades'),
    ]
    
    nombre = models.CharField(max_length=100, unique=True, help_text="Ej: Maní Tostado, Frasco de Vidrio 500g")
    descripcion = models.TextField(blank=True)
    stock = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    unidad_medida = models.CharField(max_length=2, choices=UNIDADES)
    proveedor = models.ForeignKey(Proveedor, on_delete=models.SET_NULL, null=True, blank=True)
    
    def __str__(self):
        return f"{self.nombre} ({self.stock} {self.unidad_medida})"

# Modelo para los productos que fabricamos y vendemos
class ProductoTerminado(models.Model):
    nombre = models.CharField(max_length=100, unique=True, help_text="Ej: Pasta de Maní Clásica 500g")
    descripcion = models.TextField(blank=True)
    stock = models.PositiveIntegerField(default=0)
    precio_venta = models.DecimalField(max_digits=10, decimal_places=2, help_text="Precio al que se vende al cliente")

    def __str__(self):
        return f"{self.nombre} ({self.stock} unidades)"
    