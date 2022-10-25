import { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import useForm from "../../hooks/useForm";
import { fileUpload, saveFileDescription } from "../../store/actions/uploads";
import { useDispatch } from "react-redux";

export default function UploadModal(props) {
  //#region - HOOKS
  const dispatch = useDispatch();
  const { onUpload, ...otherProps } = props;

  useEffect(() => {
    values.fileDescription = "";
    values.myFile = "";
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  //#endregion

  //#region - UPLOAD
  function validate() {
    if (values.fileDescription.length === 0) {
      alert("Please enter file description");
      return;
    } else if (values.myFile.length === 0) {
      alert("Please select file");
      return;
    }

    const splitPath = values.myFile.split("\\");
    const file = splitPath[splitPath.length - 1];

    return {
      label: values.fileDescription,
      file,
    };
  }

  const onSubmit = async () => {
    const fileObject = validate();
    if (!fileObject) return;

    let formData = new FormData();
    formData.append("file", document.getElementById("myFile").files[0]);
    formData.append("label", fileObject.label);
    const uploaded = await dispatch(fileUpload(formData));

    if (uploaded && uploaded.success) {
      await dispatch(
        saveFileDescription({
          label: fileObject.label,
          file: fileObject.file,
          key: uploaded.data,
        })
      );
      props.onHide();
      props.onUpload();
    }
  };
  //#endregion

  //#region - CUSTOM HOOKS
  const inputCount = 2;
  const { handleChange, values, handleSubmit } = useForm({
    callback: onSubmit,
    inputCount,
    inputType: "addUpload",
  });
  //#endregion

  return (
    <Modal {...otherProps} centered>
      <Modal.Header closeButton>
        <Modal.Title>Upload</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="modal-upload">
            <b>File Description: &nbsp;</b>
            <input
              className="file-description-text"
              type="text"
              id="file-description"
              name="fileDescription"
              placeholder="sample file..."
              onChange={handleChange}
            />
            <div className="file-upload-div">
              <b className="file-upload-label">File Upload: &nbsp;</b>
              <input
                type="file"
                className="myFile"
                id="myFile"
                name="myFile"
                onChange={handleChange}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="upload-footer">
            <div>
              <input
                className="button-primary mt-3 button-upload"
                type="submit"
                value="Upload Now"
              />
              <button
                type="button"
                className="button-primary mt-3 m-3"
                onClick={props.onHide}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
