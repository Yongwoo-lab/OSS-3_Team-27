import React from 'react';
import './Main.css';

const SortAndFilter = ({ sortOrder, filterType, onSortChange, onFilterChange }) => (
  <div className="sort-filter-container">
    <div className="sort-buttons">
      <button
        className={`sort-button ${sortOrder === 'A' ? 'active' : ''}`}
        onClick={() => onSortChange('A')}
      >
        가나다순
      </button>
      <button
        className={`sort-button ${sortOrder === 'D' ? 'active' : ''}`}
        onClick={() => onSortChange('D')}
      >
        최신순
      </button>
    </div>
    <div className="filter-select">
      <select
        value={filterType}
        onChange={(e) => onFilterChange(e.target.value)}
        className="filter-dropdown"
      >
        <option value="all">전체</option>
        <option value="tour">관광지만</option>
        <option value="stay">숙소만</option>
        <option value="festival">축제만</option>
      </select>
    </div>
  </div>
);

export default SortAndFilter;