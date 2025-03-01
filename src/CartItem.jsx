import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, updateState, updateTotal } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const total = useSelector(state => state.cart.total);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0
    cart.forEach(element => {
        // console.log(element)
        total = total + (element.quantity *  parseFloat(element.cost.substring(1)));
    });
    return total;
  };

  const handleCheckoutShopping = (e) => {
        alert('Functionality to be added for future reference');
    };



  const handleIncrement = (item) => {
    
    let i = item.quantity + 1;
    let name = item.name;
    dispatch(updateQuantity({item,i}));
    dispatch(updateTotal(true));
  };

  const handleDecrement = (item) => {
    let i = item.quantity - 1;
   
    if(i == 0){
        handleRemove(item)
    }
    else{
        dispatch(updateTotal(false));
        dispatch(updateQuantity({item,i}))
    }
    
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item))
    dispatch(updateState(item.name))
  };
  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  }
  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return  item.quantity * parseFloat(item.cost.substring(1));
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <h2 style={{ color: 'black' }}>Total Plants in Cart: {total}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'>{cart.total}</div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


