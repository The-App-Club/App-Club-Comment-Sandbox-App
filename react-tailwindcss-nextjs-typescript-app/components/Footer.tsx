import {css, cx} from '@emotion/css';
import {gsap} from 'gsap';
import {Observer} from 'gsap/dist/Observer';
import {useEffect, useRef} from 'react';

gsap.registerPlugin(Observer);

const Footer = () => {
  const footerDomRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const footerDom = footerDomRef.current;
      Observer.create({
        target: window,
        type: 'scroll',
        tolerance: 50,
        onUp: () => {
          footerDom?.classList.remove('is-hidden');
        },
        onDown: () => {
          footerDom?.classList.add('is-hidden');
        },
      });
    }
  }, []);
  return (
    <footer
      ref={footerDomRef}
      className={cx(
        css`
          transition: transform 0.4s ease;
          &.is-hidden {
            transform: translateY(100%);
          }
        `,
        `fixed bottom-0 left-0 min-h-[3rem] w-full border-2 bg-white z-10 flex items-center justify-center shadow-md`
      )}
    >
      Footer
    </footer>
  );
};

export default Footer;
