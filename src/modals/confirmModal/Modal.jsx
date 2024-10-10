import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p>{message}</p>
        <div className={styles.buttonContainer}>
          <button onClick={onConfirm} className={styles.confirmButton}>אישור</button>
          <button onClick={onClose} className={styles.cancelButton}>ביטול</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;