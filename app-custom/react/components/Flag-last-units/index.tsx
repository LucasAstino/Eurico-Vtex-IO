import React, { useEffect, useState } from 'react';
import { useProduct } from "vtex.product-context";

interface ProductAvailability {
  id: string;
  isLimited: boolean;
}

export const UltimosPares: React.FC = () => {
  const [limitedProducts, setLimitedProducts] = useState<ProductAvailability[]>([]);
  const productContext = useProduct();

  const checkProductAvailability = async (id: string) => {
    try {
      const response = await fetch(`/api/catalog_system/pub/products/variations/${id}`);
      const data = await response.json();
      const skus = data.skus;
      const totalQuantity = skus.reduce((acc: number, sku: any) => acc + sku.availablequantity, 0);
      return totalQuantity <= 4;
    } catch (error) {
      console.error('Error fetching product variations:', error);
      return false;
    }
  };

  useEffect(() => {
    const init = async () => {
      if (!productContext || !productContext.product) {
        return;
      }

      const productIds = [productContext.product.productId]; // Get current ID

      const checks = await Promise.all(
        productIds.map(async (id) => {
          const isLimited = await checkProductAvailability(id);
          return { id, isLimited };
        })
      );

      setLimitedProducts(checks.filter((check) => check.isLimited));
    };

    init();
  }, [productContext]);

  return (
    <>
      {limitedProducts.map((product) => (
        <span key={product.id} className="vtex__last-unit">ÚLTIMOS PARES</span>
      ))}
    </>
  );
};

export default UltimosPares;
