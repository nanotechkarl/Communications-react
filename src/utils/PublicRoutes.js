import { Outlet, Navigate } from "react-router-dom";
import { getCookie } from "./config";

const PublicRoutes = () => {
  const islogged = getCookie("token");
  return !islogged ? <Outlet /> : <Navigate to="/users" />;
};

export default PublicRoutes;
