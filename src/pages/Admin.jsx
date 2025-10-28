import { useState } from 'react';
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

  const guardarProducto = () => {
    const { nombre, precio, categoria, descripcion } = productoActual;
    if (!nombre || !precio || !categoria) {
      alert('Por favor completá los campos obligatorios.');
      return;
    }

    const descripcionFormateada = descripcion
      .split('.')
      .map(oracion => oracion.trim())
      .filter(Boolean)
      .join('.\n');

    const productoFinal = {
      ...productoActual,
      descripcion: descripcionFormateada,
    };

    const actualizados = modoEdicion
      ? productos.map(p => p.id === productoFinal.id ? productoFinal : p)
      : [...productos, productoFinal];

    setProductos(actualizados);
    localStorage.setItem('productos-admin', JSON.stringify(actualizados));
    setShowModal(false);
  };

  const eliminarProducto = (id) => {
    if (window.confirm('¿Eliminar este producto?')) {
      const actualizados = productos.filter(p => p.id !== id);
      setProductos(actualizados);
      localStorage.setItem('productos-admin', JSON.stringify(actualizados));
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
          imagenes: [...prev.imagenes, data.secure_url],
        }));
      } else {
        alert('Error al subir imagen: ' + data.message);
      }
    } catch (error) {
      alert('Error de red al subir imagen');
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  const eliminarImagen = (index) => {
    setProductoActual(prev => ({
      ...prev,
      imagenes: prev.imagenes.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="container py-4">
      <h2>Administrador de productos</h2>
      <Button onClick={abrirModalNuevo}>Crear nuevo producto</Button>

      <Row className="mb-3 mt-3">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Filtrar por categoría</Form.Label>
            <Form.Select
              value={filtroCategoria}
              onChange={e => setFiltroCategoria(e.target.value)}
            >
              <option value="">Todas</option>
              <option value="Indumentaria">Indumentaria</option>
              <option value="Calzado">Calzado</option>
              <option value="Accesorios">Accesorios</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={4}>
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
      </Row>

      <Row className="mt-4">
        {productos
          .filter(p => {
            const coincideCategoria = filtroCategoria ? p.categoria === filtroCategoria : true;
            const coincideTalle = filtroTalle
              ? p.talles?.some(t => t.toLowerCase() === filtroTalle.toLowerCase())
              : true;
            return coincideCategoria && coincideTalle;
          })
          .map(p => (
            <Col key={p.id} xs={12}>
              <Card className="mb-3 d-flex flex-row align-items-center">
                <Card.Img
                  src={p.imagenes?.[0]}
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{p.nombre}</Card.Title>
                  <Card.Text>
                    <small className="text-muted">
                      <strong>Código:</strong> {p.id} | <strong>Categoría:</strong> {p.categoria}
                    </small><br />
                    <strong>Precio:</strong> ${p.precio} | <strong>Stock:</strong> {p.stock}
                    {Array.isArray(p.talles) && p.talles.length > 0 && (
                      <> | <strong>Talles:</strong> {p.talles.join(', ')}</>
                    )}
                  </Card.Text>
                  <p style={{ whiteSpace: 'pre-line' }}>{p.descripcion}</p>
                  <div className="d-flex gap-2">
                    <Button variant="outline-primary" onClick={() => abrirModalEditar(p)}>
                      Editar
                    </Button>
                    <Button variant="outline-danger" onClick={() => eliminarProducto(p.id)}>
                      Eliminar
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>

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
                    value={productoActual?.nombre}
                    onChange={e => setProductoActual(prev => ({ ...prev, nombre: e.target.value }))}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    type="number"
                    value={productoActual?.precio}
                    onChange={e => setProductoActual(prev => ({ ...prev, precio: e.target.value }))}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Categoría</Form.Label>
                  <Form.Select
                    value={productoActual?.categoria}
                    onChange={e => setProductoActual(prev => ({ ...prev, categoria: e.target.value }))}
                  >
                    <option value="">Seleccionar</option>
                    <option value="computadora">Computadoras</option>
                    <option value="escritorio">Escritorios</option>
                    <option value="fichero">Ficheros</option>
                    <option value="sillas">Sillas</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    value={productoActual?.stock}
                    onChange={e => setProductoActual(prev => ({ ...prev, stock: e.target.value }))}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Talles (separados por coma)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: 38, 39, 40 o S, M, L"
                    value={productoActual?.tallesTexto}
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
                    value={productoActual?.descripcion}
                    onChange={e => setProductoActual(prev => ({ ...prev, descripcion: e.target.value }))}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Subir imagen a Cloudinary</Form.Label>
                  <Form.Control type="file" onChange={subirImagen} disabled={cargando} />
                  {cargando && <Spinner animation="border" size="sm" className="mt-2" />}
                </Form.Group>
                {productoActual?.imagenes?.length > 0 && (
                  <div className="mt-3 d-flex flex-wrap gap-2">
                    {productoActual.imagenes.map((url, index) => (
                      <div key={index} className="position-relative">
                        <Image
                          src={url}
                          thumbnail
                          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                        />
                        <Button
                          variant="danger"
                          size="sm"
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
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={guardarProducto}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Admin;