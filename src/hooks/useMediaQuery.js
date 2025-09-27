import { useState, useEffect } from 'react';

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQueryList = window.matchMedia(query);
      const listener = (event) => setMatches(event.matches);

      setMatches(mediaQueryList.matches);

      mediaQueryList.addEventListener('change', listener);
      
      return () => {
        mediaQueryList.removeEventListener('change', listener);
      };
    }
  }, [query]);

  return matches;
}

export default useMediaQuery;