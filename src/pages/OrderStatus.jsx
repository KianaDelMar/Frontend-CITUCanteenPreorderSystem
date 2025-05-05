import React, { useState, useEffect } from 'react';

const OrderStatus = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const mockOrders = [
        {
          id: 'ORD-12345',
          userId: userId,
          items: [
            { id: 1, name: 'Chicken Sandwich', price: 5.99, quantity: 1 },
            { id: 5, name: 'Iced Coffee', price: 2.49, quantity: 2 }
          ],
          status: 'ready',
          total: 10.97,
          timestamp: '2023-05-15T10:30:00Z',
          estimatedReadyTime: '2023-05-15T10:45:00Z'
        },
        {
          id: 'ORD-12344',
          userId: userId,
          items: [
            { id: 3, name: 'Cheese Pizza', price: 3.99, quantity: 3 }
          ],
          status: 'preparing',
          total: 11.97,
          timestamp: '2023-05-15T10:15:00Z',
          estimatedReadyTime: '2023-05-15T10:50:00Z'
        }
      ];
      
      setTimeout(() => {
        setOrders(mockOrders.filter(order => order.userId === userId));
        setIsLoading(false);
      }, 500);
    };

    fetchOrders();
  }, [userId]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'ready': return 'green';
      case 'preparing': return 'orange';
      case 'cancelled': return 'red';
      default: return 'gray';
    }
  };

  if (isLoading) return <div className="loading">Loading your orders...</div>;

  return (
    <div className="order-status">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h3>Order #{order.id}</h3>
                <span className="status" style={{ backgroundColor: getStatusColor(order.status) }}>
                  {order.status.toUpperCase()}
                </span>
              </div>
              
              <div className="order-details">
                <p><strong>Placed at:</strong> {new Date(order.timestamp).toLocaleString()}</p>
                <p><strong>Estimated ready by:</strong> {new Date(order.estimatedReadyTime).toLocaleTimeString()}</p>
                
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
                  <strong>Total: ${order.total.toFixed(2)}</strong>
                </div>
              </div>
              
              <div className="order-actions">
                {order.status === 'ready' && (
                  <button className="pickup-btn">Confirm Pickup</button>
                )}
                {order.status === 'preparing' && (
                  <button className="cancel-btn">Cancel Order</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderStatus;