export class Filter {
    quantity: string
    categoryId:string
    stock:string
    cost:string
    brand:string
    img:string
}

export interface queryDataModel {
  /**Orden*/
  order?: Order;
  /**Dirección del ordenamiento*/
  orderAsc?: boolean;
  /**Filtro a utilizar*/
  filter?: Filter;
  /**Desde qué registro se deben obtener los datos*/
  from: number;
  /**Cantidad de registros a obtener*/
  length: number;
}

export enum Order {
    byPrice = 0,
    byName = 1,
}