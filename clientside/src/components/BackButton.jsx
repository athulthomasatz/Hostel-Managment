import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './backButton.module.css';

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <button 
            className={styles.backButton}
            onClick={() => navigate(-1)}
            aria-label="Go back"
        >
            ← Back
        </button>
    );
};

export default BackButton; 