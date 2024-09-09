import { useEffect, useState } from "react";

export function limitBuyFast() {
  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY; 
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      const remainingScroll = docHeight - (scrollTop + windowHeight);

      if (remainingScroll <= docHeight * 0.05) {
        setIsNearBottom(true);
      } else {
        setIsNearBottom(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const element = document.querySelector(
      ".vtex-sticky-layout-0-x-container--buy-fast-pdp"
    );
    if (isNearBottom) {
      element?.classList.add("vtex-limit-buy-fast");
    } else {
      element?.classList.remove("vtex-limit-buy-fast");
    }
  }, [isNearBottom]);

  return null;
}
