import React from 'react';

const SalesAnalytics = ({ orders }) => {
  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
  const completedOrders = orders.filter(order => order.status === 'completed').length;

  return (
    <div className="sales-analytics">
      <h2>Sales Analytics</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p>{orders.length}</p>
        </div>
        <div className="stat-card">
          <h3>Completed Orders</h3>
          <p>{completedOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p>₱{totalSales.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="chart-placeholder">
        <p>Sales Chart (would show trends over time in a real app)</p>
      </div>
    </div>
  );
};

export default SalesAnalytics;