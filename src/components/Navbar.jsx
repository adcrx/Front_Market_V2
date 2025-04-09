import { Link } from "react-router-dom";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { AuthContext } from "../context/AuthContext";
import { FaUser, FaShoppingCart, FaStar } from 'react-icons/fa';
import '../assets/css/Navbar.css';

// Importar imágenes de avatares
import avatar1 from '../assets/img/Register/icon1.png';
import avatar2 from '../assets/img/Register/icon2.png';
import avatar3 from '../assets/img/Register/icon3.png';
import avatar4 from '../assets/img/Register/icon4.png';
import defaultAvatar from '../assets/img/default-avatar.webp';

// Mapeo de nombres a imágenes
const avatarMap = {
  avatar1,
  avatar2,
  avatar3,
  avatar4
};

function Navbar() {
  const { carrito, calcularTotal } = useContext(CarritoContext);
  const { usuario, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="logo-section">
        <div className="container-0-1-6">
          <div className="logo-icon">
            <FaStar color="#151c33" />
          </div>
        </div>
        <Link to="/" className="text-0-1-4">TREND'S</Link>
      </div>

      <div className="nav-links">
        {!usuario ? (
          <>
            <span className="text-0-1-5">
              <Link to="/registro">REGISTRO</Link>
            </span>
            <span className="text-0-1-1">
              <Link to="/login">INGRESAR</Link>
            </span>
          </>
        ) : (
          <>
            <Link to="/perfil">Mi Perfil</Link>
            <Link to="/publicar">Publicar</Link>
            <button onClick={logout}>Cerrar sesión</button>
          </>
        )}

        <div className="user-actions">
     

          {usuario && (
            <>
              <Link to="/carrito" className="container-0-1-3">
                <FaShoppingCart color="#151c33" size={20} />
                {carrito && carrito.length > 0 && (
                  <span className="cart-total">
                    ${calcularTotal().toLocaleString("es-CL")}
                  </span>
                )}
              </Link>

              {/* Mostrar avatar */}
              <div className="avatar-navbar">
                <img
                  src={avatarMap[usuario.usuario.avatar] || defaultAvatar}
                  alt="Avatar"
                  className="avatar-img"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
