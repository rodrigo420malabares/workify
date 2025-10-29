import "../styles/ClientePage.css";

export default function ClientPage() {
  return (
    <div className="client-page">
      <header className="client-header">
        <h1>Gestión de Cliente</h1>
      </header>

      <main className="client-content">
        {/* Tarjeta de información del cliente */}
        <section className="client-info-section">
          <h2>Información del Cliente</h2>
          <div className="client-card">
            <p><strong>Nombre:</strong> Juan Pérez</p>
            <p><strong>Email:</strong> juanperez@example.com</p>
            <p><strong>Teléfono:</strong> +54 381 555-1234</p>
            <p><strong>Dirección:</strong> Av. Siempre Viva 742, Tucumán</p>
          </div>
        </section>

        {/* Historial de compras */}
        <section className="client-orders-section">
          <h2>Historial de Compras</h2>
          <div className="order-card">
            <p><strong>Pedido #001</strong> - 25/10/2025</p>
            <p>Producto: Silla ergonómica</p>
            <p>Total: $45.000</p>
          </div>
          <div className="order-card">
            <p><strong>Pedido #002</strong> - 28/10/2025</p>
            <p>Producto: Escritorio gamer</p>
            <p>Total: $120.000</p>
          </div>
        </section>
      </main>
    </div>
  );
}


