import styles from "./Login.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useContext } from 'react'
import { AppContext } from '../context/context';

import { authAPI, getSessionInfo } from "../api/authAPI";

const label = (labelName, type, value, name) => {
  return (
    <label>
      {labelName}
      <input
        className={styles.inputBox}
        type={type}
        defaultValue={value}
        name={name}
      />
    </label>
  );
};

const Login = () => {
  // Tomar datos del contexto
  const { dispatch } = useContext(AppContext)

  const navigate = useNavigate();
  const location = useLocation();

  const completeLogin = () => {
    const sessionData = getSessionInfo();
    if(sessionData) {
      // Cambiar el estado de las variables de autenticación
      dispatch({type: "setUsername", payload: sessionData.username})
      dispatch({type: "setName", payload: sessionData.name})
      dispatch({type: "setAuth", payload: true})

      // Definir a dónde deberemos realizar el redirect
      // 1 - A la página por defecto (home) 
      // 2 - A la página definida en los query URL parameters

      // Leer los query string en búsqueda del parámetro next
      const next = new URLSearchParams(location.search).get("next");

      // Si el parámetro next está definido, se hace le redirect allí,
      // de lo contrario se hace el redirect a "home"
      const redirectTo = next? next : "/"
      
      navigate(redirectTo);
    }
  }

  useEffect(() => {
    // Intentar realizar el login utilizando la session
    authAPI.refresh().then((response) => {
      // Login efectuado exitosamente
      completeLogin();
    }).catch( error => {
      // No se pudo logear desde la session
    });
  }, []);

  // Establecemos la función que guarda los cambios en los datos globales:
  const handleSubmit = (event) => {
    // Suspendemos el evento para evitar submits erroneos
    event.preventDefault();
    // Seteamos como autorizado al usuario
    const username = event.target.username.value;
    const password = event.target.password.value;

    if(username == "" || password == "") {
      alert("Debe ingresar username y password");
      return;
    }

    authAPI.login(username, password).then((response) => {
      // Login efectuado exitosamente
      completeLogin();
      
    }).catch( error => {
      alert(`No se pudo realizar el login: ${error.code}`);
      // imprimir el error informado por el backend
      alert(`${error.response.status} | ${error.response.data.detail}`);
    });
    
  };

  return (
    <div className={styles.Container}>
      <div className={styles.formContainer}>
        <div className={styles.initialMessage}>
          <h1>¡Bienvenido!</h1>
          <p>Login con su usuario de inove</p>
        </div>
        <form className="loginForm" onSubmit={handleSubmit}>
          {label("Usuario:", "text", "","username")}
          {label("Contraseña:", "password", "","password")}
          <input className={styles.submitButton} type="submit" value="Log In" />
        </form>
      </div>
    </div>
  );
};
export default Login;
