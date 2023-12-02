import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart:Cart = {
    products:[],
    total: 0,
    qProducts:0
  }


  constructor() { }


  // Agrega producto al carrito
 addToCart(id:number, q:number, p:number){
    let prod:CartProduct = {
      productId:id,
      quantity:q,
      price:p
    }

    const prodIndx = this.cart.products.findIndex(product => product.productId == prod.productId)

    if (prodIndx != -1){
      this.cart.products[prodIndx].quantity += prod.quantity
    }else{
      this.cart.products.push(prod)
    }
  }
// Elimina el producto del carrito
  deleteProductFromCart(id:number){
    const prodIndx = this.cart.products.findIndex(product => product.productId == id)
    this.cart.products.splice(prodIndx, 1)
  }

// Agrega 1 unidad al producto
  addOneProduct(prod:CartProduct){

    const prodIndx = this.cart.products.findIndex(product => product.productId == prod.productId)

    if (prodIndx != -1){
      this.cart.products[prodIndx].quantity += 1
    }else{
      prod.productId=1
      this.cart.products.push(prod)
    }
  }

//elimina una unidad al producto
  substractOneProduct(prod:CartProduct){

    const prodIndx = this.cart.products.findIndex(product => product.productId == prod.productId)

    if (prodIndx != -1){
      this.cart.products[prodIndx].quantity -= 1
    }
    if( this.cart.products[prodIndx].quantity == 0){
      this.cart.products.splice(prodIndx, 1)
    }
  }
}


// Exports de models de datos
export interface CartProduct {
    productId:number,
    quantity:number,
    price:number
}

export interface Cart {
  products:CartProduct[] 
  total:number
  qProducts:number
}

