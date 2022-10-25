import { NavLink } from "react-router-dom";

export default function RegisterSuccess() {
  return (
    <div className="loginsuccess-page centered">
      <div className="header-nav-div">
        <h4>
          <b>Registration Successful</b>
        </h4>
      </div>

      <div className="content-div">
        <p>Thank you for your registration</p>
      </div>

      <div className="content-div">
        <NavLink to="/">
          <u>Click to return to home page</u>
        </NavLink>
      </div>
    </div>
  );
}
