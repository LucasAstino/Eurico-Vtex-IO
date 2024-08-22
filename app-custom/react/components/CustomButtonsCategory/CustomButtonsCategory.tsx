import React from "react";
import { useListContext, ListContextProvider } from "vtex.list-context";

import styles from "./styles.css"

import ButtonCategory from "./ButtonCategory";
import { IButtonCategory } from "./types/ButtonCategoryType";
import { ICustomButtonsCategory } from "./types/CustomButtonsCategoryType";

const CustomButtonsCategory = (props: ICustomButtonsCategory) => {
  const { list } = useListContext() || [];
  const [item1] = props.children;

  if(!props.isActive) return <></>

  const listContent = props.buttonsContent.map((button: IButtonCategory, index: number) => (
    <ButtonCategory buttonName={button.buttonName} categorySrc={button.categorySrc} imageSrc={button.imageSrc} key={index}/>
  ))
  const newListContextValue = list.concat(listContent);

  if (props.page === "search") {
    return (
      <div className={styles.CustomButtonsCategory}>
        <ListContextProvider list={newListContextValue}>
            {item1}
        </ListContextProvider>
      </div>
    )
  }

  if (props.page === "home") {
    return (
      <div className={styles.CustomButtonsCategoryHome}>
        <ListContextProvider list={newListContextValue}>
            {item1}
        </ListContextProvider>
      </div>
    )
  }

  return <></>
}

export default CustomButtonsCategory;

CustomButtonsCategory.schema = {
  title: "Lista de Botões da Categoria"
}
