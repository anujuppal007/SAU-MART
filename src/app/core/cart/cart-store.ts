import { Injectable } from "@angular/core";
import { Store } from "@core/store";
import { CartState, initialState } from "./cart-state";
import { CartItem } from "@core/cart-item";


@Injectable({ providedIn: 'root'})
export class CartStore extends Store<CartState>{

  constructor() {
      super(initialState);
  }

  addCartItem(cartItemToAdd: CartItem) {
    console.log('[Cart] Add cart Item');

    const newState = {
      ...this.state, //cartItems
      cartItems: [].concat(this.state.cartItems, cartItemToAdd)
    }
    this.setState(newState);
  }
  
  cearCart() {
    console.log('[Cart] Clear cart Item');

    const newState = initialState;

    this.setState(newState);
  }

  restoreCart(expectedState: CartState) {
    console.log('[Cart] Restore cart Item');
    this.setState(expectedState);
  }

  removeCartItem(cartItemToRemove: CartItem) {
    console.log('[Cart] Remove cart Item');

    const newState = {
      ...this.state, //cartItems
      cartItems: this.state.cartItems.filter(
        cartItem => cartItem.productId !== cartItemToRemove.productId
      )
    };
    
    this.setState(newState);
  }

  updateCartItem(cartItemToUpdate: CartItem) {
    console.log('[Cart] Update cart Item');

    const newState = {
      ...this.state, //cartItems
      cartItems: this.state.cartItems.map(
        cartItem => cartItem.productId === cartItemToUpdate.productId ? cartItemToUpdate : cartItem
      )
    };
    
    this.setState(newState);
  }

}
