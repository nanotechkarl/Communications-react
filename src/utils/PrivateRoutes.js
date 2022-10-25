import { Outlet, Navigate } from "react-router-dom";
import { getCookie } from "./config";

const PrivateRoutes = () => {
  const islogged = getCookie("token");
  return islogged ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
