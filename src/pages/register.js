// src/pages/register.js (MODIFIKASI PENUH)

import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/login/AuthForm.module.css';
import { FcGoogle } from 'react-icons/fc';

const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    if (password !== confirmPassword) {
      setError('Password dan Konfirmasi Password tidak sama!');
      setLoading(false);
      return;
    }

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
      const response = await fetch(`${API_BASE}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          username,
          email,
          password,
          confirmPassword, 
          gender,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registrasi berhasil! Kami akan mengarahkan Anda ke halaman verifikasi OTP.');
        
        // baru
        router.push(`/verify-otp?email=${email}`);
        
      } else {
        setError(data?.message || data?.error || 'Registrasi gagal. Silakan coba lagi.');
      }
    } catch (err) {
      console.error('Register error:', err);
      setError('Gagal terhubung ke server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Daftar - PortoFlow</title>
      </Head>
      <div className={styles.pageWrapper}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Buat Akun Baru</h1>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
                <label htmlFor="fullName" className={styles.label}>Nama Lengkap</label>
                <input 
                    type="text" 
                    id="fullName" 
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)} 
                    className={styles.input} 
                    required 
                    placeholder="Masukkan nama lengkap"
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="username" className={styles.label}>Username</label>
                <input 
                    type="text" 
                    id="username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    className={styles.input} 
                    required 
                    placeholder="Masukkan username"
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input 
                    type="email" 
                    id="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className={styles.input} 
                    required 
                    placeholder="contoh@gmail.com"
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="gender" className={styles.label}>Jenis Kelamin</label>
                <select 
                    id="gender" 
                    value={gender} 
                    onChange={(e) => setGender(e.target.value)} 
                    className={styles.input} 
                    required
                >
                    <option value="" disabled>Pilih Jenis Kelamin</option>
                    <option value="male">Laki-laki</option>
                    <option value="female">Perempuan</option>
                </select>
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.label}>Password</label>
                <input 
                    type="password" 
                    id="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className={styles.input} 
                    required 
                    placeholder="Masukkan password"
                />
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="confirmPassword" className={styles.label}>Konfirmasi Password</label>
                <input 
                    type="password" 
                    id="confirmPassword" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    className={styles.input} 
                    required 
                    placeholder="Masukkan ulang password"
                />
            </div>

            {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}
            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? 'Mendaftar...' : 'Daftar'}
            </button>
          </form>

          <div className={styles.separator}>ATAU</div>
            {/* <button type="button" ... > ... </button> */}
            <p className={styles.redirectText}>
              Sudah punya akun? <Link href="/login">Masuk sekarang</Link>
            </p>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;