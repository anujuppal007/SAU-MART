import { CartItem } from "@core/cart-item";

export interface CartState {
    cartItems: CartItem[];
}

export const initialState = { cartItems: [] };
