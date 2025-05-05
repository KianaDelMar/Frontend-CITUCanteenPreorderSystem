import React from 'react';

const OrderManagement = ({ orders, onStatusChange }) => {
  const statusOptions = ['received', 'preparing', 'ready', 'completed'];

  return (
    <div className="order-management">
      <h2>Current Orders</h2>
      {orders.length === 0 ? (
        <p>No current orders</p>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <h3>Order #{order.id}</h3>
              <p>Customer: {order.customer}</p>
              <div className="order-items">
                <h4>Items:</h4>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <p>Total: ₱{order.total.toFixed(2)}</p>
              <div className="status-control">
                <label>Status:</label>
                <select
                  value={order.status}
                  onChange={(e) => onStatusChange(order.id, e.target.value)}
                >
                  {statusOptions.map(option => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderManagement;