import React, { useState, useEffect } from 'react';
import { useAuth } from '../pages/AuthContext';
import { useNavigate } from 'react-router-dom';
import MenuManagement from './MenuManagement';
import OrderManagement from './OrderManagement';
import SalesAnalytics from './SalesAnalytics';


const SellerPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('menu');
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const initialItems = [
      { id: 1, name: 'Chicken Sandwich', price: 5.99, category: 'Sandwiches', available: true },
      { id: 2, name: 'Veggie Wrap', price: 4.99, category: 'Sandwiches', available: true }
    ];
    setMenuItems(initialItems);

    const initialOrders = [
      { id: 1001, customer: 'John Doe', items: ['Chicken Sandwich'], status: 'preparing', total: 5.99 },
      { id: 1002, customer: 'Jane Smith', items: ['Veggie Wrap', 'Iced Tea'], status: 'ready', total: 7.48 }
    ];
    setOrders(initialOrders);
  }, []);

  const addMenuItem = (newItem) => {
    setMenuItems([...menuItems, { ...newItem, id: Date.now() }]);
  };

  const updateMenuItem = (id, updatedItem) => {
    setMenuItems(menuItems.map(item => item.id === id ? updatedItem : item));
  };

  const deleteMenuItem = (id) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  if (user?.role !== 'seller') {
    navigate('/');
    return null;
  }

  return (
    <div className="seller-page">
      <h1>Seller Dashboard</h1>
      <div className="seller-tabs">
        <button 
          onClick={() => setActiveTab('menu')} 
          className={activeTab === 'menu' ? 'active' : ''}
        >
          Menu Management
        </button>
        <button 
          onClick={() => setActiveTab('orders')} 
          className={activeTab === 'orders' ? 'active' : ''}
        >
          Orders
        </button>
        <button 
          onClick={() => setActiveTab('analytics')} 
          className={activeTab === 'analytics' ? 'active' : ''}
        >
          Analytics
        </button>
      </div>

      <div className="seller-content">
        {activeTab === 'menu' && (
          <MenuManagement 
            items={menuItems} 
            onAdd={addMenuItem} 
            onUpdate={updateMenuItem} 
            onDelete={deleteMenuItem} 
          />
        )}

        {activeTab === 'orders' && (
          <OrderManagement 
            orders={orders} 
            onStatusChange={updateOrderStatus} 
          />
        )}

        {activeTab === 'analytics' && (
          <SalesAnalytics orders={orders} />
        )}
      </div>
    </div>
  );
};

export default SellerPage;