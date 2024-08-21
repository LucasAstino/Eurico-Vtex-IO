import React from "react";

import styles from "../styles.css"

import { IButtonSize } from "../types/ButtonSizeType"

const ButtonSize = (props: IButtonSize) => {
  return (
    <a className={styles.ButtonSize} href={props.categorySrc}>
      <span>{props.sizeText}</span>
    </a>
  )
}

export default ButtonSize;

ButtonSize.schema = {
  title: "Botão da Categoria"
}
