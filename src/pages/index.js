import Head from 'next/head';

// --- Impor yang dimodifikasi untuk menambahkan NavbarMobile dan useMediaQuery ---
import Navbar from '../components/general/Navbar';
import NavbarMobile from '../components/general/NavbarMobile';
import useMediaQuery from '../hooks/useMediaQuery';
// --- Akhir dari impor yang dimodifikasi ---

import Hero from '../components/home/Hero';
import Partners from '../components/home/Partners';
import Vision from '../components/home/Vision';
import Focus from '../components/home/Focus'; 
import Footer from '../components/general/Footer';

export default function Home() {
  // --- Gunakan hook useMediaQuery di sini untuk mendeteksi lebar layar ---
  const isMobile = useMediaQuery('(max-width: 768px)');
  // --- Akhir penambahan ---

  return (
    <div>
      <Head>
        <title>PortoFlow - Shape Your Future</title>
        <meta name="description" content="Career-Focused and Skill-Driven Education" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* --- Bagian yang diubah untuk render kondisional --- */}
      {isMobile ? <NavbarMobile /> : <Navbar />}
      {/* --- Akhir modifikasi --- */}
      
      <main>
        <Hero />
        <Partners />
        <Vision />
        <Focus />
      </main>

      <Footer />
    </div>
  );
}