import {TProduct, TProductDetail} from "../type/productType";

export interface ProductsInterfaceResponse {
  products: TProduct[]
}

export interface ProductInterfaceResponse {
  product: TProductDetail
}
