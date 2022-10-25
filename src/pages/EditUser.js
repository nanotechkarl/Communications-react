import React, { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useForm from "../hooks/useForm";
import { pages } from "../utils/config";
import { getUserById, clear, editUser, getUsers } from "../store/actions/user";

export default function EditUser() {
  //#region - HOOKS
  const dispatch = useDispatch();
  let nameRef = useRef();
  let emailRef = useRef();
  let navigate = useNavigate();
  const search = useLocation().search;
  const userId = new URLSearchParams(search).get("id");
  const { userSelected: user = {}, users = [] } = useSelector(
    ({ users }) => users || []
  );
  //#endregion

  //#region - FETCH
  useEffect(() => {
    fetchData();

    return () => {
      dispatch(clear("FETCH_USER_CLEAR"));
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    await dispatch(getUsers());
    await dispatch(getUserById({ id: userId }));

    values.email = user.email; //? Set initial state
    values.name = user.fullName;
  };
  //#endregion

  //#region - SAVE
  const onSubmit = async (e) => {
    const { email, name } = values;

    const filtered = users.filter(
      ({ id }) => parseInt(id) !== parseInt(userId)
    );
    const found = filtered.find((user) => user.email === email);

    if (found) {
      alert("Email exist in the database");
      return false;
    }

    const saved = await dispatch(
      editUser({ email, fullName: name, id: userId })
    );

    if (saved) {
      navigate(pages.usersList);
    } else {
      alert("Wrong email or password");
      return false;
    }
  };
  //#endregion

  //#region - CUSTOM HOOKS
  const inputCount = 2;
  const { handleChange, values, errors, handleSubmit } = useForm({
    callback: onSubmit,
    inputCount,
  });
  //#endregion

  return (
    <div className="centered form edituser-page">
      <div className="header-nav-div">
        <h4>
          <b>Edit User Information</b>
        </h4>
      </div>
      <div className="form-div">
        <form onSubmit={handleSubmit}>
          <div className="input-div">
            <div className="name-div">
              <label htmlFor="name">
                <b>Full Name</b>
              </label>
              <input
                ref={nameRef}
                defaultValue={user.fullName}
                className="input-text"
                type="text"
                id="name"
                name="name"
                onInput={handleChange}
              />
              {errors.name ? (
                <p className="input-error edit-name">{errors.name}</p>
              ) : (
                <p>&nbsp;</p>
              )}
            </div>

            <div className="email-div">
              <label htmlFor="email">
                <b>Email</b>
              </label>
              <input
                ref={emailRef}
                defaultValue={user.email}
                className="input-text"
                type="text"
                id="email"
                name="email"
                onInput={handleChange}
              />
              {errors.email ? (
                <p className="input-error edit-email">{errors.email}</p>
              ) : (
                <p>&nbsp;</p>
              )}
            </div>
          </div>
          <div>
            <input className="button-primary" type="submit" value="Save" />
          </div>
        </form>
      </div>
    </div>
  );
}
