import React, { useState } from 'react';

const AdminPanel = ({ foodItems, setFoodItems }) => {
  const [activeView, setActiveView] = useState('inventory');
  const [orders, setOrders] = useState([]);
  
  const mockOrders = [
    {
      id: 'ORD-12345',
      userId: 'user-001',
      userName: 'John Doe',
      userType: 'student',
      items: [
        { id: 1, name: 'Chicken Sandwich', price: 5.99, quantity: 1 },
        { id: 5, name: 'Iced Coffee', price: 2.49, quantity: 2 }
      ],
      status: 'ready',
      total: 10.97,
      timestamp: '2023-05-15T10:30:00Z'
    },
  ];

  const toggleItemAvailability = (itemId) => {
    setFoodItems(foodItems.map(item => 
      item.id === itemId ? {...item, available: !item.available} : item
    ));
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? {...order, status: newStatus} : order
    ));
  };

  return (
    <div className="admin-panel">
      <div className="admin-tabs">
        <button 
          onClick={() => setActiveView('inventory')} 
          className={activeView === 'inventory' ? 'active' : ''}
        >
          Inventory Management
        </button>
        <button 
          onClick={() => setActiveView('orders')} 
          className={activeView === 'orders' ? 'active' : ''}
        >
          Order Management
        </button>
        <button 
          onClick={() => setActiveView('analytics')} 
          className={activeView === 'analytics' ? 'active' : ''}
        >
          Sales Analytics
        </button>
      </div>

      {activeView === 'inventory' && (
        <div className="inventory-management">
          <h2>Menu Items</h2>
          <table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {foodItems.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>₱{item.price.toFixed(2)}</td>
                  <td>{item.available ? 'Available' : 'Out of Stock'}</td>
                  <td>
                    <button 
                      onClick={() => toggleItemAvailability(item.id)}
                      className={item.available ? 'disable-btn' : 'enable-btn'}
                    >
                      {item.available ? 'Mark as Unavailable' : 'Mark as Available'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeView === 'orders' && (
        <div className="order-management">
          <h2>Current Orders</h2>
          <div className="orders-list">
            {mockOrders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <h3>Order #{order.id}</h3>
                  <div>
                    <span className="user-info">{order.userName} ({order.userType})</span>
                    <select 
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    >
                      <option value="received">Received</option>
                      <option value="preparing">Preparing</option>
                      <option value="ready">Ready for Pickup</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
                
                <div className="order-details">
                  <p><strong>Placed at:</strong> {new Date(order.timestamp).toLocaleString()}</p>
                  
                  <div className="order-items">
                    <h4>Items:</h4>
                    <ul>
                      {order.items.map(item => (
                        <li key={item.id}>
                          {item.name} - ₱{item.price.toFixed(2)} x {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="order-total">
                    <strong>Total: ₱{order.total.toFixed(2)}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeView === 'analytics' && (
        <div className="sales-analytics">
          <h2>Sales Analytics</h2>
          <div className="analytics-cards">
            <div className="stat-card">
              <h3>Today's Revenue</h3>
              <p>₱1,245.75</p>
            </div>
            <div className="stat-card">
              <h3>Most Popular Item</h3>
              <p>Chicken Sandwich (87 orders)</p>
            </div>
            <div className="stat-card">
              <h3>Busiest Time</h3>
              <p>12:00 PM - 1:00 PM</p>
            </div>
          </div>
          
          <div className="chart-placeholder">
            <p>Sales Chart Placeholder</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;