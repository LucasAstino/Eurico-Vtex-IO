import { IButtonCategory } from "./ButtonCategoryType";

export interface ICustomButtonsCategory {
  isActive: boolean;
  buttonsContent: IButtonCategory[];
  children: any
  page: string;
}
