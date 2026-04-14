import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { validateToken, removeAuthToken } from "../services/api-login";

const PrivateRoute = () => {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isValid = await validateToken();
        console.log("token é valido?", isValid);

        if (!isValid) {
          removeAuthToken();
        }

        setIsAuthenticated(isValid);
      } catch (error) {
        console.error("erro ao validar token", error);
        removeAuthToken();
        setIsAuthenticated(false);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (isCheckingAuth) {
    return <div className="text-white p-10">Verificando autenticação...</div>;
  }

  if (!isAuthenticated) {
    console.log("usuario nao autenticado. redirecionando para login");
    
    window.location.href = "http://localhost:4200/login";
    return null;
  }

  return <Outlet />;
};

export default PrivateRoute;
