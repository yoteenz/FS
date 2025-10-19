import { useNavigate, type NavigateFunction } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import { useEffect } from "react";
import routes from "./config";

let navigateResolver: (navigate: NavigateFunction) => void;

declare global {
  interface Window {
    REACT_APP_NAVIGATE: NavigateFunction;
  }
}

export const navigatePromise = new Promise<NavigateFunction>((resolve) => {
  navigateResolver = resolve;
});

export function AppRoutes() {
  const navigate = useNavigate();
  const element = useRoutes(routes);
  
  useEffect(() => {
    try {
      if (!window.REACT_APP_NAVIGATE && navigate) {
        window.REACT_APP_NAVIGATE = navigate;
        if (navigateResolver) {
          navigateResolver(navigate);
        }
        console.log('Navigation system initialized successfully');
      }
    } catch (error) {
      console.error('Navigation initialization error:', error);
    }
  }, [navigate]);
  
  return element;
}