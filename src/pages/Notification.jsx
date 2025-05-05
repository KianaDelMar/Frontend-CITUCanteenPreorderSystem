import React, { useEffect, useState } from 'react';

const Notification = ({ notifications }) => {
  const [visibleNotifications, setVisibleNotifications] = useState([]);

  useEffect(() => {
    setVisibleNotifications(notifications);
    
    const timer = setTimeout(() => {
      if (notifications.length > 0) {
        setVisibleNotifications(prev => prev.slice(0, -1));
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [notifications]);

  return (
    <div className="notification-container">
      {visibleNotifications.map(notification => (
        <div key={notification.id} className="notification">
          {notification.message}
        </div>
      ))}
    </div>
  );
};

export default Notification;