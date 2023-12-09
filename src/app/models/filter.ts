export class Filter {
    [key: string]: any;
    
    quantity: string
    categoryId:string
    stock:string
    cost:string
    brand:string
    img:string
    
    
    constructor(
        quantity: string,
        categoryId:string,
        stock:string,
        cost:string,
        brand:string,
        img:string
        ) {
    
            this.quantity=quantity
            this.categoryId=categoryId
            this.stock=stock
            this.cost=cost
            this.brand=brand
            this.img=img
    }
    }
    