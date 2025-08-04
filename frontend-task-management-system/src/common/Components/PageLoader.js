import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth";
import { validateToken } from "../Services";
import LoadingSpinner from "./LoadingSpinner";

const PageLoader = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { login, logout } = useAuth();

  const checkAuthentication = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const { data } = await validateToken();

        if (data.status === 200) {
          login();

          const currentPath = window.location.pathname;
          if (currentPath === "/login" || currentPath === "/signUp") {
            navigate("/home");
          }
        } else {
          logout();
          const currentPath = window.location.pathname;
          const publicPaths = ["/login", "/signUp"];
          if (!publicPaths.includes(currentPath)) {
            navigate("/login");
          }
        }
      } else {
        logout();
        const currentPath = window.location.pathname;
        const publicPaths = ["/login", "/signUp"];
        if (!publicPaths.includes(currentPath)) {
          navigate("/login");
        }
      }
    } catch (error) {
      console.log("Token validation error:", error);
      logout();
      const currentPath = window.location.pathname;
      const publicPaths = ["/login", "/signUp"];
      if (!publicPaths.includes(currentPath)) {
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, [navigate, login, logout]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return children;
};

export default PageLoader;
