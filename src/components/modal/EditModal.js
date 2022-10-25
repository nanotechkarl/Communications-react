import { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import useForm from "../../hooks/useForm";

export default function UploadModal(props) {
  //#region - PROPS
  const { onEdit, file, ...otherProps } = props;
  //#endregion

  //#region - INITIAL INPUT DISPLAY
  useEffect(() => {
    values.fileDescription = props.file.label;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //#endregion

  //#region - SAVE
  function validate() {
    if (values.fileDescription.length === 0) return;

    return {
      label: values.fileDescription,
    };
  }

  const onSubmit = async () => {
    const fileObject = validate();
    if (!fileObject) return;

    props.onHide();
    props.onEdit({
      fileId: props.file.fileId,
      label: fileObject.label,
    });
  };
  //#endregion

  //#region - CUSTOM HOOKS
  const { handleChange, values, errors, handleSubmit } = useForm({
    callback: onSubmit,
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
              defaultValue={props.file.label}
              className="file-description-text"
              type="text"
              id="file-description"
              name="fileDescription"
              placeholder="sample file..."
              onChange={handleChange}
            />
            {errors.fileDescription ? (
              <p className="input-error">{errors.fileDescription}</p>
            ) : (
              <p>&nbsp;</p>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="upload-footer">
            <div>
              <input
                className="button-primary mt-3"
                type="submit"
                value="Save"
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
