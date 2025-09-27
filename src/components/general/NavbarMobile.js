import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import styles from '../../styles/general/Navbar.module.css';

// Import ikon baru untuk hamburger dan penutup
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';
import { BsBoxArrowRight, BsGearFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';


const NavbarMobile = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const menuRef = useRef(null);

  // Fungsi untuk menutup menu jika mengklik di luar
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isMobileMenuOpen]);

  // Foto profil
  const profilePic = user?.profilePic || '/images/profil.jpg';

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo (selalu terlihat) */}
        <Link href="/" className={styles.logo}>
            <img src="/images/logo/LogoPortoflow.svg" alt="portoflow logo" width={50} className="m-2.5" />
            <span>PortoFlow</span>
        </Link>
        
        {/* Ikon Hamburger (hanya terlihat di HP) */}
        <div 
          className={styles.hamburgerIcon} 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <IoClose /> : <GiHamburgerMenu />}
        </div>
      </div>

      {/* Mobile Menu yang akan muncul dari samping */}
      {isMobileMenuOpen && (
        <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`} ref={menuRef}>
          <div className={styles.navLinks}>
            <Link href="/career" onClick={() => setIsMobileMenuOpen(false)}>Career</Link>
            <Link href="/academic" onClick={() => setIsMobileMenuOpen(false)}>Academic</Link>
          </div>
          
          <div className={styles.navActions}>
            {user ? (
              <div className={styles.profileContainer}>
                <button
                  className={styles.dropdownItem}
                  onClick={() => setIsDropdownOpen(prev => !prev)}
                >
                  <Image src={profilePic} alt="Profile" width={40} height={40} className={styles.profileIcon} />
                  <span>{user.name || 'Profil'}</span>
                </button>

                {isDropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    <Link href="/dashboard" className={styles.dropdownItem} onClick={() => { setIsMobileMenuOpen(false); setIsDropdownOpen(false); }}>
                      <FaUser size={18} />
                      <span>Dashboard</span>
                    </Link>
                    
                    <Link href="#" className={styles.dropdownItem} onClick={() => { setIsMobileMenuOpen(false); setIsDropdownOpen(false); }}>
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
                <Link href="/login" className={styles.loginBtn} onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                <Link href="/register" className={styles.signupBtn} onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarMobile;
