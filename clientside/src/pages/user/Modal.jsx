import React from 'react';
import styles from './Modal.module.css'; // Create a CSS module for styling

const Modal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null; // If the modal is not open, return null

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2>Confirmation</h2>
                <p>{message}</p>
                <div className={styles.buttonContainer}>
                    <button onClick={onConfirm} className={styles.btnConfirm}>Yes</button>
                    <button onClick={onClose} className={styles.btnCancel}>No</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
