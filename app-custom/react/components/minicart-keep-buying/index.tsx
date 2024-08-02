import React from "react";
import { useCssHandles } from "vtex.css-handles";

 export const HANDLES_KEEPbUYING = [
  "minicartFooter",
  "minicartFooter_keepBuying",
] as const;

export const KeepBuying = () => {
  const { handles } = useCssHandles(HANDLES_KEEPbUYING);

  function handleCloseMinicart() {
    const closeMinicart = document.querySelector(
      ".vtex-minicart-2-x-closeIconButton"
    ) as HTMLElement;
    closeMinicart.click();
  }

  return (
    <button
      className={handles.minicartFooter_keepBuying}
      onClick={handleCloseMinicart}
    >
      Continuar comprando
    </button>
  );
};
