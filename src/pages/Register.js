import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useForm from "../hooks/useForm";
import { pages } from "../utils/config";
import { registerUser } from "../store/actions/user";

export default function Register() {
  //#region - HOOKS
  let navigate = useNavigate();
  const dispatch = useDispatch();
  //#endregion

  //#region - REGISTER
  const onSubmit = async (e) => {
    const { name, email, password, confirmPassword } = values;

    if (confirmPassword !== password) {
      alert("Password does not match");
      return false;
    }

    const register = await dispatch(registerUser({ email, password, name }));

    if (register) {
      navigate(pages.registerSuccess);
    }
  };
  //#endregion

  //#region - CUSTOM HOOKS
  const inputCount = 4;
  const { handleChange, values, errors, handleSubmit } = useForm({
    callback: onSubmit,
    inputCount,
    inputType: "register",
  });
  //#endregion

  return (
    <div className="centered form">
      <div className="header-div">
        <h4>
          <b>Register</b>
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
                className="input-text"
                type="text"
                id="name"
                name="name"
                placeholder="test name"
                onChange={handleChange}
              />
              {errors.name ? (
                <p className="input-error err-name">{errors.name}</p>
              ) : (
                <p>&nbsp;</p>
              )}
            </div>

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
                onChange={handleChange}
              />
              {errors.email ? (
                <p className="input-error err-email">{errors.email}</p>
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
                placeholder="*****"
                onChange={handleChange}
                autoComplete="on"
              />
              {errors.password ? (
                <p className="input-error err-password">{errors.password}</p>
              ) : (
                <p>&nbsp;</p>
              )}
            </div>

            <div className="confirm-password-div">
              <label htmlFor="confirm-password">
                <b>Confirm Password</b>
              </label>
              <input
                className="input-text"
                type="password"
                id="confirm-password"
                name="confirmPassword"
                placeholder="*****"
                onChange={handleChange}
              />
              {errors.confirmPassword ? (
                <p className="input-error err-confirm-password">
                  {errors.confirmPassword}
                </p>
              ) : (
                <p>&nbsp;</p>
              )}
            </div>
          </div>
          <div>
            <input className="button-primary" type="submit" value="Register" />
          </div>
        </form>
      </div>
    </div>
  );
}
