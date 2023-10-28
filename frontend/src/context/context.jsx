import { createContext, useReducer } from "react";
import { getSessionInfo } from "../api/authAPI"

export const AppContext = createContext();

export const initialState = {
  auth: false,
  username: "",  // username del usuario logeado
  name: "",  // nombre del usuario logeado
}

// Si existe una sesion, inicializar con dicha información
const sessionData = getSessionInfo();
if(sessionData) {
  initialState.auth = true;
  initialState.username = sessionData.username;
  initialState.name = sessionData.name;
}

export const AppReducer = (state, action)=>{
  switch(action.type){
    case "setAuth":{
      return {
        ...state,
        auth: action.payload,
      }
    }
    case "setUsername":{
      return {
        ...state,
        username: action.payload,
      }
    }
    case "setName":{
      return {
        ...state,
        name: action.payload,
      }
    }
    default:
      return state;
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const value = {
    state: state,
    dispatch: dispatch,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;

};

