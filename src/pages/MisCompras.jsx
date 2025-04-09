import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SidebarPerfil from "../components/SidebarPerfil";
import { AuthContext } from "../context/AuthContext";
import "../assets/css/ResumenCompra.css";
import "../assets/css/MisCompras.css";

const MisCompras = () => {
  const { usuario } = useContext(AuthContext);
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompras = async () => {
      if (!usuario?.usuario?.id) return;

      try {
        const response = await fetch(
          `https://backend-market-8jdy.onrender.com/pedidos/usuario/${usuario.usuario.id}`
        );

        const data = await response.json();
        console.log("Compras recibidas:", data);
        setCompras(data);
      } catch (error) {
        console.error("Error al obtener las compras:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompras();
  }, [usuario?.usuario?.id]);

  return (
    <div className="perfil-contenedor">
      <SidebarPerfil />
      <div className="resumen-compra-main">
        <h2>Mis Compras</h2>

        {loading ? (
          <p>Cargando compras...</p>
        ) : compras.length === 0 ? (
          <div className="sin-compras">
            <p>No has realizado ninguna compra.</p>
            <button className="btn-ver-productos" onClick={() => navigate("/publicaciones")}>
              Revisa nuestros productos aquí
            </button>
          </div>
        ) : (
          compras.map((compra, index) => (
            <div key={index} className="bloque-compra">
              <div className="compra-header">
                <h3>Compra #{compra.id}</h3>
                <span className={`estado ${compra.status.toLowerCase()}`}>
                  {compra.status}
                </span>
              </div>

              <p>Fecha: {new Date(compra.created_at).toLocaleDateString("es-CL")}</p>

              <div className="resumen-total">
                <h4>Total: ${Number(compra.total).toLocaleString("es-CL")}</h4>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MisCompras;
