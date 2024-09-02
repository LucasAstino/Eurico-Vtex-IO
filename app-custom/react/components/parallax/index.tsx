import React from "react";
import { useEffect } from "react";

export const Parallax: React.FC = () => {
  useEffect(() => {
    const handleScroll = () => {
      //pode usar para anmimaçãod e parallax em qualquer lugar, so colocar a classe parallax no elmento.
        const scrollTop = window.scrollY;
        const parallaxElements = document.querySelectorAll('.vtex-flex-layout-0-x-flexCol--parallax');
    
        parallaxElements.forEach((element) => {
          const el = element as HTMLElement;
          const offsetTop = el.offsetTop;
          const height = el.offsetHeight;
    
          const isInViewport = (el: HTMLElement) => {
            const rect = el.getBoundingClientRect();
            return (
              rect.top <= window.innerHeight && rect.bottom >= 0
            );
          };
    
          if (isInViewport(el)) {
            const offset = scrollTop - offsetTop;
            const parallaxEffect = Math.round((offset / height) * 100);
            parallaxEffect
            el.classList.add('vtex-flex-layout-0-x-flexCol--col-right--is--visible');
          } else {
            el.classList.remove('vtex-flex-layout-0-x-flexCol--col-right--is--visible');
          }
        });
      };
    
      window.addEventListener('scroll', handleScroll);
    
      
      handleScroll();
    
    
      document.addEventListener('DOMContentLoaded', () => {
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
      });
    
  }, []);
  return null;
};




  