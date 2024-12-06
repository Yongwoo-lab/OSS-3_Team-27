import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import '../Auth.css'

const Header = ({ onSearch, onRegionClick, isLoggedIn, userName, onLogout, selectedRegion }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

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

  const handleLogoClick = () => {
    setSearchQuery('');
    onRegionClick(null);
    onSearch('');
  };

  return (
    <header className="header">
      <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        레츠고 코리아
      </div>
      <div className="region-buttons">
        {regions.map((region) => (
          <button
            key={region.code}
            onClick={() => onRegionClick(region.code)}
            className={`region-button ${selectedRegion === region.code ? 'active' : ''}`}
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
      <div className="auth-section">
        {isLoggedIn ? (
          <div className="user-info" style={{fontSize : '30px', fontWeight: 'bold'}}>
            <span>{userName}님  </span>
            <button onClick={() => navigate('/mypage')} className="login-button">마이페이지</button>
            <button onClick={onLogout} className="login-button">로그아웃</button>
          </div>
        ) : (
          <div className="auth-buttons">
            <button onClick={() => navigate('/login')} className="login-button">로그인</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;  