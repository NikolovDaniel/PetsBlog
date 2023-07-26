import { Modal, Button } from 'react-bootstrap';

const SuccessModal = ({ show, onClose, message }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Success!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
       {message}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SuccessModal;
