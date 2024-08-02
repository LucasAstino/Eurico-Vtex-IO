import React, { useEffect, useState } from "react";
import { useProduct } from "vtex.product-context";

export const Flags: React.FC = () => {
  const productContext = useProduct();
  // const [roundedDiscount, setRoundedDiscount] = useState<number | null>(null);
  const [highlights, setHighlights] = useState<string[]>([]);

  useEffect(() => {
    if (!productContext || !productContext.product) {
      return;
    }

    // const listPrice = productContext.product?.priceRange?.listPrice?.highPrice;
    // const sellingPrice = productContext.product?.priceRange?.sellingPrice?.highPrice;

    // if (listPrice && sellingPrice) {
    //   const discountPercentage = ((listPrice - sellingPrice) / listPrice) * 100;
    //   if(discountPercentage > 0){
    //     setRoundedDiscount(Math.ceil(discountPercentage));
    //   }
    // }

    const clusterHighlights = productContext.product.clusterHighlights;
    if (clusterHighlights && clusterHighlights.length > 0) {
      const highlightNames = clusterHighlights.map((highlight: { name: string }) => highlight.name);
      setHighlights(highlightNames);
    }
  }, [productContext]);

  return (
    <>
      {/* {roundedDiscount !== null && (
        <span className="vtex__discount">{roundedDiscount}% Off</span>
      )} */}
      {highlights.length > 0 && highlights.map((name, index) => (
        <span key={index} data-highlight-name={name} className={`vtex__highlight`}>{name}</span>
      ))}
    </>
  );
};

export default Flags;
