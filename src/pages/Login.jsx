import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../assets/css/Login.css";
import loginImg from "../assets/img/Register/LoginPic.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3000/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Credenciales inválidas');
      }

      const userData = await response.json();
      
      // Crear objeto con el formato esperado por el contexto
      const datosUsuario = {
        token: userData.token, // ← token real que viene del backend
        usuario: userData.usuario // ← objeto usuario completo
      };
      

      login(datosUsuario);

      localStorage.setItem("token", userData.token);
      localStorage.setItem("userId", userData.usuario.id);

      navigate("/perfil");
    } catch (error) {
      console.error('Error:', error);
      alert('Error en el inicio de sesión');
    }
  };

  return (
    <div className="login-container">
      <div className="box">
        <div className="login-img">
          <img src={loginImg} alt="Promo login" />
        </div>

        <div className="login-form">
          <h2>INICIO DE SESIÓN</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">INICIAR SESIÓN</button>
          </form>
          <p className="registro-link">
            ¿No tienes cuenta? <span onClick={() => navigate("/registro")}>Regístrate aquí</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;