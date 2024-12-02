import React from 'react';
import './Main.css';

const SortButtons = ({ sortOrder, onSortChange }) => (
  <div className="sort-buttons">
    <button
      className={`sort-button ${sortOrder === 'P' ? 'active' : ''}`}
      onClick={() => onSortChange('P')}
    >
      인기순
    </button>
    <button
      className={`sort-button ${sortOrder === 'D' ? 'active' : ''}`}
      onClick={() => onSortChange('D')}
    >
      최신순
    </button>
  </div>
);

export default SortButtons;