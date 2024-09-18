import React from "react";
import { useProduct } from "vtex.product-context";

//@ts-ignore
import styles from './style.css'

export const CustomProductRef = () => {

    const product = useProduct()

    // Obtenha a descrição adicional
    const additionalDescription = product?.selectedItem?.complementName;

  return (
    <div className={styles.refDescription}>
        <span>Ref: </span>
        <span id="additional-description-value">{additionalDescription}</span>
    </div>
  );
};
