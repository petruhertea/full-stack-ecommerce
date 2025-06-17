import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  addToCart(cartItem: CartItem) {
    // check if we already have the item in our cart
    let alreadyExistsInTheCart: boolean = false;
    let existingCartItem: CartItem | undefined = undefined;

    if (this.cartItems.length > 0) {
      // find the cart item based on the id
     
      existingCartItem = this.cartItems.find( tempCartItem => tempCartItem.id === cartItem.id );
      
      // check if we found it
      alreadyExistsInTheCart = (existingCartItem != undefined);
    }

    if (alreadyExistsInTheCart) {
      // increment the quantity
      existingCartItem!.quantity++;
    }
    else {
      // add the cart item
      this.cartItems.push(cartItem);
    }

    // compute total quantity and price
    this.computeCartTotals();
  }

  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;

    if (cartItem.quantity === 0){
      this.remove(cartItem);
    }
  }

  remove(cartItem: CartItem) {
    const cartItemIndex = this.cartItems.findIndex( tempCartItem => tempCartItem.id === cartItem.id );

    if (cartItemIndex > -1) {
      this.cartItems.splice(cartItemIndex,1);

      this.computeCartTotals();
    }
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    // publish the new values .. all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log cart data for debug
    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log("Cart contents")

    for (let tempCartItem of this.cartItems) {
      const subUnitPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity: ${tempCartItem.quantity}, unitPrice: ${tempCartItem.unitPrice}, subUnitPrice: ${subUnitPrice.toFixed(2)}`);
    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
  }
}
