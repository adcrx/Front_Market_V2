import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SidebarPerfil from "../components/SidebarPerfil";
import { AuthContext } from "../context/AuthContext";
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
      <div className="compras-contenido">
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
          compras.map((compra) => (
            <div key={compra.id} className="tarjeta-compra">
              <div className="compra-encabezado">
                <h3>Compra #{compra.id}</h3>
                <span className={`estado ${compra.status ? compra.status.toLowerCase() : "pendiente"}`}>
                  {compra.status || "Pendiente"}
                </span>
              </div>
              <p className="fecha-compra">Fecha: {new Date(compra.created_at).toLocaleDateString("es-CL")}</p>
              <h4 className="total-compra">Total: ${Number(compra.total).toLocaleString("es-CL")}</h4>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MisCompras;
