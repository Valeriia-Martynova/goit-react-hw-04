import Modal from "react-modal";
import s from "./ImageModal.module.css";

Modal.setAppElement("#root");

const ImageModal = ({ isOpen, image, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}
      className={s.Modal}
      overlayClassName={s.Overlay}
    >
      <img
        src={image.urls.regular}
        alt={image.alt_description}
        className={s.Image}
      />
    </Modal>
  );
};

export default ImageModal;
