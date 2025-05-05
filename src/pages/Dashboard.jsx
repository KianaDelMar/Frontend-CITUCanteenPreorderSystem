import React, { useState, useEffect } from 'react';
import { useAuth } from '../pages/AuthContext';
import FoodMenu from './FoodMenu';
import OrderStatus from './OrderStatus';
import Cart from './Cart';
import Notification from './Notification';
import AdminPanel from './AdminPanel';
import "../components/dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('menu');
  const [cartItems, setCartItems] = useState([]);
  const [notifications, setNotifications] = useState([]);
  
  const [foodItems, setFoodItems] = useState([
    {
      id: 1,
      name: 'Chicken Sandwich',
      price: 5.99,
      category: 'Sandwiches',
      available: true,
      image: '/images/chicken_sandwhich.jpg',
      description: 'Juicy grilled chicken with lettuce and mayo on whole wheat bread'
    },
    {
      id: 2,
      name: 'Vegetable Wrap',
      price: 4.99,
      category: 'Sandwiches',
      available: true,
      image: 'images/placeholder.png',
      description: 'Fresh vegetables with hummus in a whole wheat tortilla'
    },
    {
      id: 3,
      name: 'Margherita Pizza',
      price: 8.99,
      category: 'Pizza',
      available: true,
      image: 'images/placeholder.png',
      description: 'Classic pizza with tomato sauce, mozzarella, and basil'
    },
    {
      id: 4,
      name: 'Caesar Salad',
      price: 6.49,
      category: 'Salads',
      available: true,
      image: '/images/placeholder.png',
      description: 'Romaine lettuce with Caesar dressing, croutons, and parmesan'
    }
  ]);

  const addToCart = (item) => {
    setCartItems([...cartItems, {...item, quantity: 1}]);
    addNotification(`Added ${item.name} to cart`);
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    setCartItems(cartItems.map(item => 
      item.id === itemId ? {...item, quantity: newQuantity} : item
    ));
  };

  const placeOrder = () => {
    const order = {
      userId: user.id,
      items: cartItems,
      status: 'preparing',
      timestamp: new Date().toISOString()
    };
    addNotification('Order placed successfully!');
    setCartItems([]);
  };

  const addNotification = (message) => {
    const newNotification = {
      id: Date.now(),
      message,
      timestamp: new Date().toISOString()
    };
    setNotifications([newNotification, ...notifications.slice(0, 4)]);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome, {user.name} ({user.role})</h2>
        <div className="tabs">
          <button onClick={() => setActiveTab('menu')} className={activeTab === 'menu' ? 'active' : ''}>
            Menu
          </button>
          <button onClick={() => setActiveTab('orders')} className={activeTab === 'orders' ? 'active' : ''}>
            My Orders
          </button>
          {user.role === 'admin' && (
            <button onClick={() => setActiveTab('admin')} className={activeTab === 'admin' ? 'active' : ''}>
              Admin
            </button>
          )}
        </div>
      </div>
      
      <div className="dashboard-content">
        {activeTab === 'menu' && (
          <>
            <FoodMenu 
              foodItems={foodItems} 
              addToCart={addToCart} 
              userRole={user.role}
              setFoodItems={setFoodItems}
            />
            <Cart 
              items={cartItems} 
              removeFromCart={removeFromCart} 
              updateQuantity={updateQuantity}
              placeOrder={placeOrder}
            />
          </>
        )}
        
        {activeTab === 'orders' && <OrderStatus userId={user.id} />}
        
        {activeTab === 'admin' && user.role === 'admin' && (
          <AdminPanel foodItems={foodItems} setFoodItems={setFoodItems} />
        )}
      </div>
      
      <Notification notifications={notifications} />
    </div>
  );
};

export default Dashboard;