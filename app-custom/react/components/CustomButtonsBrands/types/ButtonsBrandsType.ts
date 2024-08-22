import { IButtonBrand } from "./ButtonBrandType";

export interface IButtonsBrand {
  isActive: boolean;
  title: string;
  buttonsContent: IButtonBrand[];
  children: any
}
