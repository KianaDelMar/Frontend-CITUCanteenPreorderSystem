import React, { useState } from 'react';

const FoodMenu = ({ foodItems, addToCart }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [specialRequest, setSpecialRequest] = useState('');

  const handleAddToCart = () => {
    if (!selectedItem) return;
    
    addToCart({
      ...selectedItem,
      quantity,
      specialRequest: specialRequest.trim() || 'No special requests'
    });
    
    setSelectedItem(null);
    setQuantity(1);
    setSpecialRequest('');
  };

  return (
    <div className="food-menu">
      <div className="menu-grid">
        {foodItems.map(item => (
          <div 
            key={item.id} 
            className={`menu-item ${!item.available ? 'unavailable' : ''}`}
            onClick={() => item.available && setSelectedItem(item)}
          >
            <div className="item-image-container">
              <img 
                src={item.image || '/images/food-placeholder.jpg'} 
                alt={item.name}
                className="item-image"
                onError={(e) => {
                  e.target.src = '/images/food-placeholder.jpg';
                }}
              />
            </div>
            <div className="item-info">
              <h3>{item.name}</h3>
              <p className="price">₱{item.price.toFixed(2)}</p>
              <p className="category">{item.category}</p>
              {!item.available && (
                <span className="stock-status">Out of Stock</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="order-modal">
          <div className="modal-content">
            <button 
              className="close-modal"
              onClick={() => setSelectedItem(null)}
            >
              &times;
            </button>
            
            <div className="modal-image-container">
              <img 
                src={selectedItem.image || '/images/food-placeholder.jpg'} 
                alt={selectedItem.name}
              />
            </div>
            
            <h3>{selectedItem.name}</h3>
            <p className="modal-price">${selectedItem.price.toFixed(2)}</p>
            <p className="modal-description">
              {selectedItem.description || 'No description available'}
            </p>
            
            <div className="order-controls">
              <div className="quantity-selector">
                <label>Quantity:</label>
                <div className="quantity-buttons">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)}>
                    +
                  </button>
                </div>
              </div>
              
              <div className="special-requests">
                <label>Special Requests:</label>
                <textarea
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                  placeholder="Any special instructions (no onions, extra sauce, etc.)"
                  rows="3"
                />
              </div>
              
              <button 
                className="add-to-cart-btn"
                onClick={handleAddToCart}
              >
                Add to Cart (₱{(selectedItem.price * quantity).toFixed(2)})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodMenu;