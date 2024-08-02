import React, { useEffect } from "react";

export const ScriptCommmom: React.FC = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      const linkFooterAccount = document.querySelector(
        ".vtex-menu-2-x-styledLink--footer__atendimento--link#menu-item-shop"
      ) as HTMLElement;

      if (linkFooterAccount) {
        const spanElement = document.createElement("span");
        spanElement.className = linkFooterAccount.className;
        spanElement.id = linkFooterAccount.id;
        spanElement.innerHTML = linkFooterAccount.innerHTML;

        spanElement.addEventListener("click", (e) => {
          e.preventDefault();

          const login = document.querySelector(
            ".vtex-login-2-x-container .vtex-button"
          ) as HTMLElement;
          if (login) {
            login.click();
          }
        });

        linkFooterAccount.parentNode?.replaceChild(
          spanElement,
          linkFooterAccount
        );
      }

      // Selecionar todos os itens de menu
      const menuItems = document.querySelectorAll(".vtex-menu-2-x-menuItem--has-children");

      menuItems.forEach((menuItem) => {
        const itemLink = menuItem.querySelector(".vtex-menu-2-x-styledLinkContent--has-children") as HTMLElement;
        console.log(itemLink,'link')
        itemLink.addEventListener("click", (e) => {
          e.preventDefault();

          const childElement = menuItem.querySelector(".vtex-menu-2-x-submenuWrapper") as HTMLElement;
          console.log(childElement,'wrapper')
          if (!childElement.classList.contains('dn')) {
            // Alternar a classe do elemento filho
            childElement.classList.add("dn");
            childElement.classList.remove("flex");
          }
          else{
            childElement.classList.remove("dn");
            childElement.classList.add("flex");
          }
        });
      });
    }
  }, []);

  return null;
};
