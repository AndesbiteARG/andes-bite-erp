import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Importamos todos los componentes que usaremos de Material-UI
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography,
  TextField, Button, Accordion, AccordionSummary, AccordionDetails, IconButton, Modal, Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// Estilo para el Modal (la ventana emergente)
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#2b2b2b',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: 'white'
};

function App() {
  const [productos, setProductos] = useState([]);
  const [newProduct, setNewProduct] = useState({
    nombre: '',
    descripcion: '',
    stock: 0,
    precio_venta: 0.0,
  });

  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- FUNCIONES ---

  const fetchProducts = () => {
    axios.get('http://127.0.0.1:8000/api/productos/')
      .then(response => {
        setProductos(response.data);
      })
      .catch(error => {
        console.error('¡Hubo un error al obtener los productos!', error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/productos/', newProduct)
      .then(() => {
        fetchProducts();
        setNewProduct({ nombre: '', descripcion: '', stock: 0, precio_venta: 0.0 });
      })
      .catch(error => {
        console.error('¡Hubo un error al crear el producto!', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/productos/${id}/`)
      .then(() => {
        fetchProducts();
      })
      .catch(error => {
        console.error('¡Hubo un error al borrar el producto!', error);
      });
  };

  const handleOpenModal = (producto) => {
    setEditingProduct(producto);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    axios.put(`http://127.0.0.1:8000/api/productos/${editingProduct.id}/`, editingProduct)
      .then(() => {
        fetchProducts();
        handleCloseModal();
      })
      .catch(error => {
        console.error('¡Hubo un error al actualizar el producto!', error);
      });
  };

  // --- RENDERIZADO (JSX) ---
  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h4" component="h1" gutterBottom>
          Andes Bite - Inventario de Productos
        </Typography>

        <Accordion style={{ maxWidth: 800, margin: '20px auto', backgroundColor: '#333', color: 'white' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}>
            <Typography>Agregar Nuevo Producto</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <TextField label="Nombre del Producto" name="nombre" value={newProduct.nombre} onChange={handleInputChange} variant="outlined" InputLabelProps={{ style: { color: '#ccc' } }} sx={{ input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#ccc' } } }}/>
              <TextField label="Descripción" name="descripcion" value={newProduct.descripcion} onChange={handleInputChange} variant="outlined" InputLabelProps={{ style: { color: '#ccc' } }} sx={{ input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#ccc' } } }}/>
              <TextField label="Stock" name="stock" type="number" value={newProduct.stock} onChange={handleInputChange} variant="outlined" InputLabelProps={{ style: { color: '#ccc' } }} sx={{ input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#ccc' } } }}/>
              <TextField label="Precio de Venta" name="precio_venta" type="number" inputProps={{step: "0.01"}} value={newProduct.precio_venta} onChange={handleInputChange} variant="outlined" InputLabelProps={{ style: { color: '#ccc' } }} sx={{ input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#ccc' } } }}/>
              <Button type="submit" variant="contained" color="primary">Guardar Producto</Button>
            </form>
          </AccordionDetails>
        </Accordion>

        <TableContainer component={Paper} style={{ maxWidth: 800, margin: '20px auto', backgroundColor: '#333' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Nombre</TableCell>
                <TableCell align="right" style={{ color: 'white', fontWeight: 'bold' }}>Precio</TableCell>
                <TableCell align="right" style={{ color: 'white', fontWeight: 'bold' }}>Stock</TableCell>
                <TableCell align="center" style={{ color: 'white', fontWeight: 'bold' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productos.map((producto) => (
                <TableRow key={producto.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell style={{ color: 'white' }}>{producto.nombre}</TableCell>
                  <TableCell align="right" style={{ color: 'white' }}>${producto.precio_venta}</TableCell>
                  <TableCell align="right" style={{ color: 'white' }}>{producto.stock} uds.</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleOpenModal(producto)} style={{ color: '#64b5f6' }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(producto.id)} style={{ color: '#ff7961' }}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal open={isModalOpen} onClose={handleCloseModal}>
          <Box sx={modalStyle}>
            <Typography variant="h6" component="h2">Editar Producto</Typography>
            {editingProduct && (
              <form onSubmit={handleUpdateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
                <TextField label="Nombre del Producto" name="nombre" value={editingProduct.nombre} onChange={handleEditInputChange} variant="outlined" InputLabelProps={{ style: { color: '#ccc' } }} sx={{ input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#ccc' } } }} />
                <TextField label="Stock" name="stock" type="number" value={editingProduct.stock} onChange={handleEditInputChange} variant="outlined" InputLabelProps={{ style: { color: '#ccc' } }} sx={{ input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#ccc' } } }} />
                <TextField label="Precio de Venta" name="precio_venta" type="number" inputProps={{step: "0.01"}} value={editingProduct.precio_venta} onChange={handleEditInputChange} variant="outlined" InputLabelProps={{ style: { color: '#ccc' } }} sx={{ input: { color: 'white' }, '& .MouOutlinedInput-root': { '& fieldset': { borderColor: '#ccc' } } }} />
                <Button type="submit" variant="contained" color="primary">Guardar Cambios</Button>
              </form>
            )}
          </Box>
        </Modal>
      </header>
    </div>
  );
}

export default App;