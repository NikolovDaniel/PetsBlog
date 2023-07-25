import { Modal, Button } from 'react-bootstrap';

const ErrorModal = ({ show, onClose, errorMessages }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Error!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;
