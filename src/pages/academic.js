import { useState, useEffect } from 'react';
import Head from 'next/head';

// --- Impor Navbar dan Hook yang Diperlukan ---
import Navbar from '../components/general/Navbar';
import NavbarMobile from '../components/general/NavbarMobile';
import useMediaQuery from '../hooks/useMediaQuery';
// --- Akhir Impor ---

import Footer from '../components/general/Footer';
import FilterBar from '@/components/academic/FilterBar';
import LastCourseCard from '@/components/academic/LastCourseCard';
import CourseGrid from '@/components/academic/CourseGrid';
import NewVideos from '@/components/academic/NewVideos';
import styles from '@/styles/academic/Academic.module.css';

const AcademicPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedField, setSelectedField] = useState("All");
  const [searchTerm, setSearchTerm] = useState('');
  
  // --- Gunakan hook useMediaQuery di sini untuk mendeteksi lebar layar ---
  const isMobile = useMediaQuery('(max-width: 768px)');
  // --- Akhir penambahan ---

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (searchTerm) params.append('q', searchTerm);
        if (selectedField !== 'All') params.append('category', selectedField); 

        const token = localStorage.getItem('accessToken');
        
        const headers = {
          'Content-Type': 'application/json',
        };

        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
        const response = await fetch(`${API_BASE}/api/courses?${params.toString()}`, { headers });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        setCourses(data.data || []);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [selectedField, searchTerm]);

  const lastCourse = courses.length > 0 ? courses[0] : null;

  return (
    <div className={styles.pageWrapper}>
      <Head>
        <title>Courses Academic - PortoFlow</title>
      </Head>
      
      {/* --- Bagian yang diubah untuk render kondisional --- */}
      {isMobile ? <NavbarMobile /> : <Navbar />}
      {/* --- Akhir modifikasi --- */}

      <main className={styles.container}>
        <h1 className={styles.headline}>Courses Academic</h1>

        <FilterBar 
          selectedField={selectedField}
          setSelectedField={setSelectedField}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {loading ? (
          <p>Loading courses...</p>
        ) : (
          <>
            {lastCourse && <LastCourseCard course={lastCourse} />}
            <CourseGrid courses={courses} />
            <NewVideos />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AcademicPage;
