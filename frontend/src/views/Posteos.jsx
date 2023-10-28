import { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from '../context/context';

import styles from "./Posteos.module.css";

import PosteoCard from "../components/PosteoCard/PosteoCard"

import { posteosAPI } from "../api/posteosAPI";

const Posteos = () => {
  // Tomar datos del contexto
  const { state } = useContext(AppContext)
  const { username } = state

  // Posteos
  const [posteos, setPosteos] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if(!username) {
      return // Sin un usuario no es posible leer los posteos
    }

    posteosAPI.get().then((response) => {
      setPosteos(response)
    }).catch( error => {
      // Informar el error del backend
      console.log(`${error.response.status} | ${error.response.data.detail}`);
    });
  }, [username]);

  return (
    <div className={styles.container}>
        {   Array.isArray(posteos)?
            posteos.map((posteoData) => {
            return (
                <PosteoCard posteoData={posteoData} key={posteoData.id}/>
            );
        })
        :
        <></>
      }
    </div>
  );
};
export default Posteos;
