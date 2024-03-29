import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store.js';
import { ProductsState } from '../reducers/shop.js';
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS';
export const CHECKOUT_FAILURE = 'CHECKOUT_FAILURE';

export interface ShopActionGetProducts extends Action<'GET_PRODUCTS'> {products: ProductsState};
export interface ShopActionAddToCart extends Action<'ADD_TO_CART'> {productId: string};
export interface ShopActionRemoveFromCart extends Action<'REMOVE_FROM_CART'> {productId: string};
export interface ShopActionCheckoutSuccess extends Action<'CHECKOUT_SUCCESS'> {};
export interface ShopActionCheckoutFailure extends Action<'CHECKOUT_FAILURE'> {};
export type ShopAction = ShopActionGetProducts | ShopActionAddToCart | ShopActionRemoveFromCart | ShopActionCheckoutSuccess | ShopActionCheckoutFailure;

type ThunkResult = ThunkAction<void, RootState, undefined, ShopAction>;

const PRODUCT_LIST = [
  { "id": 1, "title": "Cabot Creamery Extra Sharp Cheddar Cheese", "price": 10.99, "inventory": 2 },
  { "id": 2, "title": "Cowgirl Creamery Mt. Tam Cheese", "price": 29.99, "inventory": 10 },
  { "id": 3, "title": "Tillamook Medium Cheddar Cheese", "price": 8.99, "inventory": 5 },
  { "id": 4, "title": "Point Reyes Bay Blue Cheese", "price": 24.99, "inventory": 7 },
  { "id": 5, "title": "Shepherd's Halloumi Cheese", "price": 11.99, "inventory": 3 }
];

export const getAllProducts: ActionCreator<ThunkResult> = () => (dispatch) => {
  // Here you would normally get the data from the server. We're simulating
  // that by dispatching an async action (that you would dispatch when you
  // successfully got the data back).

  // You could reformat the data in the right format as well.
  const products = PRODUCT_LIST.reduce((obj, product) => {
    obj[product.id] = product
    return obj
  }, {} as ProductsState);

  dispatch({
    type: GET_PRODUCTS,
    products
  });
};

export const checkout: ActionCreator<ThunkResult> = () => (dispatch) => {
  // Here you could do things like credit card validation, etc.
  // If that fails, dispatch CHECKOUT_FAILURE. We're simulating that
  // by flipping a coin :)
  const flip = Math.floor(Math.random() * 2);
  if (flip === 0) {
    dispatch({
      type: CHECKOUT_FAILURE
    });
  } else {
    dispatch({
      type: CHECKOUT_SUCCESS
    });
  }
};

export const addToCart: ActionCreator<ThunkResult> = (productId) => (dispatch, getState) => {
  const state = getState();
  // Just because the UI thinks you can add this to the cart
  // doesn't mean it's in the inventory (user could've fixed it).
  if (state.shop!.products[productId].inventory > 0) {
    dispatch(addToCartUnsafe(productId));
  }
};

export const removeFromCart: ActionCreator<ShopActionRemoveFromCart> = (productId) => {
  return {
    type: REMOVE_FROM_CART,
    productId
  };
};

export const addToCartUnsafe: ActionCreator<ShopActionAddToCart> = (productId) => {
  return {
    type: ADD_TO_CART,
    productId
  };
};
