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
/** Get all uploads
 *
 * @returns {object} uploads
 */
export const getUploads = () => {
  return async (dispatch) => {
    try {
      dispatch(request("FETCH_UPLOADS_REQUEST"));
      const response = await axios.get(`${server.communicationsAPI}/uploads`, {
        headers,
      });
      const result = response.data;
      if (result && result.message === "User does not exist") logout();

      dispatch(success("FETCH_UPLOADS_SUCCESS", result));
      return result;
    } catch (error) {
      if (error && error.response.data.message === "User does not exist") {
        logout();
      }
      dispatch(failure("FETCH_UPLOADS_FAILURE"));
    }
  };
};

/**
 * Get user's uploads
 * @returns {Object}
 */
export const getMyUploads = () => {
  return async (dispatch) => {
    try {
      dispatch(request("FETCH_MYUPLOADS_REQUEST"));
      const response = await axios.get(
        `${server.communicationsAPI}/uploads/owned`,
        {
          headers,
        }
      );
      const result = response.data;

      dispatch(success("FETCH_MYUPLOADS_SUCCESS", result));
      return result;
    } catch (error) {
      if (error && error.response.data.message === "User does not exist") {
        logout();
      }
      dispatch(failure("FETCH_MYUPLOADS_FAILURE"));
    }
  };
};
//#endregion

//#region - UPDATE
/**
 * Save uploaded file description
 *
 * @param {String} id
 * @param {String} file
 * @param {String} key
 * @returns {object}
 */
export const saveFileDescription = ({ label, file, key }) => {
  return async (dispatch) => {
    try {
      dispatch(request("SAVE_FILE_REQUEST"));
      const response = await axios.post(
        `${server.communicationsAPI}/uploads/file`,
        {
          label,
          file,
          key,
        },
        {
          headers,
        }
      );
      const result = await response.data;

      dispatch(success("SAVE_FILE_SUCCESS", result));
      return result;
    } catch (error) {
      if (error && error.response.data.message === "User does not exist") {
        logout();
      }
      dispatch(failure("SAVE_FILE_FAILURE"));
    }
  };
};

/**
 * Edit uploaded File
 *
 * @param {Number} id
 * @param {String} label
 * @returns {object}
 */
export const editFile = ({ id, label }) => {
  return async (dispatch) => {
    try {
      dispatch(request("EDIT_FILE_REQUEST"));
      const response = await axios.put(
        `${server.communicationsAPI}/uploads/${id}`,
        { label },
        {
          headers,
        }
      );
      const result = await response.data;

      dispatch(success("EDIT_FILE_SUCCESS", result));
      return result;
    } catch (error) {
      if (error && error.response.data.message === "User does not exist") {
        logout();
      }
      dispatch(failure("EDIT_FILE_FAILURE"));
    }
  };
};
//#endregion

//#region - DELETE
/**
 * Delete uploaded File
 *
 * @param {Number} id
 * @returns {object}
 */
export const deleteFileUpload = (id) => {
  return async (dispatch) => {
    try {
      dispatch(request("DELETE_FILE_REQUEST"));
      const response = await axios.delete(
        `${server.communicationsAPI}/uploads/${id}`,
        {
          headers,
        }
      );
      const result = await response.data;

      dispatch(success("DELETE_FILE_SUCCESS", result));
      return result;
    } catch (error) {
      if (error && error.response.data.message === "User does not exist") {
        logout();
      }
      dispatch(failure("DELETE_FILE_FAILURE"));
    }
  };
};

/**
 * Delete all uploads of the user
 * @param {Number} id
 * @returns {Object}
 */
export const deleteUploads = (id) => {
  return async (dispatch) => {
    try {
      dispatch(request("DELETE_FILES_REQUEST"));
      const response = await axios.delete(
        `${server.communicationsAPI}/uploads/user/${id}`,
        {
          headers,
        }
      );

      const result = response.data;
      dispatch(success("DELETE_FILES_SUCCESS", result));
      return result;
    } catch (error) {
      if (error && error.response.data.message === "User does not exist") {
        logout();
      }
      dispatch(failure("DELETE_FILES_FAILURE"));
    }
  };
};
//#endregion

//#region - UP/DOWNLOAD
/**
 * Download uploaded files
 *
 * @param {String} file
 * @param {String} fileName
 */
export const download = ({ file, fileName }) => {
  return async (dispatch) => {
    try {
      dispatch(request("DOWNLOAD_FILE_REQUEST"));
      axios({
        url: `${server.communicationsAPI}/uploads/download/${file}`,
        method: "GET",
        responseType: "blob", // important
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${fileName}`);
        document.body.appendChild(link);
        link.click();
      });

      dispatch(success("DOWNLOAD_FILE_SUCCESS"));
    } catch (error) {
      if (error && error.response.data.message === "User does not exist") {
        logout();
      }
      dispatch(failure("DOWNLOAD_FILE_FAILURE"));
    }
  };
};

/**
 * Saves uploaded file to the server
 *
 * @param {Object} formData
 * @returns {Object}
 */
export const fileUpload = (formData) => {
  return async (dispatch) => {
    try {
      dispatch(request("UPLOAD_FILE_REQUEST"));
      const response = await axios.post(
        `${server.communicationsAPI}/uploads/file/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.data;

      dispatch(success("UPLOAD_FILE_SUCCESS"));
      return result;
    } catch (error) {
      if (error && error.response.data.message === "User does not exist") {
        logout();
      }
      dispatch(failure("UPLOAD_FILE_FAILURE"));
    }
  };
};
//#endregion
