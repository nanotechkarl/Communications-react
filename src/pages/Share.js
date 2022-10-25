import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Table from "../components/table/Table";
import DeleteModal from "../components/modal/DeleteModal";
import { getUserObjectbyId } from "../utils/config";
import { getUsers, getUserObject } from "../store/actions/user";
import { getMyUploads } from "../store/actions/uploads";
import {
  getSharedToOfFile,
  shareFileToUser,
  removeUserShare,
  clear,
} from "../store/actions/share";

export default function Share() {
  //#region - HOOKS
  const dispatch = useDispatch();
  const { currentUser = {}, users = [] } = useSelector(
    ({ users }) => users || []
  );
  const myUploads = useSelector(({ uploads }) => uploads.myUploads || []);
  const fileId = useLocation().pathname.split("/").at(-1);
  const [sharedToUsersCount, setSharedToUsersCount] = useState(0);
  const [sharedToUsers, setSharedToUsers] = useState([]);
  const [dropDown, setDropDown] = useState([]);
  const [dropDownValue, setDropDownValue] = useState(null);
  const [lastAddedSharedToUser, setLastAddedSharedToUser] = useState({});
  const [deleteModalState, setDeleteModalState] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [lastDeletedSharedToUser, setLastDeletedSharedToUser] = useState({});
  const [currentUserAvailable, setCurrentUserAvailable] = useState(false);
  //#endregion

  //#region - FETCH
  useEffect(() => {
    fetchData();

    return () => {
      dispatch(clear("FETCH_SHAREDTO_FILE_CLEAR"));
    };
  }, [lastAddedSharedToUser, lastDeletedSharedToUser, currentUserAvailable]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    const fetchUsers = await dispatch(getUsers());
    await dispatch(getUserObject());
    setCurrentUserAvailable(true);

    await dispatch(getMyUploads());
    const fetchSharedTo = await dispatch(getSharedToOfFile({ fileId }));
    const sharedToNames = fetchSharedTo.map(({ id }) => {
      return { name: getUserObjectbyId(parseInt(id), fetchUsers).fullName, id };
    });

    // Dropdown selection
    const sharedToId = fetchSharedTo.map(({ id }) => {
      return id;
    });

    const notSelf = fetchUsers
      // eslint-disable-next-line array-callback-return
      .map((user) => {
        if (user.id !== currentUser.id) {
          return user.id;
        }
      })
      .filter((obj) => obj != null);

    const res = notSelf.filter((item) => !sharedToId.includes(item));
    const filteredDropDown = res;

    setSharedToUsers(sharedToNames);
    setSharedToUsersCount(sharedToNames.length);
    setDropDown(filteredDropDown);
  };

  //#region - ADD ShareTo
  const addUser = async (e) => {
    e.preventDefault();

    if (!dropDownValue) {
      alert("Please select user");
      return;
    }

    const result = await dispatch(
      shareFileToUser({
        shareToId: dropDownValue,
        fileId,
      })
    );

    setLastAddedSharedToUser(result);
  };
  //#endregion

  const selectUser = async (id) => {
    setDropDownValue(id);
  };
  //#endregion

  //#region - DELETE
  const showDelete = async (account) => {
    setDeleteModalState(true);
    setDeleteAccount(account);
  };

  const remove = async (user) => {
    const result = await dispatch(
      removeUserShare({
        shareToId: user.id,
        fileId,
      })
    );

    setLastDeletedSharedToUser(result);
    setDeleteModalState(false);
  };
  //#endregion

  //#region - RENDER
  const renderEmptyRow = (count) => {
    const emptyRows = 4;
    if (emptyRows - count > 0) {
      return [...Array(emptyRows - count)].map((rows, i) => (
        <tr key={i}>
          <td></td>
          <td></td>
        </tr>
      ));
    }
  };
  //#endregion

  return (
    <div className="share-page" id="share-page">
      <div className="header-nav-div">
        <div>
          <h4>
            <b>
              Upload Sharing :{" "}
              {myUploads.length &&
                myUploads.find((obj) => obj.fileId === fileId).file}
            </b>
            <span id="file-name"></span>
          </h4>
        </div>
      </div>

      <div id="sharing-table-div">
        <Table
          header={["Shared User"]}
          keys={["name"]}
          data={sharedToUsers}
          onRemove={showDelete}
          customRender={renderEmptyRow(sharedToUsersCount)}
        />
      </div>

      <div className="header-shared-div">
        <div>
          <h4>
            <b>Add Sharing</b>
          </h4>
        </div>
      </div>

      <div className="choose-user-div">
        <form>
          <label htmlFor="select-users">
            <b>Choose User : &nbsp;</b>
          </label>
          <select
            name="select-users"
            id="select-users"
            onChange={(e) => selectUser(e.target.value)}
          >
            <option value="">- Select User -</option>
            {dropDown.map((id) => {
              return (
                <option key={id} value={id}>
                  {getUserObjectbyId(id, users).fullName}
                </option>
              );
            })}
          </select>
          &nbsp;
          <input
            type="submit"
            className="button-primary add-share"
            value="Add Share"
            onClick={(e) => addUser(e)}
          />
        </form>
      </div>
      <DeleteModal
        onHide={() => setDeleteModalState(false)}
        handleDelete={() => remove(deleteAccount)}
        show={deleteModalState}
        account={deleteAccount}
      />
    </div>
  );
}
