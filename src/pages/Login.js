import useForm from "../hooks/useForm";
import { loginUser } from "../store/actions/user";
import { pages, server } from "../utils/config";
import { useDispatch } from "react-redux";

export default function Login() {
  //#region - HOOKS
  const dispatch = useDispatch();
  //#endregion

  //#region - LOGIN
  const onSubmit = async (e) => {
    try {
      const { email, password } = values;
      const login = await dispatch(loginUser({ email, password }));
      if (login) {
        window.location.href = `${server.app}${pages.loginSuccess}`;
      } else {
        alert("Wrong email or password");
        return false;
      }
    } catch (error) {}
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
    <div className="centered form">
      <div className="header-div">
        <h4>
          <b>Login</b>
        </h4>
      </div>

      <div className="form-div">
        <form onSubmit={handleSubmit}>
          <div className="input-div">
            <div className="email-div">
              <label htmlFor="email">
                <b>Email</b>
              </label>
              <input
                className="input-text"
                type="text"
                id="email"
                name="email"
                placeholder="test@mail.com"
                autoComplete="on"
                onChange={handleChange}
              />
              {errors.email ? (
                <p className="input-error ms-2">{errors.email}</p>
              ) : (
                <p>&nbsp;</p>
              )}
            </div>

            <div className="password-div">
              <label htmlFor="password">
                <b>Password</b>
              </label>
              <input
                className="input-text"
                type="password"
                id="password"
                name="password"
                placeholder="******"
                autoComplete="on"
                onChange={handleChange}
              />
              {errors.password ? (
                <p className="input-error ms-5">{errors.password}</p>
              ) : (
                <p>&nbsp;</p>
              )}
            </div>
          </div>
          <div>
            <input className="button-primary" type="submit" value="Login" />
          </div>
        </form>
      </div>
    </div>
  );
}
