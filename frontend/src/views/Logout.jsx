import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useContext } from "react"
import { AppContext } from '../context/context';

import { authAPI } from "../api/authAPI";

const Logout = () => {
  // Tomar datos del contexto
  const { dispatch } = useContext(AppContext)

  const navigate = useNavigate();
  const location = useLocation();

  const completeLogout = () => {
    dispatch({type: "setName", payload: ""})
    dispatch({type: "setUsername", payload: ""})
    dispatch({type: "setAuth", payload: false})

    const next = new URLSearchParams(location.search).get("next");
    const redirectTo = next? `/login?next=${next}` : `/login`
    navigate(redirectTo)
  }

  useEffect(() => {
    // Intentar realizar el login utilizando la session
    authAPI.logout().then((response) => {
      // Logout efectio, sesion culminada
    }).catch( error => {
      // No se pudo deslogear, la sesion expiro
    }).finally(() => {
      // Completar el logout
      completeLogout();
    });
  }, [])


  return <></>
};
export default Logout;
