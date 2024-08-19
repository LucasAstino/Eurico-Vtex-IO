import React from "react";
import { useListContext, ListContextProvider } from "vtex.list-context";

import styles from "./styles.css"

import ButtonBrand from "./ButtonBrand";
import { IButtonBrand } from "./types/ButtonBrandType";
import { IButtonsBrand } from "./types/ButtonsBrandsType";

const CustomButtonsBrands = (props: IButtonsBrand) => {
  const { list } = useListContext() || [];
  const [item1] = props.children;
  console.log("Props", props)

  if(!props.isActive) return <></>

  const listContent = props.buttonsContent.map((button: IButtonBrand, index: number) => (
    <ButtonBrand buttonName={button.buttonName} categorySrc={button.categorySrc} imageSrc={button.imageSrc} key={index}/>
  ))
  const newListContextValue = list.concat(listContent);

  return (
    <div className={styles.CustomButtonsBrands}>
      <ListContextProvider list={newListContextValue}>
          {item1}
      </ListContextProvider>
    </div>
  )

}

export default CustomButtonsBrands;

CustomButtonsBrands.schema = {
  title: "Lista de Botões de Fornecedores"
}
