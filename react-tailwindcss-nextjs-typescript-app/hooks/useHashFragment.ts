import {useRouter} from 'next/router';
import {useEffect} from 'react';

const useHashFragment = (offset = 0, trigger = true) => {
  const router = useRouter();
  useEffect(() => {
    const scrollToHashElement = () => {
      const {hash} = window.location;
      const elementToScroll = document.getElementById(hash?.replace('#', ''));

      if (!elementToScroll) return;

      // console.log(hash, elementToScroll.offsetTop, offset);

      setTimeout(() => {
        window.scrollTo({
          top: elementToScroll.offsetTop - offset,
          behavior: 'smooth',
        });
      }, 300);
    };

    if (!trigger) return;

    scrollToHashElement();
    router.events.on('hashChangeStart', scrollToHashElement);
    window.addEventListener('hashchange', scrollToHashElement);
    return () => {
      window.removeEventListener('hashchange', scrollToHashElement);
      router.events.off('hashChangeStart', scrollToHashElement);
    };
  }, [trigger]);
};

export {useHashFragment};
