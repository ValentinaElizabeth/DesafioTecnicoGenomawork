// confirmar modal
import { Modal, Button } from "react-bootstrap";

export default function ConfirmModal({ show, onClose, onConfirm, mensaje }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmación</Modal.Title>
      </Modal.Header>
      <Modal.Body>{mensaje || "¿Estás seguro?"}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
