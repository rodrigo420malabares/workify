import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ListaProductos = ({ productos, onEditar, onEliminar }) => {
  return (
    <div className="row mt-4">
      {productos.map((p) => (
        <div key={p.id} className="col-md-4 mb-3">
          <Link
            to={`/detalle/${p.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={p.imagen || p.imagenes?.[0] || '/placeholder.jpg'}
                alt={p.nombre}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>{p.nombre}</Card.Title>
                <Card.Text>
                  <strong>Precio:</strong> ${p.precio}<br />
                  <strong>Stock:</strong> {p.stock}<br />
                  <strong>Categoría:</strong> {p.categoria}
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
          <div className="mt-2 d-flex justify-content-between">
            <button className="btn btn-warning" onClick={() => onEditar(p)}>
              Editar
            </button>
            <button className="btn btn-danger" onClick={() => onEliminar(p.id)}>
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListaProductos;


