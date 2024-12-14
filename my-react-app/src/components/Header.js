import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import '../Auth.css';

const Header = ({ onRegionClick, isLoggedIn, userName, onLogout }) => {
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
    { name: '충남', code: 34 },
    { name: '충북', code: 33 },
    { name: '경북', code: 35 },
    { name: '경남', code: 36 },
    { name: '전북', code: 37 },
    { name: '전남', code: 38 },
    { name: '제주', code: 39 },
    { name: '경기', code: 31 },
    { name: '강원', code: 32 },
  ];

  const handleRegionClick = (regionCode) => {
    setSearchQuery('');
    navigate('/', { state: { regionCode } }); // 지역 코드를 메인 페이지로 전달
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      navigate('/search', { state: { query: searchQuery } }); // 검색어를 /search에 전달
    }
  };

  const handleLogoClick = () => {
    setSearchQuery('');
    navigate('/');
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
            onClick={() => handleRegionClick(region.code)} // 지역 버튼 클릭 이벤트
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
      <div className="auth-section">
        {isLoggedIn ? (
          <div className="user-info" style={{ fontSize: '30px', fontWeight: 'bold' }}>
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