import React, { useEffect, useState } from "react";

export const Troca_facil: React.FC = () => {
  const [currentUrl, setCurrentUrl] = useState<string>(window.location.href);

  useEffect(() => {
    const checkElements = () => {
      const url = window.location.href;

      if (url.includes("/account#/orders")) {
        const intervalId = setInterval(() => {
          const elements = document.querySelectorAll(
            ".vtex-my-orders-app-3-x-cancelBtn"
          );
          if (elements.length) {
            elements.forEach((e) => {
              (e as HTMLElement).setAttribute(
                "href",
                "https://eurico.troquefacil.com.br/"
              );
            });
            clearInterval(intervalId);
          }
        }, 500);
      } else if (url.includes("/checkout/orderPlaced/?og")) {
        const intervalId = setInterval(() => {
          const elements = document.querySelectorAll(
            ".vtex-order-placed-2-x-updateOrderButton a"
          );
          if (elements.length) {
            elements.forEach((e) => {
              (e as HTMLElement).setAttribute(
                "href",
                "https://eurico.troquefacil.com.br/"
              );
            });
            clearInterval(intervalId);
          }
        }, 500);
      }
    };

    const handleUrlChange = () => {
      setCurrentUrl(window.location.href);
      checkElements();
    };

    checkElements();

    window.addEventListener("popstate", handleUrlChange);

    return () => {
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, [currentUrl]);

  return null;
};
