import React from "react";
import { useProduct } from "vtex.product-context";
import { useState } from 'react';
import {useCssHandles } from 'vtex.css-handles'

export const HANDLES_DESCRIPTION = [
  'product__description-container',
  'product__description-title',
  'product__description',
  'product__toggle-button--description',
] as const

export const productDescription = () => {

  const {handles} = useCssHandles(HANDLES_DESCRIPTION)

  console.log(useProduct())
  const { product } = useProduct() || {};

  const description = product?.description ?? 'Descrição não disponível';
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const maxLength = 100;

  const truncatedDescription =
    description.length > maxLength
      ? description.slice(0, maxLength) + '...'
      : description;

  return (
    <div className={handles["product__description-container"]}>
      <p className={handles["product__description-title"]}>Descrição:</p>
      <p className={handles.product__description}>
        {isExpanded ? description : truncatedDescription}
      </p>
      {description.length > maxLength && (
        <button onClick={toggleExpand} className={handles["product__toggle-button--description"]}>
          {isExpanded ? 'Menos informações' : 'Mais informações'}
        </button>
      )}
    </div>
  );
};
