import React from 'react';
import styles from './AuthModal.module.css';
import Link from 'next/link';

const handleLogin = () => {
    onClose(); 
  };

const AuthModal = ({ onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h3>?שנתחבר</h3>
        <p className={styles.title} >גם ניכר אותך טוב יותר וגם תיפתח לך גישה מהירה ופשוטה לכל האפשרויות והפיצ'רים שלנו</p>
        <Link href="/login" className={styles.loginButton} onClick={handleLogin}>
          להתחברות
        </Link>
      </div>
    </div>
  );
};

export default AuthModal;