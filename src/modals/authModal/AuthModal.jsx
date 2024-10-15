"use client"
import React, { useState } from 'react';
import styles from './AuthModal.module.css';
import Link from 'next/link';

const AuthModal = ({ onClose }) => {
    const [isClosing, setIsClosing] = useState(false);

    const closeWithAnimation = (callback) => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            if (callback) callback();
        }, 500); // זמן השווה לזמן האנימציה ב-CSS
    };

    const handleClose = () => {
        closeWithAnimation(onClose);
    };

    const handleLogin = () => {
        closeWithAnimation(() => {
            onClose();
        });
    };

    return (
        <div className={`${styles.modalOverlay} ${isClosing ? styles.closing : ''}`}>
            <div className={styles.modal} dir='rtl'>
                <button className={styles.closeButton} onClick={handleClose}>×</button>
                <h3 style={{ fontWeight: "500" }}>?שנתחבר</h3>
                <p className={styles.title} >
                    כדי שתוכלו לשתף ולהגיב על המלצות 😉
                </p>
                <Link href="/login" className={styles.loginButton} onClick={handleLogin}>
                    <strong>להתחברות</strong>
                </Link>
            </div>
        </div>
    );
};

export default AuthModal;