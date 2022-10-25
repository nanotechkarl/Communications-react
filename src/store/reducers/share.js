const INITIAL_STATE = {
  sharedToUser: [],
  sharedToOfFile: [],
};

const shareReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //#region - GET SHARED UPLOADS
    case "FETCH_SHARED_UPLOADS_REQUEST":
      return {
        ...state,
        loading: true,
        error: "",
      };

    case "FETCH_SHARED_UPLOADS_SUCCESS":
      return {
        ...state,
        loading: false,
        sharedToUser: action.payload,
        error: "",
      };

    case "FETCH_SHARED_UPLOADS_FAILURE":
      return {
        ...state,
        loading: false,
        error: "",
      };
    //#endregion

    //#region - GET SHAREDTO USERS OF FILE
    case "FETCH_SHAREDTO_FILE_REQUEST":
      return {
        ...state,
        loading: true,
        error: "",
      };
    case "FETCH_SHAREDTO_FILE_SUCCESS":
      return {
        ...state,
        loading: false,
        sharedToOfFile: action.payload,
        error: "",
      };
    case "FETCH_SHAREDTO_FILE_FAILURE":
      return {
        ...state,
        loading: false,
        error: "",
      };

    case "FETCH_SHAREDTO_FILE_CLEAR":
      return {
        ...state,
        loading: false,
        sharedToOfFile: [],
        error: "",
      };
    //#endregion

    //#region - SHARE
    case "SHARE_FILE_REQUEST":
      return {
        ...state,
        loading: true,
        error: "",
      };
    case "SHARE_FILE_SUCCESS":
      return {
        ...state,
        loading: false,
        error: "",
      };
    case "SHARE_FILE_FAILURE":
      return {
        ...state,
        loading: false,
        error: "",
      };
    //#endregion

    //#region - REMOVE USER SHARE
    case "REMOVE_SHARE_REQUEST":
      return {
        ...state,
        loading: true,
        error: "",
      };
    case "REMOVE_SHARE_SUCCESS":
      return {
        ...state,
        loading: false,
        error: "",
      };
    case "REMOVE_SHARE_FAILURE":
      return {
        ...state,
        loading: false,
        error: "",
      };
    //#endregion

    //#region - DELETE ALL USER'S SHAREDTO
    case "DELETE_SHARED_FILES_REQUEST":
      return {
        ...state,
        loading: false,
        error: "",
      };
    case "DELETE_SHARED_FILES_SUCCESS":
      return {
        ...state,
        loading: false,
        error: "",
      };
    case "DELETE_SHARED_FILES_FAILURE":
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

export default shareReducer;
