export class Filter {
    quantity: string
    categoryId:string
    stock:string
    cost:string
    brand:string
    img:string
}

export class FilterShop {
    [key: string]: any;

    from: number | string;
    length: number;
    freeText:string;
    order?: string;
    orderAsc?: boolean;
    CategoryId:number
    BrandId:number
    costMin:number
    costMax:number
}
 
export enum Order {
    byCreated = 0,
    byPrice = 1,
    byName = 2,
}


