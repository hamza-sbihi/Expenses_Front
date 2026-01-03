import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

type ProtectedRouteProps = {
    children: ReactNode;
};

export const ProtectedRoute = () => {
    const token = localStorage.getItem("token");
    if(!token){
       return  <Navigate to ="/login" replace/>;    
    }
    return <Outlet />;
  
}

