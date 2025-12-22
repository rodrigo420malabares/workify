import { useState, useEffect } from 'react';
import { Table, Button, Badge, Pagination } from 'react-bootstrap';
import { getUsuarios, borrarUsuario } from '../../helpers/userApi';

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  // 2. Nuevos estados para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10; // Cantidad de usuarios por página

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
// 3. Lógica matemática para cortar la lista (El cerebro de la paginación) 🧠
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  // Esta es la lista "cortada" que vamos a mostrar en la tabla
  const currentUsers = usuarios.slice(indexOfFirstUser, indexOfLastUser);
  
  // Calculamos el total de páginas
  const totalPages = Math.ceil(usuarios.length / usersPerPage);

  // Función para cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
            {currentUsers.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  Cargando usuarios o no hay registros...
                </td>
              </tr>
            ) : (
              currentUsers.map((u) => (
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
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-3">
            <Pagination>
                <Pagination.Prev 
                    onClick={() => setCurrentPage(currentPage - 1)} 
                    disabled={currentPage === 1} 
                />
                
                {/* Generamos los botones de número dinámicamente */}
                {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item 
                        key={index + 1} 
                        active={index + 1 === currentPage}
                        onClick={() => paginate(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}

                <Pagination.Next 
                    onClick={() => setCurrentPage(currentPage + 1)} 
                    disabled={currentPage === totalPages} 
                />
            </Pagination>
        </div>
      )}
    </div>
  );
};

export default AdminUsuarios;