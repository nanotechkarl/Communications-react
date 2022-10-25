const INITIAL_STATE = {
  users: [],
  currentUser: {},
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //#region - USERS
    case "USERS_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "USERS_SUCCESS":
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: "",
      };

    case "USERS_FAILURE":
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload,
      };
    //#endregion

    //#region - CURRENT USER
    case "CURRENT_USER_REQUEST":
      return {
        ...state,
        loading: true,
        error: "",
      };

    case "CURRENT_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
        error: "",
      };

    case "CURRENT_USER_FAILURE":
      return {
        ...state,
        loading: false,
        currentUser: {},
        error: "",
      };
    //#endregion

    //#region - FETCH USER
    case "FETCH_USER_REQUEST":
      return {
        ...state,
        loading: true,
        error: "",
      };

    case "FETCH_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        userSelected: action.payload,
        error: "",
      };

    case "FETCH_USER_FAILURE":
      return {
        ...state,
        loading: false,
        userSelected: {},
        error: "Failed to fetch user by ID",
      };

    case "FETCH_USER_CLEAR":
      return {
        ...state,
        loading: false,
        userSelected: {},
        error: "",
      };
    //#endregion

    //#region - EDIT USER
    case "EDIT_USER_REQUEST":
      return {
        ...state,
        loading: true,
        error: "",
      };

    case "EDIT_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        error: "",
      };

    case "EDIT_USER_FAILURE":
      return {
        ...state,
        loading: false,
        error: "",
      };

    //#endregion

    //#region - DELETE USER
    case "DELETE_USER_REQUEST":
      return {
        ...state,
        loading: true,
        error: "",
      };

    case "DELETE_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        error: "",
      };

    case "DELETE_USER_FAILURE":
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

export default userReducer;
