import { TestBed } from '@angular/core/testing';
import { CartItem } from '@core/cart-item';
import { CartState, initialState } from './cart-state';
import { CartStore } from './cart-store';

describe('CartStore', () => {
  let cartStore: CartStore;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartStore]
    });

    cartStore = TestBed.get(CartStore);
  });

  // it('should create an instance', () => {
  //   expect(cartStore).toBeTruthy();
  // });

  // it('can add item to the cart state', () => {
    
  //   //Arrange 
  //   const currentState = initialState;
  //   expect(currentState.cartItems.length).toBe(0);

  //   const cartItem: CartItem = {
  //     productId: 1,
  //     imgUrl: 'img/apple',
  //     price: 2,
  //     quantity: 10,
  //     itemTotal: 20,
  //     name: 'apple'
  //   };

  //   //Act
  //   cartStore.addCartItem(cartItem);

  //   const expectedState = {
  //     cartItems: [cartItem]
  //   };

  //   //Assert
  //   expect(cartStore.state).toEqual(expectedState);

  // });

  // it('can clear cart', () => {

  //   //Arrange 
  //   const cartItem: CartItem = {
  //     productId: 1,
  //     imgUrl: 'img/apple',
  //     price: 2,
  //     quantity: 10,
  //     itemTotal: 20,
  //     name: 'apple'
  //   };
  //   cartStore.addCartItem(cartItem);
  //   const currentState = {
  //     cartItems: [cartItem]
  //   };
  //   expect(cartStore.state).toEqual(currentState);

  //   //Act
  //   cartStore.cearCart();

  //   expect(cartStore.state).toEqual(initialState);

  // });

  // it('can restore cart', () => {

  //   //#region Arrange 
  //   const currentState = initialState;
  //   expect(cartStore.state).toEqual(currentState);

  //   const cartItem: CartItem = {
  //     productId: 1,
  //     imgUrl: 'img/apple',
  //     price: 2,
  //     quantity: 10,
  //     itemTotal: 20,
  //     name: 'apple'
  //   };
  //   const expectedState: CartState = {
  //     cartItems: [cartItem]
  //   }
  //   //#endregion 

  //   //#region Act
  //   cartStore.restoreCart(expectedState);
  //   //#endregion 

  //   //#region Assert
  //   expect(cartStore.state).toEqual(expectedState);
  //   //#endregion 
  // });

  // it('can remove cart item', () => {

  //   //#region Arrange 
  //   const cartItem: CartItem = {
  //     productId: 1,
  //     imgUrl: 'img/apple',
  //     price: 2,
  //     quantity: 10,
  //     itemTotal: 20,
  //     name: 'apple'
  //   };
  //   const cartItem1: CartItem = {
  //     productId: 2,
  //     imgUrl: 'img/orange',
  //     price: 5,
  //     quantity: 2,
  //     itemTotal: 10,
  //     name: 'orange'
  //   };
  //   const currentState: CartState = {
  //     cartItems: [cartItem, cartItem1]
  //   }
  //   cartStore.restoreCart(currentState);
  //   expect(cartStore.state).toEqual(currentState);
  //   //#endregion 

  //   //#region Act
  //   cartStore.removeCartItem(cartItem1);
  //   //#endregion 

  //   //#region Assert
  //   const expectedState: CartState = {
  //     cartItems: [cartItem]
  //   }
  //   expect(cartStore.state).toEqual(expectedState);
  //   //#endregion 
  // });

  it('can update cart item', () => {

    //#region Arrange 
    const cartItem: CartItem = {
      productId: 1,
      imgUrl: 'img/apple',
      price: 2,
      quantity: 10,
      itemTotal: 20,
      name: 'apple'
    };
    const cartItem1: CartItem = {
      productId: 2,
      imgUrl: 'img/orange',
      price: 5,
      quantity: 2,
      itemTotal: 10,
      name: 'orange'
    };
    const currentState: CartState = {
      cartItems: [cartItem, cartItem1]
    }
    cartStore.restoreCart(currentState);
    expect(cartStore.state).toEqual(currentState);
    //#endregion 

    //#region Act
    const cartItemToUpdate: CartItem = {
      productId: 2,
      imgUrl: 'img/orange',
      price: 5,
      quantity: 8,
      itemTotal: 40,
      name: 'orange'
    };
    cartStore.updateCartItem(cartItemToUpdate);
    //#endregion 

    //#region Assert
    const expectedState: CartState = {
      cartItems: [cartItem, cartItemToUpdate]
    }
    expect(cartStore.state).toEqual(expectedState);
    //#endregion 
  });

});
