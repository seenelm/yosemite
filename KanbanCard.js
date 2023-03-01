import React, { useState, useEffect } from 'react';
import '../css/kanban.css';

function KanbanCard() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('kanbanItems'));
    if (storedItems) {
      setItems(storedItems);
    }
  }, []);

  const handleAddItem = () => {
    const newItems = [...items, 'New item'];
    setItems(newItems);
    localStorage.setItem('kanbanItems', JSON.stringify(newItems));
  };

  const handleRemoveItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
    localStorage.setItem('kanbanItems', JSON.stringify(newItems));
  };

  const handleEditItem = (index, content) => {
    const newItems = [...items];
    newItems[index] = content;
    setItems(newItems);
    localStorage.setItem('kanbanItems', JSON.stringify(newItems));
  };

  return (
    <div className="kanban-card">
      <h2>HOT CLIENTS</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <input
              type="text"
              defaultValue={item}
              onBlur={(e) => handleEditItem(index, e.target.value)}
            />
            <button onClick={() => handleRemoveItem(index)}>
                <i className='material-symbols-outlined'>Close</i>
            </button>
          </li>
        ))}
      </ul>
      <button className="addbtn" onClick={handleAddItem}>
        <i className='material-symbols-outlined'>Add</i>
        <span>Add Items</span>
      </button>
    </div>
  );
}

export default KanbanCard;
