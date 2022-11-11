import axios from "axios";
import { config } from "../helpers/auth";
import Cookies from "js-cookie";
import { createContext, useState, useEffect } from "react";


export const AuthContext = createContext();


export default function AuthContextProvider(props) {
  const [auth, setAuth] = useState(true);
  const [user, setUser] = useState({});
  const BASE_URL = `https://shelf-tec-store.herokuapp.com`

  useEffect(() => {
    axios
      .get(`${BASE_URL}/auth/verify-token`, config)
      .then((response) => {
        setUser(response.data);
        setAuth(true);
      })
      .catch(() => {
        setAuth(false);
        Cookies.remove("authToken");
      });
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const logout = () => {
    setAuth(false);
    Cookies.remove("authToken");
    window.location.href = '/login'
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, user, setUser, logout }} >
      {props.children}
    </AuthContext.Provider>
  )
}