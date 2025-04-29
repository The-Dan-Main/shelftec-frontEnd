import axios from "axios";
import { config } from "../helpers/auth";
import Cookies from "js-cookie";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext();


export default function AuthContextProvider(props) {
  const [auth, setAuth] = useState(true);
  const [user, setUser] = useState({});
  const BASE_URL = process.env.REACT_APP_API_URL
  const navigate = useNavigate(); 

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
    setUser({})
    setAuth(false);
    Cookies.remove("authToken");
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, user, setUser, logout }} >
      {props.children}
    </AuthContext.Provider>
  )
}