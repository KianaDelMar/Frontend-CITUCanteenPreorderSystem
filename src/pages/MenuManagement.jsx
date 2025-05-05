import React, { useState } from 'react';

const MenuManagement = ({ items, onAdd, onUpdate, onDelete }) => {
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    category: '',
    available: true
  });
  const [editingId, setEditingId] = useState(null);

  const handleAddItem = (e) => {
    e.preventDefault();
    onAdd({
      ...newItem,
      price: parseFloat(newItem.price)
    });
    setNewItem({ name: '', price: '', category: '', available: true });
  };

  const handleUpdateItem = (e) => {
    e.preventDefault();
    onUpdate(editingId, {
      ...newItem,
      price: parseFloat(newItem.price)
    });
    setEditingId(null);
    setNewItem({ name: '', price: '', category: '', available: true });
  };

  const startEditing = (item) => {
    setEditingId(item.id);
    setNewItem({
      name: item.name,
      price: item.price.toString(),
      category: item.category,
      available: item.available
    });
  };

  return (
    <div className="menu-management">
      <h2>Manage Menu Items</h2>
      
      <form onSubmit={editingId ? handleUpdateItem : handleAddItem}>
        <input
          type="text"
          placeholder="Item name"
          value={newItem.name}
          onChange={(e) => setNewItem({...newItem, name: e.target.value})}
          required
        />
        <input
          type="number"
          placeholder="Price"
          step="0.01"
          min="0"
          value={newItem.price}
          onChange={(e) => setNewItem({...newItem, price: e.target.value})}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={newItem.category}
          onChange={(e) => setNewItem({...newItem, category: e.target.value})}
          required
        />
        <label>
          Available:
          <input
            type="checkbox"
            checked={newItem.available}
            onChange={(e) => setNewItem({...newItem, available: e.target.checked})}
          />
        </label>
        <button type="submit">
          {editingId ? 'Update Item' : 'Add Item'}
        </button>
        {editingId && (
          <button type="button" onClick={() => {
            setEditingId(null);
            setNewItem({ name: '', price: '', category: '', available: true });
          }}>
            Cancel
          </button>
        )}
      </form>

      <div className="menu-items-list">
        {items.map(item => (
          <div key={item.id} className="menu-item-card">
            <h3>{item.name}</h3>
            <p>₱{item.price.toFixed(2)}</p>
            <p>Category: {item.category}</p>
            <p>Status: {item.available ? 'Available' : 'Unavailable'}</p>
            <div className="item-actions">
              <button onClick={() => startEditing(item)}>Edit</button>
              <button onClick={() => onDelete(item.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuManagement;