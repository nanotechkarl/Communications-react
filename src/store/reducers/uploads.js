const INITIAL_STATE = {
  myUploads: [],
};

const uploadsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //#region - GET UPLOADS
    case "FETCH_UPLOADS_REQUEST":
      return {
        ...state,
        loading: true,
        error: "",
      };

    case "FETCH_UPLOADS_SUCCESS":
      return {
        ...state,
        loading: false,
        error: "",
      };

    case "FETCH_UPLOADS_FAILURE":
      return {
        ...state,
        loading: false,
        error: "",
      };
    //#endregion

    //#region - GET MYUPLOADS
    case "FETCH_MYUPLOADS_REQUEST":
      return {
        ...state,
        loading: true,
        error: "",
      };

    case "FETCH_MYUPLOADS_SUCCESS":
      return {
        ...state,
        loading: false,
        myUploads: action.payload,
        error: "",
      };

    case "FETCH_MYUPLOADS_FAILURE":
      return {
        ...state,
        loading: false,
        error: "",
      };
    //#endregion

    //#region - SAVE FILE DESCRIPTIOn
    case "SAVE_FILE_REQUEST":
      return {
        ...state,
        loading: true,
        error: "",
      };

    case "SAVE_FILE_SUCCESS":
      return {
        ...state,
        loading: false,
        error: "",
      };

    case "SAVE_FILE_FAILURE":
      return {
        ...state,
        loading: false,
        error: "",
      };
    //#endregion

    //#region - EDIT FILE DESCRIPTION
    case "EDIT_FILE_REQUEST":
      return {
        ...state,
        loading: true,
        error: "",
      };

    case "EDIT_FILE_SUCCESS":
      return {
        ...state,
        loading: false,
        error: "",
      };

    case "EDIT_FILE_FAILURE":
      return {
        ...state,
        loading: false,
        error: "",
      };
    //#endregion

    //#region - DELETE FILE
    case "DELETE_FILE_REQUEST":
      return {
        ...state,
        loading: true,
        error: "",
      };

    case "DELETE_FILE_SUCCESS":
      return {
        ...state,
        loading: false,
        error: "",
      };

    case "DELETE_FILE_FAILURE":
      return {
        ...state,
        loading: false,
        error: "",
      };
    //#endregion

    //#region - DELETE FILES OF USER
    case "DELETE_FILES_REQUEST":
      return {
        ...state,
        loading: true,
        error: "",
      };

    case "DELETE_FILES_SUCCESS":
      return {
        ...state,
        loading: false,
        error: "",
      };

    case "DELETE_FILES_FAILURE":
      return {
        ...state,
        loading: false,
        error: "",
      };
    //#endregion

    //#region - DOWNLOAD FILE
    case "DOWNLOAD_FILE_REQUEST":
      return {
        ...state,
        loading: true,
        error: "",
      };

    case "DOWNLOAD_FILE_SUCCESS":
      return {
        ...state,
        loading: false,
        error: "",
      };

    case "DOWNLOAD_FILE_FAILURE":
      return {
        ...state,
        loading: false,
        error: "",
      };
    //#endregion

    //#region - UPLOAD FILE
    case "UPLOAD_FILE_REQUEST":
      return {
        ...state,
        loading: true,
        error: "",
      };

    case "UPLOAD_FILE_SUCCESS":
      return {
        ...state,
        loading: false,
        error: "",
      };

    case "UPLOAD_FILE_FAILURE":
      return {
        ...state,
        loading: false,
        error: "",
      };
    //#endregion

    default:
      return state;
  }
};

export default uploadsReducer;
