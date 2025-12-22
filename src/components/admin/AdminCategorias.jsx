import { useState, useEffect } from 'react';
import { Table, Button, Form, Alert, Spinner } from 'react-bootstrap';
// ⚠️ Chequeá que en categoryApi tengas exportado 'borrarCategoria' (con R al final)
import { 
  getCategorias, 
  crearCategoria, 
  borrarCategoria 
} from '../../helpers/categoryApi';

const AdminCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [nuevaCategoria, setNuevaCategoria] = useState("");
  
  // Estados para feedback visual
  const [mensaje, setMensaje] = useState(null); // objeto { tipo: 'success'|'danger', texto: '' }
  const [loading, setLoading] = useState(false);

// --- VARIABLES DE PAGINACIÓN ---
  const [desde, setDesde] = useState(0); // Controla desde qué registro mostramos
  const [total, setTotal] = useState(0); // El backend nos dirá cuántos hay en total
  const limite = 5; // Cuántos mostramos por página


  // 1. Cargar las categorías al entrar
  useEffect(() => {
    cargarCategorias();
  }, [desde]);

 const cargarCategorias = async () => {
    setLoading(true);
    try {
      // Le pedimos al backend: "Dame 5 categorías saltando las primeras X"
      const resp = await getCategorias(desde, limite);
      
      // El backend devuelve { total: 20, categorias: [...] }
      setCategorias(resp.categorias || []);
      setTotal(resp.total || 0); 

    } catch (error) {
      console.error(error);
      setMensaje({ tipo: 'danger', texto: 'Error al cargar lista.' });
    } finally {
      setLoading(false);
    }
  };

  // 2. Función para CREAR
  const handleCrear = async (e) => {
    e.preventDefault();

    if (nuevaCategoria.trim().length < 3) {
      setMensaje({ tipo: 'danger', texto: "El nombre es muy corto." });
      return;
    }

    setLoading(true);
    setMensaje(null);

    try {
      // ⚠️ IMPORTANTE: Enviamos un OBJETO, no solo el string.
      // El backend suele esperar body: { nombre: "..." }
      await crearCategoria({ nombre: nuevaCategoria });

      setMensaje({ tipo: 'success', texto: "¡Categoría creada con éxito!" });
      setNuevaCategoria(""); // Limpiar input
      cargarCategorias();    // 🔄 Recargar la lista para ver la nueva

    } catch (error) {
      console.error(error);
      // Aquí capturamos el mensaje exacto del backend (ej: "Ya existe")
      setMensaje({ tipo: 'danger', texto: error.message || "Error al crear la categoría." });
    } finally {
      setLoading(false);
    }
  };

  // 3. Función para BORRAR
  const handleBorrar = async (id) => {
    if (!window.confirm("¿Seguro que quieres borrarla?")) return;

    setLoading(true);
    try {
      await borrarCategoria(id);
      setMensaje({ tipo: 'success', texto: "Categoría eliminada." });
      cargarCategorias(); // Recargar la lista
    } catch (error) {
      setMensaje({ tipo: 'danger', texto: "No se pudo borrar la categoría." });
    } finally {
      setLoading(false);
    }
  };

  // --- FUNCIONES DE LOS BOTONES ---
  const handleSiguiente = () => {
    // Solo avanza si no nos pasamos del total
    if (desde + limite < total) {
      setDesde(desde + limite);
    }
  };

  const handleAnterior = () => {
    // Solo retrocede si no estamos en 0
    if (desde - limite >= 0) {
      setDesde(desde - limite);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Administrar Categorías</h3>

      {/* ALERTAS DINÁMICAS */}
      {mensaje && (
        <Alert variant={mensaje.tipo} onClose={() => setMensaje(null)} dismissible>
          {mensaje.texto}
        </Alert>
      )}

      {/* --- FORMULARIO --- */}
      <div className="card p-3 mb-4 shadow-sm bg-light">
        <h5 className="mb-3">Agregar Nueva Categoría</h5>
        <Form onSubmit={handleCrear} className="d-flex gap-2">
          <Form.Control 
            type="text" 
            placeholder="Ej: Teclados"
            value={nuevaCategoria}
            onChange={(e) => setNuevaCategoria(e.target.value)}
            disabled={loading} // Bloqueamos mientras carga
          />
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : 'Guardar'}
          </Button>
        </Form>
      </div>

      {/* --- TABLA --- */}
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th className="text-end">Acción</th>
            </tr>
          </thead>
          <tbody>
            {loading && categorias.length === 0 ? (
               <tr><td colSpan="2" className="text-center">Cargando...</td></tr>
            ) : (
              categorias.map((cat) => (
                <tr key={cat._id || cat.uid || cat.id}>
                  <td className="align-middle">{cat.nombre}</td>
                  <td className="text-end">
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => handleBorrar(cat._id || cat.uid || cat.id)}
                      disabled={loading}
                    >
                      <i className="bi bi-trash"></i> Borrar
                    </Button>
                  </td>
                </tr>
              ))
            )}
            {!loading && categorias.length === 0 && (
                <tr><td colSpan="2" className="text-center text-muted">No hay categorías cargadas.</td></tr>
            )}
          </tbody>
        </Table>
      </div>

{/* --- BOTONES DE PAGINACIÓN --- */}
      {/* Solo se muestran si hay datos o si estamos navegando */}
      <div className="d-flex justify-content-between align-items-center mt-3 bg-white p-2 border rounded">
          <Button 
            variant="outline-primary" 
            onClick={handleAnterior} 
            disabled={desde === 0 || loading}
          >
             <i className="bi bi-chevron-left"></i> Anterior
          </Button>
          
          <span className="text-muted fw-bold">
             {/* Lógica visual: Mostrando 1-5 de 20 */}
             Mostrando {total === 0 ? 0 : desde + 1} - {Math.min(desde + limite, total)} de {total}
          </span>

          <Button 
            variant="outline-primary" 
            onClick={handleSiguiente} 
            disabled={desde + limite >= total || loading}
          >
             Siguiente <i className="bi bi-chevron-right"></i>
          </Button>
      </div>

    </div>
  );
};

export default AdminCategorias;