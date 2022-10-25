import { Link, useLocation } from "react-router-dom";
import { server } from "../../utils/config";

const Navbar = () => {
  const location = useLocation();

  const logout = () => {
    document.cookie = `token=;`;
    window.location.href = `${server.app}/logout`;
  };

  return (
    <>
      <nav className="tab">
        <Link to="/groupchat">
          <button
            id="groupchat-link"
            className={location.pathname === "/groupchat" ? "selected" : ""}
          >
            Group Chat
          </button>
        </Link>
        <Link to="/users">
          <button
            id="users-link"
            className={location.pathname === "/users" ? "selected" : "1"}
          >
            Manage Users
          </button>
        </Link>
        <Link to="/doclist">
          <button
            id="doclist-link"
            className={location.pathname === "/doclist" ? "selected" : ""}
          >
            Manage Docs
          </button>
        </Link>
        <Link>
          <button onClick={logout}>Logout</button>
        </Link>
      </nav>
    </>
  );
};

export default Navbar;
