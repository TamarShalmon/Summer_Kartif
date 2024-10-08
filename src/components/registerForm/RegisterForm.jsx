"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from "./registerForm.module.css";

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("כל השדות הכרחיים.");
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push('/login');
      } else {
        const data = await res.json();
        throw new Error(data.message || 'משהו השתבש');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        placeholder="שם מלא"
        required
        className={styles.input}
      />
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="אימייל"
        required
        className={styles.input}
      />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="סיסמה"
        required
        className={styles.input}
      />
      <button type="submit" className={styles.button}>הרשמה</button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
};

export default RegisterForm;