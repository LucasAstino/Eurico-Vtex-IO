import React from "react";
import { useListContext, ListContextProvider } from "vtex.list-context";
import RichText from 'vtex.rich-text/index'

import styles from "./styles.css"

import ButtonBrand from "./ButtonBrand";
import { IButtonBrand } from "./types/ButtonBrandType";
import { IButtonsBrand } from "./types/ButtonsBrandsType";

const CustomButtonsBrands = (props: IButtonsBrand) => {
  const { list } = useListContext() || [];
  const [item1] = props.children;

  if(!props.isActive) return <></>

  const listContent = props.buttonsContent.map((button: IButtonBrand, index: number) => (
    <ButtonBrand categorySrc={button.categorySrc} imageSrc={button.imageSrc} key={index}/>
  ))
  const newListContextValue = list.concat(listContent);

  return (
    <div className={styles.CustomButtonsBrands}>
      <RichText text={props.title} />
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
