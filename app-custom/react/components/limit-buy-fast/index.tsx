// import React from "react";
import { useEffect, useState } from "react";

export function limitBuyFast() {
  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY; // Distância atual do topo
      const windowHeight = window.innerHeight; // Altura da janela
      const docHeight = document.documentElement.scrollHeight; // Altura total da página

      const remainingScroll = docHeight - (scrollTop + windowHeight); // Quanto falta para o final

      // Se a distância até o final for menor que 5% da altura total da página
      if (remainingScroll <= docHeight * 0.05) {
        setIsNearBottom(true);
      } else {
        setIsNearBottom(false);
      }
    };

    // Adiciona o evento de scroll
    window.addEventListener("scroll", handleScroll);

    // Remove o evento de scroll ao desmontar o componente
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Adiciona a classe 'scrolled-near-bottom' se chegar nos 5% finais
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
