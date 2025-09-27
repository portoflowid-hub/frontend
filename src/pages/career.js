import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/general/Navbar';
import Footer from '../components/general/Footer';

// Komponen-komponen ini dinonaktifkan sementara untuk pengujian
// import CareerExplorer from '../components/career/CareerExplorer';
// import CareerDetailView from '../components/career/CareerDetailView';
// import styles from '../styles/career/Career.module.css';

const CareerPage = () => {
  return (
    <>
      <Head>
        <title>Career Path - PortoFlow</title>
      </Head>
      <div style={{ padding: '20px' }}>
        <Navbar />
        <main style={{ paddingTop: '100px', paddingBottom: '20px' }}>
          <h1>Halaman Karir (Tes)</h1>
          <p>Jika menu hamburger berfungsi di sini, masalahnya ada di komponen yang lain.</p>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default CareerPage;
