import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useDidMountEffect from "../hooks/useDidMountEffect";
import Table from "../components/table/Table";
import UploadModal from "../components/modal/UploadModal";
import DeleteModal from "../components/modal/DeleteModal";
import EditModal from "../components/modal/EditModal";
import { getUserObjectbyId } from "../utils/config";
import { getUsers } from "../store/actions/user";
import { getSharedUploads } from "../store/actions/share";
import {
  getMyUploads,
  deleteFileUpload,
  editFile,
  download,
} from "../store/actions/uploads";

export default function DocList() {
  //#region - HOOKS
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector(({ users }) => users.users || []);
  const sharedUploads = useSelector(({ share }) => share.sharedToUser || []);
  const myUploads = useSelector(({ uploads }) => uploads.myUploads || []);
  const [myUploadsCount, setMyUploadsCount] = useState(0);
  const [sharedUploadsCount, setSharedUploadsCount] = useState(0);
  const [uploadModalState, setUploadModalState] = useState(false);
  const [editedFile, seteditedFile] = useState({});
  const [lastEditedFile, setLastEditedFile] = useState({});
  const [editModalState, setEditModalState] = useState(false);
  const [deleteFile, setdeleteFile] = useState({});
  const [deleteModalState, setDeleteModalState] = useState(false);
  //#endregion

  //#region - FETCH
  useEffect(() => {
    fetchData();
  }, [lastEditedFile]); // eslint-disable-line react-hooks/exhaustive-deps

  useDidMountEffect(() => {
    fetchData();
  }, [myUploadsCount]);

  const fetchData = async () => {
    await dispatch(getUsers());
    const fetchSharedUploads = await dispatch(getSharedUploads());
    await dispatch(getMyUploads());

    setSharedUploadsCount(fetchSharedUploads.length);
  };
  //#endregion

  //#region - ADD UPLOAD
  const showUpload = async () => {
    setUploadModalState(true);
  };
  //#endregion

  //#region - DOWNLOAD
  const downloadFile = (e) => {
    const fileURL = `${e.file}-${e.fileId.split("FILE_")[1]}`;
    dispatch(
      download({
        file: fileURL,
        fileName: e.file,
      })
    );
    return;
  };
  //#endregion

  //#region - EDIT UPLOAD
  const showEdit = async (file) => {
    seteditedFile(file);
    setEditModalState(true);
  };

  const updateFile = async (file) => {
    const savedFile = await dispatch(
      editFile({
        id: file.fileId,
        label: file.label,
      })
    );
    setLastEditedFile(savedFile);
  };
  //#endregion

  //#region - SHARE UPLOAD
  const redirectShare = async (file) => {
    navigate(`/share/${file.fileId}`);
  };
  //#endregion

  //#region - DELETE UPLOAD
  const showDelete = async (file) => {
    setDeleteModalState(true);
    setdeleteFile(file);
  };

  const confirmDelete = async () => {
    const deleteFileId = deleteFile.fileId;
    if (!deleteFileId) return;
    const deletedFile = await dispatch(deleteFileUpload(deleteFileId));

    if (!deletedFile) return;
    setDeleteModalState(false);
    setMyUploadsCount((prev) => prev - 1);
  };
  //#endregion

  //#region - UTILS
  const usersEmail = (file) => {
    const userObj = getUserObjectbyId(file.id, users);
    if (userObj && userObj.email) return userObj.email;
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
          <td></td>
        </tr>
      ));
    }
  };

  const renderModals = () => {
    return (
      <>
        <UploadModal
          onHide={() => setUploadModalState(false)}
          onUpload={() => setMyUploadsCount((prev) => prev + 1)}
          show={uploadModalState}
        />
        <EditModal
          onHide={() => setEditModalState(false)}
          onEdit={updateFile}
          show={editModalState}
          file={editedFile}
        />
        <DeleteModal
          onHide={() => setDeleteModalState(false)}
          handleDelete={confirmDelete}
          show={deleteModalState}
        />
      </>
    );
  };

  const myUploadsTable = () => {
    return (
      <>
        <div className="header-nav-div ms-3">
          <h4>
            <b>My Uploads</b>
          </h4>
        </div>

        <div id="my-uploads-div">
          <Table
            header={["Label", "File Name"]}
            keys={["label", "file"]}
            data={myUploads}
            onEdit={showEdit}
            onDelete={showDelete}
            fileDownload={downloadFile}
            onShare={redirectShare}
            customRender={renderEmptyRow(myUploadsCount)}
          />
        </div>
      </>
    );
  };

  const sharedUploadsTable = () => {
    return (
      <>
        <div className="header-shared-div">
          <h4>
            <b>Shared Uploads</b>
          </h4>
        </div>

        <div id="shared-uploads-div">
          <Table
            header={["Label", "File Name", "Shared By"]}
            keys={["label", "file", "id"]}
            data={sharedUploads}
            custom={{ usersEmail }}
            fileDownload={downloadFile}
            customRender={renderEmptyRow(sharedUploadsCount)}
          />
        </div>
      </>
    );
  };

  //#endregion

  return (
    <div className="doclist-page">
      {myUploadsTable()}
      {sharedUploadsTable()}
      <div>
        <button className="button-primary button-blue" onClick={showUpload}>
          + Add Upload
        </button>
      </div>
      {renderModals()}
    </div>
  );
}
