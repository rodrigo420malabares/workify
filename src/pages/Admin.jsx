import { useState } from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';

// 👇 IMPORTAMOS LOS COMPONENTES "HIJOS" QUE YA TIENEN LA LÓGICA
import AdminProductos from '../components/admin/AdminProductos';
import AdminCategorias from '../components/admin/AdminCategorias';
import AdminUsuarios from '../components/admin/AdminUsuarios';

const Admin = () => {
  const [key, setKey] = useState('productos');

  // 🗑️ ¡BORRAMOS TODO LO VIEJO! 
  // Ya no necesitamos useState de productos, ni localStorage, ni handlers aquí.
  // Todo eso ahora lo maneja AdminProductos.jsx internamente.

  return (
    <Container className="mt-4 mb-5">
      <h2 className="mb-4 text-center">Panel de Administración</h2>

      <Tabs
        id="admin-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        {/* PESTAÑA 1: PRODUCTOS */}
        <Tab eventKey="productos" title="📦 Productos">
           {/* 👇 AQUÍ ESTÁ LA MAGIA: Renderizamos el componente que arreglamos hoy */}
           <AdminProductos />
        </Tab>

        {/* PESTAÑA 2: CATEGORÍAS */}
        <Tab eventKey="categorias" title="🏷️ Categorías">
           <AdminCategorias />
        </Tab>

        {/* PESTAÑA 3: USUARIOS */}
        <Tab eventKey="usuarios" title="👥 Usuarios">
           <AdminUsuarios />
        </Tab>

      </Tabs>
    </Container>
  );
};

export default Admin;