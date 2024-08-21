import React from "react";
import { useListContext, ListContextProvider } from "vtex.list-context";
import { useDevice } from 'vtex.device-detector';
import RichText from 'vtex.rich-text/index'

import styles from "./styles.css"

import ButtonSize from "./components/ButtonSize";
import { IButtonSize } from "./types/ButtonSizeType";
import { ICustomButtonsSize } from "./types/CustomButtonsCategoryType";
import { CustomSlider } from "./components/CustomSliderLayout";

const responsive= [
  {
      "breakpoint": 1024,
      "settings": {
          "slidesToShow": 3,
          "slidesToScroll": 3,
          "infinite": true,
          "centerMode": true
      }
  },
  {
      "breakpoint": 425,
      "settings": {
          "slidesToShow": 2,
          "slidesToScroll": 2,
          "infinite": true,
          "centerMode": true
      }
  },
  {
      "breakpoint": 280,
      "settings": {
          "slidesToShow": 1,
          "slidesToScroll": 1,
          "infinite": true,
          "centerMode": true,
          "arrows": true
      }
  }
]

const CustomButtonsSize = (props: ICustomButtonsSize) => {
  const { list } = useListContext() || [];
  const { isMobile } = useDevice();
  const [item1] = props.children;

  if(!props.isActive) return <></>

  const listContent = props.buttonsContent.map((button: IButtonSize, index: number) => (
    <ButtonSize sizeText={button.sizeText} categorySrc={button.categorySrc} key={index}/>
  ))
  const newListContextValue = list.concat(listContent);

  if (isMobile) {
    {console.log("Entrou no tamanho")}
    return (
      <>
        <CustomSlider
          autoplay={false}
          autoplaySpeed={3000}
          centerMode={true}
          children={newListContextValue}
          infinite={true}
          showNavigationArrows='always'
          showPaginationDots='always'
          usePagination = {true}
          centerPadding=''
          nextArrow = ''
          prevArrow = ''
          slidesToScroll={1}
          slidesToShow={1}
          speed = {500}
          responsive={responsive}
        />
      </>

    )
  }

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
