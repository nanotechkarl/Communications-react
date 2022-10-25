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

//#endregion

//#region - GET
/**
 * Get All chat history
 * @returns {Object<Array>}
 */
export const getChats = () => {
  return async (dispatch) => {
    try {
      dispatch(request("FETCH_CHATS_REQUEST"));
      const response = await axios.get(`${server.communicationsAPI}/chats`, {
        headers,
      });

      const result = response.data;
      if (result && result.message === "User does not exist") logout();

      dispatch(success("FETCH_CHATS_SUCCESS", result));
      return result;
    } catch (error) {
      if (error && error.response.data.message === "User does not exist") {
        logout();
      }
      dispatch(failure("FETCH_CHATS_FAILURE"));
    }
  };
};
//#endregion

//#region - SEND
/**
 * Send chat message
 * @param {String} message
 * @returns {Object}
 */
export const sendChatMessage = (message) => {
  return async (dispatch) => {
    try {
      dispatch(request("SEND_CHAT_REQUEST"));

      const response = await axios.post(
        `${server.communicationsAPI}/chats`,
        { message },
        {
          headers,
        }
      );

      const result = response.data;

      dispatch(success("SEND_CHAT_SUCCESS", result));
      return response;
    } catch (error) {
      if (error && error.response.data.message === "User does not exist") {
        logout();
      }
      dispatch(failure("SEND_CHAT_FAILURE"));
    }
  };
};
//#endregion

//#region - DELETE
/**
 * Delete all chats of the user
 * @param {Number} id
 * @returns {Object}
 */
export const deleteChats = (id) => {
  return async (dispatch) => {
    try {
      dispatch(request("DELETE_CHATS_REQUEST"));

      const response = await axios.delete(
        `${server.communicationsAPI}/chats/${id}`,
        {
          headers,
        }
      );

      dispatch(success("DELETE_CHATS_SUCCESS"));
      return response;
    } catch (error) {
      if (error && error.response.data.message === "User does not exist") {
        logout();
      }
      dispatch(failure("DELETE_CHATS_FAILURE"));
    }
  };
};
//#endregion
