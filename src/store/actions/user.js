import axios from "axios";
import { server, getCookie, logout } from "../../utils/config";

//#region - AUTH
let token = getCookie("token");
let headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};
//#endregion

//#region - DISPATCH
const request = (type) => {
  return {
    type,
    isLoading: true,
  };
};

const success = (type, result) => {
  return {
    type,
    payload: result,
    isLoading: false,
  };
};

const failure = (type) => {
  return {
    type,
    isLoading: false,
  };
};

export const clear = (type) => {
  return {
    type,
    isLoading: false,
  };
};
//#endregion

//#region - GET
/**
 * Get logged in user object properties
 * @returns {object} - user object
 * */
export const getUserObject = () => {
  return async (dispatch) => {
    try {
      dispatch(request("CURRENT_USER_REQUEST"));
      const response = await axios.get(
        `${server.communicationsAPI}/users/property`,
        {
          headers,
        }
      );

      const result = response.data;
      dispatch(success("CURRENT_USER_SUCCESS", result));
      return result;
    } catch (error) {
      if (error && error.response.data.message === "User does not exist") {
        logout();
      }

      dispatch(failure("CURRENT_USER_FAILURE"));
    }
  };
};

/**
 * Get All Users
 * @returns {object<array>} users array
 */
export const getUsers = () => {
  return async (dispatch) => {
    try {
      dispatch(request("USERS_REQUEST"));
      const response = await axios.get(`${server.communicationsAPI}/users`, {
        headers,
      });
      const result = response.data;

      dispatch(success("USERS_SUCCESS", result));
      return result;
    } catch (error) {
      if (error && error.response.data.message === "User does not exist") {
        logout();
      }

      dispatch(failure("USERS_FAILURE"));
    }
  };
};

/**
 * Get user's properties
 *
 * @returns {object} user
 */
export const getUserById = ({ id }) => {
  return async (dispatch) => {
    try {
      dispatch(request("FETCH_USER_REQUEST"));
      const response = await axios.get(
        `${server.communicationsAPI}/users/property/${id}`,
        {
          headers,
        }
      );
      const result = response.data;

      dispatch(success("FETCH_USER_SUCCESS", result));
      return result;
    } catch (error) {
      if (error && error.response.data.message === "User does not exist") {
        logout();
      }
      dispatch(failure("FETCH_USER_FAILURE"));
    }
  };
};

//#endregion

//#region - LOGIN/REGISTER
/**
 * Login user and sets the token in cookies
 * @param {String} email
 * @param {String} password
 * @returns {bool}
 */
export const loginUser = ({ email, password }) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${server.communicationsAPI}/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      if (data.success === false) {
        return false;
      }

      document.cookie = `token=${data.result}; max-age=${60 * 60 * 24 * 14}`; //2 weeks
      return true;
    } catch (error) {}
  };
};

/**
 * Register new user
 * @param {String} fullName
 * @param {String} email
 * @param {String} password
 * @returns {Object}
 */
export const registerUser = ({ name, email, password }) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${server.communicationsAPI}/users/register`,
        { fullName: name, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.message === "User already exists") {
        alert("User already exists");
        return;
      }

      return response;
    } catch (error) {}
  };
};

//#endregion

//#region - EDIT/DELETE
/**
 * Update user information
 * @param {Number} id
 * @param {String} fullName
 * @param {String} email
 * @returns {Object}
 */
export const editUser = ({ id, fullName, email }) => {
  return async (dispatch) => {
    try {
      dispatch(request("EDIT_USER_REQUEST"));

      const response = await axios.put(
        `${server.communicationsAPI}/users/${id}`,
        { fullName, email },
        {
          headers,
        }
      );

      const result = response.data;

      dispatch(success("EDIT_USER_SUCCESS", result));
      return response;
    } catch (error) {
      if (error && error.response.data.message === "User does not exist") {
        logout();
      }
      dispatch(failure("EDIT_USER_FAILURE"));
    }
  };
};

/**
 * Delete user
 * @param {Number} id
 * @returns {Object}
 */
export const deleteUserById = (id) => {
  return async (dispatch) => {
    try {
      dispatch(request("DELETE_USER_REQUEST"));
      const response = await axios.delete(
        `${server.communicationsAPI}/users/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(success("DELETE_USER_SUCCESS"));
      return response;
    } catch (error) {
      if (error && error.response.data.message === "User does not exist") {
        logout();
      }
      dispatch(failure("DELETE_USER_FAILURE"));
    }
  };
};

//#endregion
