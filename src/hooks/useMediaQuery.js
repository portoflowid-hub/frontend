// src/hooks/useMediaQuery.js

import { useState, useEffect } from 'react';

/**
 * Custom hook untuk mendeteksi apakah layar saat ini cocok dengan media query yang diberikan.
 * @param {string} query - Media query yang ingin dideteksi (contoh: '(max-width: 768px)').
 * @returns {boolean} - Mengembalikan true jika query cocok, dan false jika tidak.
 */
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Memeriksa apakah window tersedia (penting untuk server-side rendering di Next.js)
    if (typeof window !== 'undefined') {
      const mediaQueryList = window.matchMedia(query);
      const listener = (event) => setMatches(event.matches);

      // Set nilai awal
      setMatches(mediaQueryList.matches);

      // Tambahkan listener untuk mendeteksi perubahan
      mediaQueryList.addEventListener('change', listener);
      
      // Cleanup function untuk menghapus listener saat komponen dilepas
      return () => {
        mediaQueryList.removeEventListener('change', listener);
      };
    }
  }, [query]);

  return matches;
}

export default useMediaQuery;   