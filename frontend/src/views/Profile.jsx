import styles from "./Profile.module.css";
import { useContext } from 'react'
import { AppContext } from '../context/context';

import {
  FormInput,
  RequiredFormInput,
} from "../components/FormInputs/FormInputs";

const Profile = () => {
  // Tomar datos del contexto
  const { state } = useContext(AppContext)
  const { username } = state

  return (
    <div className={styles.formsContainer}>
      <div className={styles.userProfileContainer}>
        <div className={styles.initialMessage}>
          <h1>Perfil de usuario</h1>
        </div>
        <form
          className={[styles.userProfileForm, styles.formCommon].join(" ")}
        >
          {FormInput("Nombre", "text", username, 'username')}
          {RequiredFormInput("**Email", "email", "", 'email')}
        </form>
      </div>
    </div>
  );
};
export default Profile;
