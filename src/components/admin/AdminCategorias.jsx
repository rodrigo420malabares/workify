import { useState, useEffect } from 'react';
import { Table, Button, Form, Alert } from 'react-bootstrap';
import { 
  getCategorias, 
  crearCategoria, 
  borraCategoria 
} from '../../helpers/categoryApi';

const AdminCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [nuevaCategoria, setNuevaCategoria] = useState(""); // Solo guarda el texto del input
  const [mensaje, setMensaje] = useState("");

  // 1. Cargar las categorías al entrar a la página
  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {
    try {
      const resp = await getCategorias();
      setCategorias(resp.categorias || resp);
    } catch (error) {
      console.log(error);
    }
  };

  // 2. Función para CREAR una nueva
  const handleCrear = async (e) => {
    e.preventDefault(); // Evita que se recargue la página

    if (nuevaCategoria.length < 3) {
      alert("El nombre es muy corto");
      return;
    }

    try {
      await crearCategoria({ nombre: nuevaCategoria });
      setNuevaCategoria(""); // Limpiar el input
      setMensaje("¡Categoría creada con éxito!");
      cargarCategorias(); // Recargar la lista para ver la nueva
      
      // Borrar mensaje de éxito a los 3 segundos
      setTimeout(() => setMensaje(""), 3000);
    } catch (error) {
      alert("Error al crear");
    }
  };

  // 3. Función para BORRAR
  const handleBorrar = async (id) => {
    if (window.confirm("¿Seguro que quieres borrarla?")) {
      try {
        await borraCategoria(id);
        cargarCategorias(); // Recargar la lista
      } catch (error) {
        alert("No se pudo borrar");
      }
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Administrar Categorías</h3>

      {/* --- FORMULARIO SIMPLE (SIN MODAL) --- */}
      <div className="card p-3 mb-4 shadow-sm">
        <h5>Agregar Nueva Categoría</h5>
        <Form onSubmit={handleCrear} className="d-flex gap-2">
          <Form.Control 
            type="text" 
            placeholder="Ej: Teclados"
            value={nuevaCategoria}
            onChange={(e) => setNuevaCategoria(e.target.value)}
          />
          <Button type="submit" variant="primary">
            Guardar
          </Button>
        </Form>
        {mensaje && <p className="text-success mt-2">{mensaje}</p>}
      </div>

      {/* --- TABLA DE LISTADO --- */}
      <Table striped bordered hover>
        <thead className="table-dark">
          <tr>
            <th>Nombre</th>
            <th className="text-end">Acción</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((cat) => (
            <tr key={cat._id || cat.uid}>
              <td>{cat.nombre}</td>
              <td className="text-end">
                <Button 
                  variant="danger" 
                  size="sm"
                  onClick={() => handleBorrar(cat._id || cat.uid)}
                >
                  <i className="bi bi-trash"></i> Borrar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminCategorias;