  import { createSlice } from '@reduxjs/toolkit'

  const initialState = {
      cartItems: localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_CARTITEMS) ? JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_CARTITEMS)) : [],
      cartTotalQuantity: 0,
      cartTotalAmount: 0,
      previousURL: "",
  }

  const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
      ADD_TO_CARD: (state, action) => {
        const productIndex = state.cartItems.findIndex((item)=> item.color === action.payload.color && item.arm === action.payload.arm && item.size === action.payload.size)
        if(productIndex >= 0){
          state.cartItems[productIndex].cartTotalQuantity += 1
        }else{
          const tempProduct = {...action.payload, cartTotalQuantity:1}
          state.cartItems.push(tempProduct)
        }
        localStorage.setItem(process.env.REACT_APP_LOCALSTORAGE_CARTITEMS, JSON.stringify(state.cartItems));
      },    

      DECREASE_CART: (state, action) => {
        const productIndex = state.cartItems.findIndex((item)=> item.color === action.payload.color && item.arm === action.payload.arm && item.size === action.payload.size)
        
        if (state.cartItems[productIndex].cartTotalQuantity > 1) {
          state.cartItems[productIndex].cartTotalQuantity -= 1;
          
          // Update localStorage with the updated cartItems
          localStorage.setItem(process.env.REACT_APP_LOCALSTORAGE_CARTITEMS, JSON.stringify(state.cartItems));
        } else if (state.cartItems[productIndex].cartTotalQuantity === 1) {
          // If quantity becomes 1, remove the item from the cart
          state.cartItems.splice(productIndex, 1);
          
          // Update localStorage with the updated cartItems
          localStorage.setItem(process.env.REACT_APP_LOCALSTORAGE_CARTITEMS, JSON.stringify(state.cartItems));
        }
      },
      DELETE_CART: (state, action) => {
        const { color, arm, size } = action.payload;
        const updatedCartItems = state.cartItems.filter(
          (item) => !(item.color === color && item.arm === arm && item.size === size)
        );
        state.cartItems = updatedCartItems;
        localStorage.setItem(process.env.REACT_APP_LOCALSTORAGE_CARTITEMS, JSON.stringify(updatedCartItems));
      },
      
      CLEAR_CART:(state)=>{
        localStorage.removeItem(process.env.REACT_APP_LOCALSTORAGE_CARTITEMS)
        state.cartItems = []
      },
      CALCULATE_SUBTOTAL:(state)=>{
        const array = []
        state.cartItems?.map((item)=>{
          const {price, cartTotalQuantity} = item
          const cartItemAmount = price * cartTotalQuantity
          return array.push(cartItemAmount)
        })
        const reducer = array?.reduce((a, b)=> {
          return a + b
        }, 0)
        state.cartTotalAmount = reducer
      },
      CALCULATE_TOTAL_QUANTITY:(state, action)=>{
        const array = []
        state.cartItems?.map((item)=>{
          const {cartTotalQuantity} = item
          const quantity = cartTotalQuantity
          return array.push(quantity)
        })
        const reducer = array?.reduce((a, b)=> {
          return a + b
        }, 0)
        state.cartTotalQuantity = reducer
      },
    }
  });

  export const {ADD_TO_CARD, DECREASE_CART, DELETE_CART, CLEAR_CART, CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY,SAVE_URL} = cartSlice.actions

  export default cartSlice.reducer
