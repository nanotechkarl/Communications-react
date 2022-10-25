import "./styles/App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Welcome,
  Login,
  Register,
  Users,
  GroupChat,
  DocList,
  LoginSuccess,
  RegisterSuccess,
  EditUser,
  Share,
  Error,
} from "./pages/index";
import Navbar from "./components/navbar/Navbar";
import PrivateRoutes from "./utils/PrivateRoutes";
import PublicRoutes from "./utils/PublicRoutes";

const protectedRoutes = () => {
  return (
    <>
      <PrivateRoutes />
      <Navbar />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route index element={<Welcome />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="register-success" element={<RegisterSuccess />} />
          <Route path="logout" element={<Welcome logout="true" />} />
        </Route>
        <Route element={protectedRoutes()}>
          <Route path="login-success" element={<LoginSuccess />} />
          <Route path="users" element={<Users />} />
          <Route path="groupchat" element={<GroupChat />} />
          <Route path="doclist" element={<DocList />} />
          <Route path="edit-user" element={<EditUser />} />
          <Route exact path="share/:fileId" element={<Share />} />
        </Route>
        <Route>
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
