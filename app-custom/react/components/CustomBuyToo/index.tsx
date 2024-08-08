import React, { useState, useEffect } from 'react';
import { useProduct } from "vtex.product-context";
import { useOrderItems } from "vtex.order-items/OrderItems"
import HandleAddToCartObj from './helpers/handleAddToCartObject';

// @ts-ignore
import styles from './styles.css';

const CustomBuyToo = () => {
  const product: any = useProduct()?.product;
  const { addItems } = useOrderItems();
  const clusterId = "1916"
  //@ts-ignore
  const [currentProduct, setCurrentProduct] = useState<any>(product);
  const [randomProduct, setRandomProduct] = useState<any>();

  const [loading, setLoading] = useState<any>(true);

  const [length, setLength] = useState<any>(0)

  useEffect(() => {
    const fetchCatalog = async () => {
      try {

        const SIMILARS = `/api/catalog_system/pub/products/crossselling/similars/`
        const PRODUCT_ID = currentProduct.productId


        const similarsResponse = await fetch(SIMILARS + PRODUCT_ID)
        const json = await similarsResponse.json()

        setLength(json.length)
        console.log(json, "JSON")
        const randomIndex = Math.floor(Math.random() * json.length);
        const randomIndex2 = Math.floor(Math.random() * json.length);
        console.log(currentProduct, "selected product:", json[randomIndex], "index:", randomIndex, randomProduct);
        console.log(length, "randon-lenf")
        setRandomProduct(json[randomIndex]);

        console.log(randomIndex2, "randon2")
        setLoading(false);

      } catch (error) {
        console.error('', error);
        setLoading(false);
      }
    };

    fetchCatalog();

  }, [clusterId]);

  if (loading) return <p className={styles.buyTogether__loading}> <img src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Gray_circles_rotate.gif"> </img> </p>;
  if (!length) return <></>

  const menorPrecoRandomProductPrice = randomProduct?.items?.reduce((menor: any, item: any) => {
    const menorPrecoVendedor = item?.sellers?.reduce((menorVendedor: any, seller: any) => {
      const precoItem = seller?.commertialOffer?.Price;

      if (precoItem != null && (menorVendedor == null || precoItem < menorVendedor)) {
        return precoItem;
      }
      return menorVendedor;
    }, null);
    if (menorPrecoVendedor != null && (menor == null || menorPrecoVendedor < menor)) {
      return menorPrecoVendedor;
    }

    return menor;
  }, null);

  function buyTogether() {

    const cart = HandleAddToCartObj(randomProduct)
    //console.log(typeof(cart))
    addItems(cart)
    console.log(cart, "cart")
    const minicartElement: any = document.querySelector('.vtex-minicart-2-x-openIconContainer .vtex-button')
    minicartElement?.click()

  }

  return (
    <>
      <div className="vtex-rich-text-0-x-container vtex-rich-text-0-x-container--titleShelf vtex-rich-text-0-x-container--buyTogetherTitle flex tl items-start justify-start t-body c-on-base"><div className="vtex-rich-text-0-x-wrapper vtex-rich-text-0-x-wrapper--titleShelf vtex-rich-text-0-x-wrapper--buyTogetherTitle"><h2 className="vtex-rich-text-0-x-heading vtex-rich-text-0-x-heading--titleShelf vtex-rich-text-0-x-heading--buyTogetherTitle t-heading-2 vtex-rich-text-0-x-headingLevel2 vtex-rich-text-0-x-headingLevel2--titleShelf vtex-rich-text-0-x-headingLevel2--buyTogetherTitle vtex-rich-text-0-x-heading-level-2  vtex-rich-text-0-x-title-compre-junto">APROVEITE E LEVE TAMBÉM</h2></div></div>
        <div className={styles["buyTogether__container_wrapper"]}>
          <img className={styles["product__buyTogether_image"]} src={randomProduct?.items?.[0]?.images?.[0]?.imageUrl} alt={randomProduct?.productName} />
          <div  className={styles["bloco_texto"]} >
            <div className={styles["product__buyTogether_name"]}>
              {randomProduct?.productName && randomProduct.productName.substring(0, 50) + (randomProduct.productName.length > 50 ? '...' : '')}
            </div>
            <p className={styles["product__buyTogether_listprice"]} style={{ fontWeight: 400, fontSize: 12  }}>
              <b>POR: {menorPrecoRandomProductPrice.toLocaleString("pt-br", { style: "currency", "currency": "BRL" })}</b>
              {" "}|{" "}2X {(menorPrecoRandomProductPrice / 2).toLocaleString("pt-br", { style: "currency", "currency": "BRL" })}
            </p>
            <div className={styles["product__buyTogether_buyButton"]} onClick={() => buyTogether()}>Comprar</div>
          </div>
      </div>
    </>
  );
};

export default CustomBuyToo;
