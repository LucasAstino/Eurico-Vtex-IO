import React from "react";

import styles from "./styles.css"

import { IButtonBrand } from "./types/ButtonBrandType"

const ButtonBrand = (props: IButtonBrand) => {
  return (
    <a className={styles.ButtonBrand} href={props.categorySrc}>
      <img src={props.imageSrc} alt="Imagem Marca" />
    </a>
  )
}

export default ButtonBrand;

ButtonBrand.schema = {
  title: "Botão da Categoria"
}
