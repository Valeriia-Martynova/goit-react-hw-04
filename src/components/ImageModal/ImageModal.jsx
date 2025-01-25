import s from "./ImageModal.module.css";
import Modal from "react-modal";

const ImageModal = ({ isOpen, image, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image Modal"
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
