import { createSlice } from '@reduxjs/toolkit'
import { json } from 'react-router-dom';

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal'};

const addDecimal = (num) =>{
    return (Math.round(num * 100) /100).toFixed(2);
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state,action)=>{
            const item = action.payload;
            const exitItem = state.cartItems.find((x)=> x._id == item._id)
            if (exitItem)
                {
                    state.cartItems = state.cartItems.map((x)=>x._id === exitItem._id ? item :x)
                }
            else{
                state.cartItems = [...state.cartItems, item]
            }
            //calculate items prices
            state.itemsPrice = addDecimal(state.cartItems.reduce((acc, item)=> acc +item.price * item.qty, 0));

            state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10)

            state.taxPrice = addDecimal(Number((0.15*state.itemsPrice).toFixed(2)))

            state.totalPrice = (
                Number(state.itemsPrice) + 
                Number(state.shippingPrice) +
                Number(state.taxPrice)
            ).toFixed(2);

            localStorage.setItem('cart', JSON.stringify(state))
        },
        removeFromCart: (state, action)=>{
            state.cartItems = state.cartItems.filter((x)=> x._id !== action.payload)
            state.itemsPrice = addDecimal(state.cartItems.reduce((acc, item)=> acc +item.price * item.qty, 0));

            state.shippingPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10)

            state.taxPrice = addDecimal(Number((0.15*state.itemsPrice).toFixed(2)))

            state.totalPrice = (
                Number(state.itemsPrice) + 
                Number(state.shippingPrice) +
                Number(state.taxPrice)
            ).toFixed(2);

            localStorage.setItem('cart', JSON.stringify(state))
        },
        saveShippingAddress: (state, action)=>{
            state.shippingAddress = action.payload;
            return state
        },
        savePaymentMethod: (state, action)=>{
            state.paymentMethod = action.payload;
            return state
        }
    }
})

export const  {addToCart, removeFromCart, saveShippingAddress, savePaymentMethod} = cartSlice.actions
export default cartSlice.reducer;