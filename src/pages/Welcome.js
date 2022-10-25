import { NavLink } from "react-router-dom";

export default function Welcome({ logout }) {
  return (
    <div className="centered welcome-page">
      <div className="header-welcome-div">
        <h2>
          <b>Welcome to Users Module</b>
        </h2>
      </div>
      <div className="existing-user-div">
        <div>
          <b>Existing Users</b>
        </div>
        <div className="button-div">
          <NavLink to="/login">
            <button className="button-primary">Login</button>
          </NavLink>
        </div>
      </div>

      <div className="new-user-div">
        <div>
          <b>New Users</b>
        </div>
        <div className="button-div">
          <NavLink to="/register">
            <button className="button-primary">Register</button>
          </NavLink>
        </div>
      </div>
      {logout ? (
        <div className="logout-message">
          <b>You have been logged out</b>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
