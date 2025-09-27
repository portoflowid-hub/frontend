// src/components/home/Navbar.js

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import styles from '../../styles/general/Navbar.module.css';
import useMediaQuery from '../../hooks/useMediaQuery';

// Impor ikon untuk menu hamburger
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';
import { BsBoxArrowRight, BsGearFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  // Efek untuk menutup dropdown profil jika klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);
  
  // Efek untuk menutup menu mobile jika klik di luar
  useEffect(() => {
    const handleMobileClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest(`.${styles.hamburgerIcon}`)) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleMobileClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleMobileClickOutside);
    };
  }, [isMobileMenuOpen]);

  const profilePic = user?.profilePic || '/images/profil.jpg';

  // Menempatkan semua konten navigasi dalam satu blok
  const navigation = (
    <>
      <div className={styles.navLinks}>
        <Link href="/career" onClick={() => setIsMobileMenuOpen(false)}>Career</Link>
        <Link href="/academic" onClick={() => setIsMobileMenuOpen(false)}>Academic</Link>
      </div>
      <div className={styles.navActions}>
        {user ? (
          <div className={styles.profileContainer} ref={dropdownRef}>
            <button
              className={styles.profileAvatarButton}
              onClick={() => setIsDropdownOpen(prev => !prev)}
            >
              <Image src={profilePic} alt="Profile" width={40} height={40} className={styles.profileIcon} />
            </button>
            {isDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <Link href="/dashboard" className={styles.dropdownItem} onClick={() => setIsDropdownOpen(false)}>
                  <FaUser size={18} />
                  <span>Dashboard</span>
                </Link>
                <Link href="#" className={styles.dropdownItem} onClick={() => setIsDropdownOpen(false)}>
                  <BsGearFill size={18} />
                  <span>Pengaturan</span>
                </Link>
                <div className={styles.separator}></div>
                <button onClick={logout} className={styles.dropdownItem}>
                  <BsBoxArrowRight size={18} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link href="/login" className={styles.loginBtn}>Login</Link>
            <Link href="/register" className={styles.signupBtn}>Sign Up</Link>
          </>
        )}
      </div>
    </>
  );

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <img src="/images/logo/LogoPortoflow.svg" alt="portoflow logo" width={50} className="m-2.5" />
          <span>PortoFlow</span>
        </Link>
        
        {isMobile ? (
          <div
            className={styles.hamburgerIcon}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <IoClose /> : <GiHamburgerMenu />}
          </div>
        ) : (
          navigation
        )}
      </div>

      {isMobile && isMobileMenuOpen && (
        <div className={styles.mobileMenu} ref={mobileMenuRef}>
          {navigation}
        </div>
      )}
    </nav>
  );
};

export default Navbar;