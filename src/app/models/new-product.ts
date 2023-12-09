export class Product {

name: string
description:string
stock:number
cost:number
brand:string
img:string
selected?:boolean

constructor(
    name: string,
    description:string,
    stock:number,
    cost:number,
    brand:string,
    img:string
    ) {

        this.name=name
        this.description=description
        this.stock=stock
        this.cost=cost
        this.brand=brand
        this.img=img
}
}
