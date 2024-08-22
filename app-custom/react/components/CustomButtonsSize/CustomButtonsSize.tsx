import React from "react";
import { useListContext, ListContextProvider } from "vtex.list-context";
import RichText from 'vtex.rich-text/index'

import styles from "./styles.css"

import ButtonSize from "./components/ButtonSize";
import { IButtonSize } from "./types/ButtonSizeType";
import { ICustomButtonsSize } from "./types/CustomButtonsCategoryType";

const CustomButtonsSize = (props: ICustomButtonsSize) => {
  const { list } = useListContext() || [];
  const [item1] = props.children;

  if(!props.isActive) return <></>

  const listContent = props.buttonsContent.map((button: IButtonSize, index: number) => (
    <ButtonSize sizeText={button.sizeText} categorySrc={button.categorySrc} key={index}/>
  ))
  const newListContextValue = list.concat(listContent);

  return (
    <div className={styles.CustomButtonsSize}>
      <RichText text={props.title} />
      <ListContextProvider list={newListContextValue}>
          {item1}
      </ListContextProvider>
    </div>
  )
}

export default CustomButtonsSize;

CustomButtonsSize.schema = {
  title: "Lista de Botões da Categoria"
}
