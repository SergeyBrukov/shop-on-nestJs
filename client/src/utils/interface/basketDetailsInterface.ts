import {TProductDetail} from "../type/productType";

export interface IBasketProduct extends TProductDetail {
}

export interface IBasketDetails {
  id: number,
  count: number,
  product: IBasketProduct
}