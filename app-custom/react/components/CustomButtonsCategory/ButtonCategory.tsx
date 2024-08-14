import React from "react";

import styles from "./styles.css"

import { IButtonCategory } from "./types/ButtonCategoryType"

const ButtonCategory = (props: IButtonCategory) => {
  return (
    <a className={styles.ButtonCategory} href={props.categorySrc}>
      <img src={props.imageSrc} alt={props.buttonName} />
      <span>{props.buttonName}</span>
    </a>
  )
}

export default ButtonCategory;

ButtonCategory.schema = {
  title: "Botão da Categoria"
}
