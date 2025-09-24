import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode';
import Head from 'next/head';
import Navbar from '../components/general/Navbar';
import Footer from '../components/general/Footer';
import ProfileHeader from '../components/dashboard/ProfileHeader';
import DashboardContent from '../components/dashboard/ProjectGrid';
import styles from '../styles/dashboard/Dashboard.module.css';

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

        // test console log
        console.log("MEMANGGIL URL UNTUK GET USER:", `${API_BASE}/api/user/${userId}`);

        const response = await fetch(`${API_BASE}/api/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          localStorage.removeItem('accessToken');
          router.push('/login');
          return;
        }

        const data = await response.json();
        setUser(data.data);

      } catch (error) {
        console.error("Failed to fetch or decode token:", error);
        localStorage.removeItem('accessToken');
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDataAdded = (newItem, type) => {
    setUser(currentUser => {
      const updatedUser = { ...currentUser };
      if (type === 'project') {
        updatedUser.projects = [newItem, ...(currentUser.projects || [])];
      }
      return updatedUser;
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard - {user.fullName}</title>
      </Head>
      <div className={styles.pageWrapper}>
        <Navbar />
        <main className={styles.container}>
          <ProfileHeader user={user} />
          <DashboardContent 
            projects={user.projects || []} 
            certificates={user.certificates || []}
            experiences={user.experiences || []}
            onDataAdded={handleDataAdded}
          />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default DashboardPage;