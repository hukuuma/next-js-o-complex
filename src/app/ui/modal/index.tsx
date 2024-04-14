import React from 'react';
import PrimaryButton from '../buttons/primary-button'; 
import styles from './styles.module.css';

type Props = {
  success: boolean;
  message: string;
  onClose?: () => void;
}

const  ModalResult: React.FC<Props> = ({ success, message, onClose }) => {
    return (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.modalTitle}>
            <h2>{success? "Success" : "Error"}</h2>
          </div>
          <div className={styles.modalMessage}>
            <p>{message}</p>
          </div>
          <PrimaryButton text='Close' onClick={onClose}/>
        </div>
      </div>
    )
}

export default ModalResult;