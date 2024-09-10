import React, { useEffect, useState } from "react";

export const troca_facil: React.FC = () => {
  const [currentUrl, setCurrentUrl] = useState<string>(window.location.href);

  useEffect(() => {
    const checkElements = () => {
      const url = window.location.href;

      if (url.includes("/account#/orders")) {
        const intervalId = setInterval(() => {
          const element = document.querySelector(
            ".vtex-my-orders-app-3-x-cancelBtn"
          );
          if (element) {
            (element as HTMLElement).setAttribute(
              "href",
              "https://eurico.troquefacil.com.br/"
            );
            (element as HTMLElement).textContent = "Solicitar Troca ou Devolução";
            clearInterval(intervalId);
          }
        }, 500);
      } else if (url.includes("/checkout/orderPlaced/?og")) {
        const intervalId = setInterval(() => {
          const element = document.querySelectorAll(
            ".vtex-order-placed-2-x-updateOrderButton a"
          );
          if (element) {
            element.forEach((e) => {
              (e as HTMLElement).setAttribute(
                "href",
                "https://eurico.troquefacil.com.br/"
              );
              (e as HTMLElement).textContent = "Solicitar Troca ou Devolução";
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
    window.addEventListener("pushstate", handleUrlChange);

    return () => {
      window.removeEventListener("popstate", handleUrlChange);
      window.removeEventListener("pushstate", handleUrlChange);
    };
  }, [currentUrl]);

  return null;
};
