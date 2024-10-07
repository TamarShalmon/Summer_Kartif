"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are necessary.");
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
    <form onSubmit={handleSubmit} >
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        placeholder="שם מלא"
        required
      />
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="אימייל"
        required
      />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="סיסמה"
        required
      />
      <button type="submit">הרשמה</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default RegisterForm;