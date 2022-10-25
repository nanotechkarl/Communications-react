import userReducer from "./user";
import chatsReducer from "./chats";
import shareReducer from "./share";
import uploadsReducer from "./uploads";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  users: userReducer,
  chats: chatsReducer,
  share: shareReducer,
  uploads: uploadsReducer,
});

export default allReducers;
