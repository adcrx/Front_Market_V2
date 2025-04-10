import { useEffect, useState, useContext } from "react";
import axios from "axios";
import SidebarPerfil from "../components/SidebarPerfil";
import PublicacionCard from "../components/PublicacionCard";
import { AuthContext } from "../context/AuthContext";
import "../assets/css/MiPerfil.css";

function MiPerfil() {
  const [publicaciones, setPublicaciones] = useState([]);
  const { usuario: contextValue } = useContext(AuthContext);

  useEffect(() => {
    if (contextValue && contextValue.usuario && contextValue.usuario.id) {
      const userId = contextValue.usuario.id;

      axios.get(`https://backend-market-8jdy.onrender.com/productos`, {
        params: { vendedor_id: userId }
      })
        .then(response => {
          const fetchedPublicaciones = response.data.data || response.data;
          setPublicaciones(Array.isArray(fetchedPublicaciones) ? fetchedPublicaciones : []);
        })
        .catch(() => {
          setPublicaciones([]);
        });
    } else {
      setPublicaciones([]);
    }
  }, [contextValue]);

  const isLoggedIn = contextValue && contextValue.usuario && contextValue.usuario.id;
  const hasPublications = publicaciones.length > 0;

  return (
    <div className="perfil-container">
      <SidebarPerfil />
      <main className="main-content">
        <h2>MIS PUBLICACIONES</h2>
        <div className="publicaciones-grid">
          {!isLoggedIn && <p>Inicia sesión para ver tus publicaciones.</p>}
          {isLoggedIn && !hasPublications && <p>No tienes publicaciones aún.</p>}
          {isLoggedIn && hasPublications && (
            publicaciones.map((p) => (
              <PublicacionCard key={p.id} publicacion={p} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default MiPerfil;
