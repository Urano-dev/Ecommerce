export class Filter {
    quantity: string
    categoryId:string
    stock:string
    cost:string
    brand:string
    img:string
}

export class FilterShop {
    from: number;
    length: number;
    freeText:string;
    order?: Order;
    orderAsc?: boolean;
    categoryId:number
    brandId:number
    costMin:number
    costMax:number
}
 
export enum Order {
    byCreated = 0,
    byPrice = 1,
    byName = 2,
}


