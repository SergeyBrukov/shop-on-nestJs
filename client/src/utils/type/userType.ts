import {TBasketUserType} from "./basketType";

export type TUser = {
  id: string
  name: string
  email: string,
  basket: TBasketUserType
}

export type TResponseUserData = {
  user: TUser
  token: string
}

export type TResponseBasketAddProduct = {
  productId: number
}

export type TRequestDataBasketAddProduct = TResponseBasketAddProduct