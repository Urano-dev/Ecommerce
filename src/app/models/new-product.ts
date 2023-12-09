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

constructor(
    name: string,
    description:string,
    stock:number,
    cost:number,
    brandId:number,
    categoryId:number,
    img:string
    ) {

        this.name=name
        this.description=description
        this.stock=stock
        this.cost=cost
        this.brandId=brandId
        this.categoryId = categoryId
        this.img=img
}
}


