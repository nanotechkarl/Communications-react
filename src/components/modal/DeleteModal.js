import Modal from "react-bootstrap/Modal";
import qmark from "../../assets/question-mark.png";

export default function DeleteModal(props) {
  const { handleDelete, ...modalProps } = props;

  return (
    <Modal {...modalProps} centered size="sm">
      <Modal.Header closeButton>
        <Modal.Title>Confirm User Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={qmark} alt="question"></img>
        <b>Are you sure ?</b>
      </Modal.Body>
      <Modal.Footer>
        <button className="button-primary" onClick={props.handleDelete}>
          ok
        </button>
        <button className="button-primary" onClick={props.onHide}>
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
}
