import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    writable:true,
    items: [], // Initialize items as an empty array
    addedTocart:{},
    total:0,
  },
  reducers: {
    addItem: (state, action) => {
    const {name, image, cost} = action.payload;
    //state.items access initalState and maps that value to new variable item and then compares agains the 
    //name that was taken from line 10 payload object
        const existingItem = state.items.find(item => item.name === name)
        if (existingItem){
            existingItem.quantity++;
            state.total++;
        }
        else{
            state.items.push({name, image, cost, quantity:1});
            state.total++;
        }

    },
    removeItem: (state, action) => {
        const {name, image, cost} = action.payload;
        const existingItem = state.items.find(item => item.name === name)
        console.log(existingItem.quantity)
         state.total =  state.total - existingItem.quantity
        if (existingItem){
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
    updateState : (state, action)  => {
        const data = action.payload;
        state.addedTocart[data] = !state.addedTocart[data]
    },
    addToCart : (state, action) => {
        const data = action.payload;

        if(!state.addedTocart[data]){
            state.addedTocart[data] = false
        }

    },
    updateTotal: (state,action) => {
        const incDec = action.payload;
        if(incDec){
            state.total++;
        }
        else{
            state.total--;
        }
    }
  },
});

export const { addItem, removeItem, updateQuantity, updateState, addToCart,updateTotal} = CartSlice.actions;

export default CartSlice.reducer;
