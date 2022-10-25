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
 * Get user's shared uploads
 * @returns {Object}
 */
export const getSharedUploads = () => {
  return async (dispatch) => {
    try {
      dispatch(request("FETCH_SHARED_UPLOADS_REQUEST"));
      const response = await axios.get(
        `${server.communicationsAPI}/uploads/shared`,
        {
          headers,
        }
      );

      const result = response.data;
      if (result && result.message === "User does not exist") logout();

      dispatch(success("FETCH_SHARED_UPLOADS_SUCCESS", result));
      return result;
    } catch (error) {
      if (error && error.response.data.message === "User does not exist") {
        logout();
      }
      dispatch(failure("FETCH_SHARED_UPLOADS_FAILURE"));
    }
  };
};

/**
 * Get users that the file is shared to
 * @returns {Object}
 */
export const getSharedToOfFile = ({ fileId }) => {
  return async (dispatch) => {
    try {
      dispatch(request("FETCH_SHAREDTO_FILE_REQUEST"));

      const response = await axios.get(
        `${server.communicationsAPI}/uploads/shared/${fileId}`,
        {
          headers,
        }
      );
      const result = response.data;
      dispatch(success("FETCH_SHAREDTO_FILE_SUCCESS", result));
      return result;
    } catch (error) {
      if (error && error.response.data.message === "User does not exist") {
        logout();
      }

      dispatch(failure("FETCH_SHAREDTO_FILE_FAILURE"));
      if (
        error.response.data.success === false &&
        error.response.data.message ===
          "Cannot read properties of null (reading 'sharedTo')"
      ) {
        window.location.href = `${server.app}/users`;
      }
    }
  };
};
//#endregion

//#region - SHARE
/**
 * Shares the file to the user selected
 * @param {Number} shareToId
 * @param {Number} fileId
 * @returns {Object}
 */
export const shareFileToUser = ({ shareToId, fileId }) => {
  return async (dispatch) => {
    try {
      dispatch(request("SHARE_FILE_REQUEST"));
      const response = await axios.put(
        `${server.communicationsAPI}/uploads/${fileId}/share`,
        {
          id: parseInt(shareToId),
        },
        {
          headers,
        }
      );

      const result = response.data;

      dispatch(success("SHARE_FILE_SUCCESS", result));
      return result;
    } catch (error) {
      if (error && error.response.data.message === "User does not exist") {
        logout();
      }
      dispatch(failure("SHARE_FILE_FAILURE"));
    }
  };
};
//#endregion

//#region - DELETE
/**
 * Removes the user from upload sharing list
 * @param {Number} shareToId
 * @param {Number} fileId
 * @returns {Object}
 */
export const removeUserShare = ({ shareToId, fileId }) => {
  return async (dispatch) => {
    try {
      dispatch(request("REMOVE_SHARE_REQUEST"));
      const response = await axios.delete(
        `${server.communicationsAPI}/uploads/${fileId}/share/${shareToId}`,
        {
          headers,
        }
      );

      const result = response.data;

      dispatch(success("REMOVE_SHARE_SUCCESS", result));
      return result;
    } catch (error) {
      if (error && error.response.data.message === "User does not exist") {
        logout();
      }
      dispatch(failure("REMOVE_SHARE_FAILURE"));
    }
  };
};

/**
 * Delete all shared files to the user
 * @param {Number} id
 * @returns {Object}
 */
export const deleteUserAllSharedTo = (id) => {
  return async (dispatch) => {
    try {
      dispatch(request("DELETE_SHARED_FILES_REQUEST"));
      const response = await axios.delete(
        `${server.communicationsAPI}/uploads/user/${id}/shared`,
        {
          headers,
        }
      );

      const result = response.data;

      dispatch(success("DELETE_SHARED_FILES_SUCCESS", result));
      return response;
    } catch (error) {
      if (error && error.response.data.message === "User does not exist") {
        logout();
      }
      dispatch(failure("DELETE_SHARED_FILES_FAILURE"));
    }
  };
};

//#endregion
