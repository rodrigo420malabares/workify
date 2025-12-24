import { useState, useEffect, useContext } from 'react';
import { Table, Button, Badge, Pagination } from 'react-bootstrap';
import { getUsuarios, borrarUsuario, actualizarUsuario } from '../../helpers/userApi';

import { AuthContext } from '../../context/AuthContext';

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  // Obtenemos tus datos de la sesión actual
  const { usuario: usuarioLogueado } = useContext(AuthContext);

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

 // 👇 LÓGICA DE TOGGLE (EL BOTÓN INTELIGENTE) 🧠
  const cambiarEstado = async (id, estadoActual) => {

// 👇 4. EL CANDADO DE SEGURIDAD 🔒
    // Comparamos el ID de la fila con TU ID (uid o _id)
    const miId = usuarioLogueado.uid || usuarioLogueado._id;
    
    if (id === miId) {
        alert("⚠️ ¡No podés desactivarte a vos mismo! Te quedarías sin acceso.");
        return; // Cortamos la función acá. No hace nada.
    }

    // Definimos qué queremos hacer: si es true pasa a false, y viceversa
    const nuevoEstado = !estadoActual;
    const textoAccion = nuevoEstado ? "ACTIVAR" : "DESACTIVAR";

    if (!window.confirm(`¿Estás seguro que querés ${textoAccion} a este usuario?`)) {
      return;
    }

    try {
      // Usamos PUT para actualizar solo el campo 'estado'
      await actualizarUsuario(id, { estado: nuevoEstado });
      
      // Recargamos la lista para ver el cambio visualmente
      cargarUsuarios();
    } catch (error) {
      console.error(error);
      alert("No se pudo cambiar el estado");
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
             currentUsers.map((u) => {
                // 👇 Calculamos si este usuario sos vos
                const esMismoUsuario = (u.uid || u._id) === (usuarioLogueado.uid || usuarioLogueado._id);

                return (
                <tr 
                  key={u.uid || u._id}
                  style={{ backgroundColor: u.estado ? 'transparent' : '#f2f2f2' }}
                > 
                  <td>
                    {u.nombre} {u.apellido} 
                    {/* Le ponemos una estrellita si sos vos */}
                    {esMismoUsuario && <Badge bg="primary" className="ms-2">TÚ</Badge>}
                  </td>
                  <td>{u.correo}</td>
                  <td>
                    <Badge bg={u.rol === 'ADMIN_ROLE' || u.rol === 'Admin' ? 'warning' : 'info'}>
                      {u.rol}
                    </Badge>
                  </td>
                  <td>
                    {u.estado ? <Badge bg="success">Activo</Badge> : <Badge bg="danger">Inactivo</Badge>}
                  </td>
                  <td className="text-end">
                    <Button
                      variant={u.estado ? "danger" : "success"}
                      size="sm"
                      // 👇 5. VISUALMENTE BLOQUEADO
                      // Si sos vos, deshabilitamos el botón para que ni te tientes
                      disabled={esMismoUsuario} 
                      onClick={() => cambiarEstado(u.uid || u._id, u.estado)}
                    >
                      {u.estado ? (
                         <><i className="bi bi-person-x-fill"></i> Desactivar</>
                      ) : (
                         <><i className="bi bi-arrow-counterclockwise"></i> Reactivar</>
                      )}
                    </Button>
                  </td>
                </tr>
              )})
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