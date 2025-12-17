import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ListaProductos = ({ productos, onEditar, onEliminar }) => {
  // ⚠️ NO pongas nada de 'p' aquí, porque 'p' no existe todavía.
  
  return (
    <div className="row mt-3 mb-4">
      {/* Verificamos que productos sea un array para evitar errores */}
      {Array.isArray(productos) && productos.map((p, index) => {
        
// 👇👇 AGREGA ESTA LÍNEA AQUÍ 👇👇
        // Si el producto no tiene nombre, lo ignoramos y no dibujamos NADA.
        if (!p.nombre) return null;
        console.log("DATOS DEL PRODUCTO:", p);
        // ✅ AQUÍ SÍ EXISTE 'p'. La lógica va aquí adentro:
        const id = p._id || p.uid || p.id || index ;
        
        // Protección para la categoría
        const nombreCategoria = typeof p.categoria === 'object' 
            ? p.categoria?.nombre 
            : p.categoria;

        return (
          <div key={id} className="col-md-4 mb-3">
            <Card className="h-100 shadow-sm" style={{ minHeight: '280px', fontSize: '0.9rem' }}>
              <Link
                to={`/detalle/${id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Card.Img
                  variant="top"
                  src={p.imagen || p.img || p.imagenes?.[0] || '/placeholder.jpg'}
                  alt={p.nombre}
                  style={{ height: '140px', objectFit: 'cover' }}
                />
                <Card.Body className="pb-2">
                  <Card.Title style={{ fontSize: '1rem' }}>{p.nombre}</Card.Title>
                  <Card.Text>
                    <strong>Precio:</strong> ${p.precio}<br />
                    <strong>Stock:</strong> {p.stock}<br />
                    <strong>Categoría:</strong> {nombreCategoria}
                  </Card.Text>
                </Card.Body>
              </Link>
              <div className="px-3 pb-3 d-flex justify-content-between">
                <button className="btn btn-warning btn-sm" onClick={() => onEditar(p)}>
                  Editar
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => onEliminar(id)}>
                  Eliminar
                </button>
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default ListaProductos;