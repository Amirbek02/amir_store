import React from 'react'
import AppContext from '../context';

export const useHooks = () => {
  const {cartItem, setCartItem} = React.useContext(AppContext);
  const totalSum = cartItem.reduce((sum, obj) => obj.productCost + sum, 0)
  return {totalSum, cartItem,setCartItem}
}
