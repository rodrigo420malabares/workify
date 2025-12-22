import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Image, Spinner } from 'react-bootstrap';
// 👇 Importamos el helper para traer las categorías reales (con sus IDs)
import { getCategorias } from '../../helpers/categoryApi';

const ProductoForm = ({ productoInicial, onGuardar, onCancelar }) => {
  const [producto, setProducto] = useState({
    nombre: '',
    precio: '',
    categoria: '',
    stock: '',
    descripcion: '',
    tallesTexto: '',
    imagenes: [],
    ...productoInicial,
  });

  const [listaCategorias, setListaCategorias] = useState([]); // 👈 Para guardar las categorías de la BD
  const [cargando, setCargando] = useState(false);
  const [urlTemporal, setUrlTemporal] = useState('');

  // 1. Cargar Categorías al iniciar el componente
  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {
    try {
      const respuesta = await getCategorias(0,50);
      // Ajustamos si la respuesta viene como {categorias: [...]} o array directo
      const categoriasBackend = respuesta.categorias || respuesta || [];
      setListaCategorias(categoriasBackend);
    } catch (error) {
      console.error("Error cargando categorías:", error);
      alert("No se pudieron cargar las categorías. Revisa tu conexión.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto(prev => ({ ...prev, [name]: value }));
  };

  const handleGuardar = (e) => {
    e.preventDefault(); // 👈 Evita recargas inesperadas del form

    // Validaciones
    if (!producto.nombre || !producto.precio || !producto.categoria) {
      alert('Campos obligatorios: nombre, precio, categoría');
      return;
    }
    if (isNaN(Number(producto.precio)) || Number(producto.precio) <= 0) {
      alert('El precio debe ser un número válido mayor a 0.');
      return;
    }
    // Validación opcional: Asegura que haya al menos una imagen si tu backend lo exige
    if (!producto.imagenes || producto.imagenes.length === 0) {
       alert('Debes subir al menos una imagen antes de guardar.');
       return;
    }

    const talles = producto.tallesTexto
      ? producto.tallesTexto.split(',').map(t => t.trim()).filter(Boolean)
      : producto.talles || [];

    const nuevoProducto = {
      ...producto,
      precio: Number(producto.precio), // Aseguramos que sea número
      stock: Number(producto.stock),   // Aseguramos que sea número
      talles,
      fechaCreacion: producto.fechaCreacion || new Date().toISOString()
    };

    console.log("📤 Enviando producto:", nuevoProducto); // Para ver en consola
    onGuardar(nuevoProducto);
    
    // Opcional: Limpiar si es creación (si onGuardar es exitoso)
    // Pero mejor dejar que el padre maneje el cierre del modal/form
  };

  // ... (Funciones de subirImagen, agregarUrlManual, eliminarImagen IGUALES) ...
  const subirImagen = async (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;
    const tiposPermitidos = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!tiposPermitidos.includes(archivo.type)) {
      alert('Solo se permiten imágenes JPG, PNG o WEBP');
      return;
    }
    setCargando(true);
    const formData = new FormData();
    formData.append('file', archivo);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_PRESET);

    try {
      const res = await fetch(import.meta.env.VITE_CLOUDINARY_URL, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        setProducto(prev => ({
          ...prev,
          imagenes: [...(prev.imagenes || []), data.secure_url],
        }));
      } else {
        alert('Error al subir imagen');
      }
    } catch (err) {
      console.error(err);
      alert('Error de red al subir imagen');
    } finally {
      setCargando(false);
    }
  };

  const agregarUrlManual = () => {
    const url = urlTemporal.trim();
    if (!url) return;
    setProducto(prev => ({
      ...prev,
      imagenes: [...(prev.imagenes || []), url],
    }));
    setUrlTemporal('');
  };

  const eliminarImagen = (index) => {
    setProducto(prev => ({
      ...prev,
      imagenes: (prev.imagenes || []).filter((_, i) => i !== index),
    }));
  };

  return (
    <Form onSubmit={handleGuardar}>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              name="nombre"
              value={producto.nombre}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              name="precio"
              type="number"
              value={producto.precio}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Select
              name="categoria"
              value={producto.categoria}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar categoría</option>
              {/* 👇 AQUÍ ESTÁ LA MAGIA: Mapeamos IDs reales */}
              {listaCategorias.map((cat) => (
                <option key={cat._id || cat.uid} value={cat._id || cat.uid}>
                  {cat.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              name="stock"
              type="number"
              value={producto.stock}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="descripcion"
              value={producto.descripcion}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Talles (separados por coma)</Form.Label>
            <Form.Control
              name="tallesTexto"
              value={producto.tallesTexto}
              onChange={handleChange}
              placeholder="S, M, L, XL"
            />
          </Form.Group>

          {/* Carga de Imágenes */}
          <Form.Group className="mb-3">
            <Form.Label>Imágenes</Form.Label>
            <Form.Control type="file" onChange={subirImagen} className="mb-2" />
            
            <div className="d-flex gap-2 mb-2">
              <Form.Control
                type="text"
                value={urlTemporal}
                onChange={(e) => setUrlTemporal(e.target.value)}
                placeholder="Pegar URL de imagen..."
              />
              <Button variant="secondary" onClick={agregarUrlManual} type="button">
                Agregar
              </Button>
            </div>
            
            {cargando && <div className="text-primary">Subiendo imagen... <Spinner size="sm" animation="border"/></div>}

            <div className="d-flex flex-wrap gap-2 mt-2">
              {producto.imagenes?.map((img, i) => (
                <div key={i} className="position-relative border p-1 rounded">
                  <Image src={img} style={{width: '60px', height: '60px', objectFit: 'cover'}} />
                  <Button
                    variant="danger"
                    size="sm"
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                    onClick={() => eliminarImagen(i)}
                  >
                    X
                  </Button>
                </div>
              ))}
            </div>
          </Form.Group>
        </Col>
      </Row>

      <div className="mt-4 d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={onCancelar} type="button">
          Cancelar
        </Button>
        <Button variant="primary" type="submit" disabled={cargando}>
          {cargando ? 'Espere...' : 'Guardar Producto'}
        </Button>
      </div>
    </Form>
  );
};

export default ProductoForm; 