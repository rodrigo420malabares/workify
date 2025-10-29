import { useState, useEffect } from 'react';
import { Button, Modal, Form, Row, Col, Card, Image, Spinner } from 'react-bootstrap';


const Admin = () => {
  const [productos, setProductos] = useState(() => {
    const guardados = localStorage.getItem('productos-admin');
    return guardados ? JSON.parse(guardados) : [];
  });

  const [productoActual, setProductoActual] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [cargando, setCargando] = useState(false);

  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroTalle, setFiltroTalle] = useState('');
  const [filtroNombre, setFiltroNombre] = useState('');

  useEffect(() => {
    localStorage.setItem('productos-admin', JSON.stringify(productos));
  }, [productos]);

  const abrirModalNuevo = () => {
    setProductoActual({
      id: Date.now().toString(),
      nombre: '',
      precio: '',
      categoria: '',
      stock: '',
      descripcion: '',
      imagenes: [],
      talles: [],
      tallesTexto: '',
    });
    setModoEdicion(false);
    setShowModal(true);
  };

  const abrirModalEditar = (producto) => {
    const talles = Array.isArray(producto.talles)
      ? producto.talles
      : producto.talles?.split(',').map(t => t.trim()).filter(Boolean) || [];

    setProductoActual({
      ...producto,
      talles,
      tallesTexto: talles.join(', '),
    });
    setModoEdicion(true);
    setShowModal(true);
  };

  const formatearDescripcion = (texto) =>
    (texto || '')
      .split('.')
      .map(oracion => oracion.trim())
      .filter(Boolean)
      .join('.\n');

  const guardarProducto = () => {
    const { nombre, precio, categoria, descripcion } = productoActual || {};
    if (!nombre || !precio || !categoria) {
      alert('Por favor completá los campos obligatorios.');
      return;
    }
    if (isNaN(Number(precio)) || Number(precio) <= 0) {
      alert('El precio debe ser un número válido mayor a 0.');
      return;
    }

    const productoFinal = {
      ...productoActual,
      descripcion: formatearDescripcion(descripcion),
    };

    setProductos(prev =>
      modoEdicion
        ? prev.map(p => (p.id === productoFinal.id ? productoFinal : p))
        : [...prev, productoFinal]
    );

    setShowModal(false);
  };

  const eliminarProducto = (id) => {
    if (window.confirm('¿Eliminar este producto?')) {
      setProductos(prev => prev.filter(p => p.id !== id));
    }
  };

  const subirImagen = async (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;

    const tiposPermitidos = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!tiposPermitidos.includes(archivo.type)) {
      alert('Solo se permiten imágenes JPG o PNG');
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
        setProductoActual(prev => ({
          ...prev,
          imagenes: [...(prev?.imagenes || []), data.secure_url],
        }));
      } else {
        alert('Error al subir imagen: ' + (data?.message || 'Respuesta inválida'));
      }
    } catch (error) {
      alert('Error de red al subir imagen');
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  const eliminarImagen = (index) => {
    if (window.confirm('¿Eliminar esta imagen?')) {
      setProductoActual(prev => ({
        ...prev,
        imagenes: (prev?.imagenes || []).filter((_, i) => i !== index),
      }));
    }
  };


  const productosFiltrados = productos.filter(p => {
    const coincideNombre = filtroNombre
      ? p.nombre.toLowerCase().includes(filtroNombre.toLowerCase())
      : true;

    const coincideCategoria = filtroCategoria
      ? p.categoria === filtroCategoria
      : true;

    const coincideTalle = filtroTalle
      ? p.talles?.some(t => t.toLowerCase().includes(filtroTalle.toLowerCase()))
      : true;

    return coincideNombre && coincideCategoria && coincideTalle;
  });





  return (
    <div className="container py-3">
      <h2>Administrador de productos</h2>
      <Button onClick={abrirModalNuevo}>Crear nuevo producto</Button>

      <Row className="mb-2 mt-2">
        <Col xs={12} md={2}>
          <Form.Group>
            <Form.Label>Filtrar por categoría</Form.Label>
            <Form.Select
              value={filtroCategoria}
              onChange={e => setFiltroCategoria(e.target.value)}
            >
              <option value="">Todas</option>
              <option value="computadora">Computadora</option>
              <option value="escritorio">Escritorio</option>
              <option value="fichero">Fichero</option>
              <option value="sillas">Sillas</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col xs={12} md={2}>
          <Form.Group>
            <Form.Label>Filtrar por talle</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: 38 o M"
              value={filtroTalle}
              onChange={e => setFiltroTalle(e.target.value.trim())}
            />
          </Form.Group>
        </Col>

        <Col xs={12} md={2}>
          <Form.Group>
            <Form.Label>Buscar por nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: computadora, fichero..."
              value={filtroNombre}
              onChange={e => setFiltroNombre(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>




      <Row className="mt-3">
        {productosFiltrados.map(p => (
          <Col key={p.id} xs={12} sm={6} md={6}>
            <Card className="mb-3 d-flex flex-row align-items-stretch" style={{ minHeight: '140px' }}>
              {p.imagenes?.[0] && (
                <Card.Img
                  src={p.imagenes[0]}
                  style={{
                    width: '120px',
                    objectFit: 'cover',
                  }}
                />
              )}
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title style={{ fontSize: '1rem' }}>{p.nombre}</Card.Title>
                  <Card.Text style={{ fontSize: '0.85rem' }}>
                    <small className="text-muted">
                      <strong>Código:</strong> {p.id} | <strong>Categoría:</strong> {p.categoria}
                    </small>
                    <br />
                    <strong>Precio:</strong> ${p.precio} | <strong>Stock:</strong> {p.stock}
                    {Array.isArray(p.talles) && p.talles.length > 0 && (
                      <> | <strong>Talles:</strong> {p.talles.join(', ')}</>
                    )}
                  </Card.Text>
                </div>
                <p style={{ whiteSpace: 'pre-line', maxHeight: '80px', overflowY: 'auto', marginBottom: '0.5rem' }}>
                  {p.descripcion}
                </p>
                <div className="d-flex flex-wrap gap-2 mt-2">
                  <Button size="sm" variant="outline-primary" onClick={() => abrirModalEditar(p)}>
                    Editar
                  </Button>
                  <Button size="sm" variant="outline-danger" onClick={() => eliminarProducto(p.id)}>
                    Eliminar
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{modoEdicion ? 'Editar producto' : 'Nuevo producto'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    required
                    value={productoActual?.nombre || ''}
                    onChange={e => setProductoActual(prev => ({ ...prev, nombre: e.target.value }))}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    value={productoActual?.precio || ''}
                    onChange={e => setProductoActual(prev => ({ ...prev, precio: e.target.value }))}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Categoría</Form.Label>
                  <Form.Select
                    required
                    value={productoActual?.categoria || ''}
                    onChange={e => setProductoActual(prev => ({ ...prev, categoria: e.target.value }))}
                  >
                    <option value="">Seleccionar</option>
                    <option value="Indumentaria">Indumentaria</option>
                    <option value="Calzado">Calzado</option>
                    <option value="Accesorios">Accesorios</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    value={productoActual?.stock || ''}
                    onChange={e => setProductoActual(prev => ({ ...prev, stock: e.target.value }))}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Talles (separados por coma)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: 38, 39, 40 o S, M, L"
                    value={productoActual?.tallesTexto || ''}
                    onChange={e =>
                      setProductoActual(prev => ({
                        ...prev,
                        tallesTexto: e.target.value,
                        talles: e.target.value
                          .split(',')
                          .map(t => t.trim())
                          .filter(Boolean),
                      }))
                    }
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    value={productoActual?.descripcion || ''}
                    onChange={e => setProductoActual(prev => ({ ...prev, descripcion: e.target.value }))}
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Subir imagen a Cloudinary</Form.Label>
                  <Form.Control type="file" onChange={subirImagen} disabled={cargando} />
                  {cargando && (
                    <div className="mt-2 d-flex align-items-center gap-2">
                      <Spinner animation="border" size="sm" />
                      <span>Subiendo imagen...</span>
                    </div>
                  )}
                </Form.Group>

                {productoActual?.imagenes?.length > 0 && (
                  <div className="mt-3 d-flex flex-wrap gap-2">
                    {productoActual.imagenes.map((url, index) => (
                      <div key={index} className="position-relative">
                        <Image
                          src={url}
                          thumbnail
                          fluid
                          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                        />
                        <Button
                          variant="danger"
                          size="sm"
                          title="Eliminar imagen"
                          aria-label="Eliminar imagen"
                          className="position-absolute top-0 end-0"
                          onClick={() => eliminarImagen(index)}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)} disabled={cargando}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={guardarProducto} disabled={cargando}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Admin;





