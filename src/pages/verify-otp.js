// src/pages/verify-otp.js (FILE BARU)

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/login/AuthForm.module.css';

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const { login } = useAuth(); // Ambil fungsi login dari AuthContext

  // Ambil email dari URL saat halaman dimuat
  useEffect(() => {
    if (router.query.email) {
      setEmail(router.query.email);
    } else {
        // Jika tidak ada email di URL, mungkin pengguna datang ke sini secara tidak sengaja
        // Arahkan ke halaman register
        router.push('/register');
    }
  }, [router.query.email]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
      const response = await fetch(`${API_BASE}/api/users/verify-registration`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        // Jika OTP benar, backend akan mengembalikan token.
        // Langsung panggil fungsi login dari context untuk menyimpan token dan redirect ke dashboard
        alert('Verifikasi berhasil! Akun Anda sekarang aktif.');
        login(data.token); 
      } else {
        setError(data.message || 'OTP tidak valid atau sudah kedaluwarsa.');
      }
    } catch (err) {
      setError('Gagal terhubung ke server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Verifikasi OTP - PortoFlow</title>
      </Head>
      <div className={styles.pageWrapper}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Verifikasi Email Anda</h1>
          <p className={styles.redirectText} style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
            Kami telah mengirimkan kode 6 digit ke email <br/> <strong>{email}</strong>.
          </p>
          
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="otp" className={styles.label}>Kode OTP</label>
              <input 
                type="text" 
                id="otp" 
                value={otp} 
                onChange={(e) => setOtp(e.target.value)} 
                className={styles.input} 
                required 
                maxLength="6"
                placeholder="______"
                style={{ textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.5rem' }}
              />
            </div>
            {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}
            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? 'Memverifikasi...' : 'Verifikasi & Masuk'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default VerifyOtpPage;