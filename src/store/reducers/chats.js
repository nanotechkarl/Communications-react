const INITIAL_STATE = {
  chats: [],
};

const chatsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //#region - FETCH CHATS
    case "FETCH_CHATS_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "FETCH_CHATS_SUCCESS":
      return {
        ...state,
        loading: false,
        chats: action.payload,
        error: "",
      };

    case "FETCH_CHATS_FAILURE":
      return {
        ...state,
        loading: false,
        chats: [],
        error: "",
      };
    //#endregion

    //#region - SEND CHAT
    case "SEND_CHAT_REQUEST":
      return {
        ...state,
        loading: false,
        error: "",
      };
    case "SEND_CHAT_SUCCESS":
      return {
        ...state,
        loading: false,
        chats: [...state.chats, action.payload],
        error: "",
      };
    case "SEND_CHAT_FAILURE":
      return {
        ...state,
        loading: false,
        error: "",
      };
    //#endregion

    //#region - DELETE CHATS
    case "DELETE_CHATS_REQUEST":
      return {
        ...state,
        loading: false,
        error: "",
      };
    case "DELETE_CHATS_SUCCESS":
      return {
        ...state,
        loading: false,
        error: "",
      };
    case "DELETE_CHATS_FAILURE":
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

export default chatsReducer;
