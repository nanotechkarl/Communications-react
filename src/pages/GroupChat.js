import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import { getUserObjectbyId, server } from "../utils/config";
import { getUsers, getUserObject } from "../store/actions/user";
import { getChats, sendChatMessage } from "../store/actions/chats";

export default function GroupChat() {
  //#region - HOOKS
  const dispatch = useDispatch();
  const inputMessage = useRef("");
  const { chats } = useSelector(({ chats }) => chats || []);
  const { currentUser: user = {}, users = [] } = useSelector(
    ({ users }) => users || {}
  );

  //#endregion

  //#region - FETCH
  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    await dispatch(getUsers());
    await dispatch(getUserObject());
    // setInterval(() => {
    await dispatch(getChats());
    // }, 3000);
  };
  //#endregion

  //#region - SEND
  const sendChat = async () => {
    if (!inputMessage.current.value) {
      alert("Please enter message");
      return;
    }

    await dispatch(sendChatMessage(inputMessage.current.value));
    inputMessage.current.value = "";
  };
  //#endregion

  //#region -UTILS
  const getUsersName = (chat) => {
    const userObject = getUserObjectbyId(chat.id, users);
    if (userObject && userObject.fullName) return userObject.fullName;
  };

  const sendKeyPress = async (event) => {
    if (event.key === "Enter") {
      sendChat();
    }
  };

  const refresh = async () => {
    window.location.href = `${server.app}/groupchat`;
  };
  //#endregion

  //#region - RENDER
  const renderChat = () => {
    return (
      <div id="chat-history ">
        {chats.map((chat, i) => {
          return (
            <p key={i}>
              [{chat.date}] <b>{getUsersName(chat)}:</b> {chat.message}
            </p>
          );
        })}
      </div>
    );
  };

  const renderSendBox = () => {
    return (
      <>
        <span>
          <b id="chat-user">
            {user.fullName ? (
              user.fullName
            ) : (
              <Spinner animation="border" role="status" size="sm"></Spinner>
            )}
          </b>
        </span>
        <input
          ref={inputMessage}
          className="input-text"
          type="text"
          id="chat-message"
          name="chat-message"
          placeholder="Type your message here..."
          onKeyPress={sendKeyPress}
        />
        <div className="button-chat-div">
          <button className="button-primary send" id="send" onClick={sendChat}>
            Send
          </button>
          <button className="button-primary" onClick={refresh}>
            Refresh
          </button>
        </div>
      </>
    );
  };
  //#endregion

  return (
    <div className="groupchat-page">
      <div className="header-nav-div">
        <div>
          <h4 className="header-label">Group Chat</h4>

          <div className="button-close">X</div>
        </div>
      </div>
      <div className="chat-history">{renderChat()}</div>
      <div className="message-content">{renderSendBox()}</div>
    </div>
  );
}
