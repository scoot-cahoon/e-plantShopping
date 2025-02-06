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
        // console.log(action.payload)
        const {name, image, cost} = action.payload;
        // console.log(name)
        console.log(state.items.find(item => item.name === name).name)
        const existingItem = state.items.find(item => item.name === name)
        console.log(existingItem)
        if (existingItem){
            console.log("HERE")
            state.items = state.items.filter(item => item.name !== name);
            
        }
    },
    updateQuantity: (state, action) => {
        const data = action.payload;
        let name1 = data.item.name
        const existingItem = state.items.find(item => item.name === name1)
        if (existingItem){
            existingItem.quantity = data.i;
        }
    
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
