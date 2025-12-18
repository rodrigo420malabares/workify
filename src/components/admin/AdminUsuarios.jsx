import { useState, useEffect } from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { getUsuarios, borrarUsuario } from '../../helpers/userApi';

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const resp = await getUsuarios();
      setUsuarios(resp.usuarios || []); 
    } catch (error) {
      console.error(error);
      alert("Error al cargar usuarios");
    }
  };

  const handleBorrar = async (id) => {
    // Usamos la alerta nativa del navegador
    if (!window.confirm("¿Seguro que quieres eliminar/desactivar este usuario?")) {
      return;
    }

    try {
      await borrarUsuario(id);
      cargarUsuarios();
    } catch (error) {
      alert("No se pudo borrar");
    }
  };

  return (
    <div className="mt-4">
      <h3 className="mb-3">Gestión de Usuarios</h3>

      <div className="table-responsive">
        <Table striped bordered hover>
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Estado</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  Cargando usuarios o no hay registros...
                </td>
              </tr>
            ) : (
              usuarios.map((u) => (
                <tr key={u.uid || u._id}> 
                  <td>{u.nombre} {u.apellido}</td>
                  <td>{u.correo}</td>
                  <td>
                    <Badge bg={u.rol === 'ADMIN_ROLE' || u.rol === 'Admin' ? 'warning' : 'info'}>
                      {u.rol}
                    </Badge>
                  </td>
                  <td>
                    {u.estado ? (
                      <Badge bg="success">Activo</Badge>
                    ) : (
                      <Badge bg="danger">Inactivo</Badge>
                    )}
                  </td>
                  <td className="text-end">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleBorrar(u.uid || u._id)}
                    >
                      <i className="bi bi-trash"></i> Eliminar
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AdminUsuarios;