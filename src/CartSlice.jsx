import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    writable:true,
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
    const {name, image, cost} = action.payload;
    //state.items access initalState and maps that value to new variable item and then compares agains the 
    //name that was taken from line 10 payload object
        const existingItem = state.items.find(item => item.name === name)
        if (existingItem){
            existingItem.quantity++;
        }
        else{
            state.items.push({name, image, cost, quantity:1});
        }

    },
    removeItem: (state, action) => {
        const {name, image, cost} = action.payload;
        const existingItem = state.items.find(item => item.name === name)
        if (existingItem){
            state.items = state.items.filter(item => item.name !== action.payload);
        }
    },
    updateQuantity: (state, action) => {
        const {name, quantity} = action.payload;
        const existingItem = state.items.find(item => item.name === name)
        if (existingItem){
            existingItem.quantity = quantity;
        }
    
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
