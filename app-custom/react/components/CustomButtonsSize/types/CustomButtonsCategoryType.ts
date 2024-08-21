import { IButtonSize } from "./ButtonSizeType";

export interface ICustomButtonsSize {
  isActive: boolean;
  title: string;
  buttonsContent: IButtonSize[];
  children: any
}
