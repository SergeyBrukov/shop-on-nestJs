import {TImage} from "./imageType";
import {TProducer} from "./producerType";
import {TCategory} from "./categoryType";

export type TProduct = {
  id: number,
  name: string,
  new: boolean,
  bestseller: boolean,
  articul: string,
  price: string,
  producerId: number,
  categories: number,
  image: TImage[]
}

export type TProductDetail = {
  id: number,
  name: string,
  new: boolean,
  bestseller: boolean,
  articul: string,
  price: string,
  producer: Pick<TProducer, "id" | "name">,
  category: TCategory,
  image: TImage[]
}