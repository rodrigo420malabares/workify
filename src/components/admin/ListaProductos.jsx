import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ListaProductos = ({ productos, onEditar, onEliminar, onDestacar }) => {
 
  
  return (
   <div className="row mt-3 mb-4">
    
      {Array.isArray(productos) && productos.map((p, index) => {
      
        // Si el producto no tiene nombre, lo ignoramos.
        if (!p.nombre) return null;
        
        const id = p._id || p.uid || p.id || index;
        
        // Protección para la categoría
        const nombreCategoria = typeof p.categoria === 'object' 
            ? p.categoria?.nombre 
            : p.categoria;

        return (
          <div key={id} className="col-md-4 mb-3">
            <Card className="h-100 shadow-sm" style={{ minHeight: '280px', fontSize: '0.9rem' }}>
              
              {/* IMPORTANTE: El Link envuelve la imagen y el texto, pero NO los botones */}
              <Link
                to={`/detalle/${id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Card.Img
                  variant="top"
                  src={p.imagen || p.img || p.imagenes?.[0] || '/placeholder.jpg'}
                  alt={p.nombre}
                  style={{ height: '140px', objectFit: 'contain', padding: '10px' }} 
                />
                <Card.Body className="pb-2">
                  <Card.Title style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                    {p.nombre}
                    {/* Opcional: Mostrar estrella chiquita en el título si es destacado */}
                    {p.destacado && <i className="bi bi-star-fill text-warning ms-2" style={{fontSize:'0.8rem'}}></i>}
                  </Card.Title>
                  <Card.Text>
                    <strong>Precio:</strong> ${p.precio}<br />
                    <strong>Stock:</strong> {p.stock}<br />
                    <strong>Categoría:</strong> {nombreCategoria}
                  </Card.Text>
                </Card.Body>
              </Link>

              {/* FOOTER CON ACCIONES */}
              <div className="px-3 pb-3 d-flex justify-content-between align-items-center bg-white rounded-bottom">
                
                {/* Grupo Izquierda: CRUD */}
                <div>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => onEditar(p)} title="Editar">
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => onEliminar(id)} title="Eliminar">
                    <i className="bi bi-trash"></i>
                  </button>
                </div>

                {/* Grupo Derecha: DESTACAR ⭐ */}
                <button 
                  className="btn btn-light btn-sm border-0" 
                  onClick={() => onDestacar(id, p.destacado)}
                  title={p.destacado ? "Quitar de destacados" : "Destacar producto"}
                >
                  {p.destacado ? (
                     <i className="bi bi-star-fill text-warning fs-4"></i> // Estrella llena
                  ) : (
                     <i className="bi bi-star text-secondary fs-4"></i> // Estrella vacía
                  )}
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