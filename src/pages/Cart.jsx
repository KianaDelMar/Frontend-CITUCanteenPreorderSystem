import React from 'react';

const Cart = ({ items, removeFromCart, updateQuantity, placeOrder }) => {
  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {items.map(item => (
              <div key={`${item.id}-${item.specialRequest || ''}`} className="cart-item">
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>₱{item.price.toFixed(2)} × {item.quantity}</p>
                  {item.specialRequest && item.specialRequest !== 'No special requests' && (
                    <p className="special-request">
                      <strong>Note:</strong> {item.specialRequest}
                    </p>
                  )}
                </div>
                
                <div className="cart-item-actions">
                  <div className="quantity-control">
                    <button 
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      min="1" 
                      value={item.quantity} 
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                    />
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      +
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-total">
            <p>Total: ₱{calculateTotal().toFixed(2)}</p>
          </div>
          
          <button 
            onClick={placeOrder}
            className="checkout-btn"
            disabled={items.length === 0}
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;