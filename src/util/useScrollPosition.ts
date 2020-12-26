import { useEffect, useState } from 'react';

export type Position = {
  x: number;
  y: number;
};

const useScrollPosition = () => {
  const [scrollPos, setScrollPos] = useState<null | Position>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPos({
        x: window.scrollX,
        y: window.scrollY,
      });
    };

    window.addEventListener('scroll', handleScroll, false);

    return () => {
      window.removeEventListener('scroll', handleScroll, false);
    };
  }, []);

  return scrollPos;
};

export default useScrollPosition;
