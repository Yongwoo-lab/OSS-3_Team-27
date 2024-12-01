import React, { useState } from 'react';
import './Header.css';

const Header = ({ onSearch, onRegionClick }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const regions = [
    { name: '서울', code: 1 },
    { name: '부산', code: 6 },
    { name: '대구', code: 4 },
    { name: '인천', code: 2 },
    { name: '광주', code: 5 },
    { name: '대전', code: 3 },
    { name: '울산', code: 7 },
    { name: '세종', code: 8 },
    { name: '경기', code: 31 },
    { name: '강원', code: 32 },
  ];

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <header className="header">
      <div className="logo">레츠고 코리아</div>
      <div className="region-buttons">
        {regions.map((region) => (
          <button
            key={region.code}
            onClick={() => onRegionClick(region.code)} // 지역 코드 전달
            className="region-button"
          >
            {region.name}
          </button>
        ))}
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="어디로, 어떤 여행을 떠날 예정인가요?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>🔍</button>
      </div>
    </header>
  );
};

export default Header;