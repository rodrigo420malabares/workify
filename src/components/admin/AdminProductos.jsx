import { useState, useEffect } from 'react';
import { Container, Button, Modal, Spinner, Alert } from 'react-bootstrap';
import FiltroProductos from './FiltroProductos';
import ListaProductos from './ListaProductos';
import ProductoForm from './ProductoForm';

// Importamos la API
import { 
  getProductos, 
  crearProducto, 
  actualizarProducto, 
  borrarProducto 
} from '../../helpers/productApi';

const AdminProductos = () => {
  const [productos, setProductos] = useState([]);
  const [filtros, setFiltros] = useState({ nombre: '', categoria: '', talle: '' });
  
  // Estados para el Modal y la Edición
  const [showModal, setShowModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    setLoading(true);
    try {
      const resp = await getProductos();
      setProductos(resp.productos || resp || []);
    } catch (error) {
      console.error("Error:", error);
      setMensaje({ tipo: 'danger', texto: 'Error al cargar productos' });
    } finally {
      setLoading(false);
    }
  };

  const handleCerrarModal = () => {
    setShowModal(false);
    setModoEdicion(false);
    setProductoEditando(null);
    setMensaje(null);
  };

  const handleMostrarModal = () => {
    setModoEdicion(false);
    setProductoEditando(null);
    setShowModal(true);
  };

  const guardarProducto = async (productoDelFormulario) => {
    setLoading(true);
    setMensaje(null);

    try {
      // 1. Adaptar imagen (Array -> String 'img')
      const imagenPrincipal = (productoDelFormulario.imagenes && productoDelFormulario.imagenes.length > 0)
        ? productoDelFormulario.imagenes[0] 
        : '';

      const productoParaBackend = {
        ...productoDelFormulario,
        img: imagenPrincipal,
      };

      // Limpieza
      delete productoParaBackend.imagenes; 
      delete productoParaBackend.imagen; 

      if (modoEdicion && productoEditando) {
        const id = productoEditando._id || productoEditando.uid || productoEditando.id;
        await actualizarProducto(id, productoParaBackend);
        alert('¡Producto actualizado con éxito!'); // Alerta simple y efectiva
      } else {
        await crearProducto(productoParaBackend);
        alert('¡Producto creado con éxito!');
      }

      handleCerrarModal(); // Cerramos la ventana al terminar
      cargarProductos();   // Recargamos la lista

    } catch (error) {
      console.error(error);
      alert('Hubo un error al guardar');
    } finally {
      setLoading(false);
    }
  };

  const eliminarProducto = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este producto?")) return;
    try {
      await borrarProducto(id);
      cargarProductos();
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar");
    }
  };

  const editarProducto = (producto) => {
    // Convertir 'img' a 'imagenes' para el formulario
    const productoParaForm = {
      ...producto,
      imagenes: producto.img ? [producto.img] : []
    };
    
    setModoEdicion(true);
    setProductoEditando(productoParaForm);
    setShowModal(true); // Abrimos la ventana
  };

  // Filtros
  const productosFiltrados = Array.isArray(productos) ? productos.filter(p => {
    if (!p.nombre) return false;
    const nombre = p.nombre.toLowerCase();
    let categoriaTexto = '';
    if (p.categoria && typeof p.categoria === 'object') {
       categoriaTexto = p.categoria.nombre || '';
    } else {
       categoriaTexto = String(p.categoria || '');
    }
    const coincideNombre = filtros.nombre === '' || nombre.includes(filtros.nombre.toLowerCase());
    const coincideCategoria = filtros.categoria === '' || categoriaTexto.toLowerCase() === filtros.categoria.toLowerCase();
    
    return coincideNombre && coincideCategoria;
  }) : [];

  return (
    <Container className="my-4">
      
      {/* 1. ENCABEZADO Y BOTÓN NUEVO */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">Gestión de Productos</h3>
        <Button variant="primary" onClick={handleMostrarModal}>
          <i className="bi bi-plus-lg me-2"></i>Nuevo Producto
        </Button>
      </div>

      {mensaje && <Alert variant={mensaje.tipo} onClose={() => setMensaje(null)} dismissible>{mensaje.texto}</Alert>}

      {/* 2. FILTROS */}
      <div className="p-3 bg-light rounded border mb-3">
        <FiltroProductos filtros={filtros} setFiltros={setFiltros} />
      </div>

      {/* 3. LISTA (TABLA) */}
      {loading && !showModal ? (
        <div className="text-center my-5"><Spinner animation="border" variant="primary" /></div>
      ) : (
        <ListaProductos
          productos={productosFiltrados}
          onEditar={editarProducto}
          onEliminar={(id) => eliminarProducto(id)} 
        />
      )}

      {/* 4. VENTANA MODAL (Aquí vive el formulario oculto) */}
      <Modal show={showModal} onHide={handleCerrarModal} size="lg" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{modoEdicion ? 'Editar Producto' : 'Nuevo Producto'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
             <div className="text-center py-4"><Spinner animation="border" /> Guardando...</div>
          ) : (
            <ProductoForm
              productoInicial={modoEdicion ? productoEditando : {}}
              onGuardar={guardarProducto}
              onCancelar={handleCerrarModal}
            />
          )}
        </Modal.Body>
      </Modal>

    </Container>
  );
};

export default AdminProductos;