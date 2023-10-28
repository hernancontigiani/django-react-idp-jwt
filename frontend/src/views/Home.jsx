import styles from "./Home.module.css";
import { useContext } from 'react'
import { Link } from "react-router-dom";

import { AppContext } from '../context/context';


const Home = () => {
  // Tomar datos del contexto
  const { state } = useContext(AppContext)
  const { auth, username } = state

  return (
    <div className={styles.container}>
      {auth === true?
        <>
        <div>¡Bienvenido! {username}</div>
        <Link to="/posteos">Para ver los posteos haga click aquí</Link>
        </>
      :
        <div>Para poder ver los posteos debe logearse</div>
      }
    </div>
  );
};
export default Home;
