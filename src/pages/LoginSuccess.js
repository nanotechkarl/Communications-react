import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserObject } from "../store/actions/user";

export default function LoginSuccess() {
  //#region - STATES
  const dispatch = useDispatch();
  const currentUser = useSelector(({ users }) => users.currentUser || "");
  //#endregion

  //#region - FETCH
  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    await dispatch(getUserObject());
  };
  //#endregion

  return (
    <div className="loginsuccess-page centered">
      <div className="header-nav-div">
        <h4>
          <b>Login Successful</b>
        </h4>
      </div>
      <div className="content-div">
        <p>
          <b>Welcome !</b> <span id="user-email">{currentUser.email}</span>
        </p>
      </div>
    </div>
  );
}
