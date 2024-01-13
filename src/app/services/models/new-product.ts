export class Product {
id?:number
name: string
description:string
stock:number
cost:number
brandId:number
categoryId:number
img:string
selected?:boolean
}


export class IncomingProduct {
    id?:number
    name: string
    description:string
    stock:number
    cost:number
    Brand:{name:string}
    Category:{name:string}
    img:string
    selected?:boolean
    }
    
    
    