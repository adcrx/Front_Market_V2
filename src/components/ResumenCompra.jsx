import { useLocation } from 'react-router-dom';
import SidebarPerfil from "../components/SidebarPerfil";  
import "../assets/css/ResumenCompra.css"

const ResumenCompra = () => {
    const location = useLocation();
    const { carrito, total } = location.state || {}; // Obtener los productos y el total desde el estado de la navegación
  
    if (!carrito || carrito.length === 0) {
      return <p>No hay productos en tu compra.</p>; // Si no hay productos, muestra un mensaje
    }
  
    return (
      <div className="perfil-contenedor">
        <SidebarPerfil /> {/* Sidebar del perfil */}
        <div className="resumen-compra-main">
          <h2>¡Compra realizada con éxito!</h2>
          <p>Gracias por tu compra. Aquí están los productos que has adquirido:</p>
          
          <div className="productos-comprados">
            {carrito.map((item) => (
              <div key={item.id} className="producto-item">
                <img src={item.imagen || item.image} alt={item.title || item.titulo} />
                <div className="producto-info">
                  <h4>{item.title || item.titulo}</h4>
                  <p>TALLA: {item.talla || 'S'}</p>
                  <p>CANTIDAD: {item.cantidad}</p>
                  <p>PRECIO: ${item.precio}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="resumen-total">
            <h3>Total de la compra: ${total}</h3>
          </div>
        </div>
      </div>
    );
  };
  
  export default ResumenCompra;