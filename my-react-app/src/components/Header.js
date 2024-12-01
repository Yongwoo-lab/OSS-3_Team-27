import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import './Header.css';

const Header = ({ onSearch, onRegionClick, isLoggedIn, userName, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); // useNavigate 초기화

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
    // 로고 클릭 시 메인 화면 초기화
    setSearchQuery('');
    onRegionClick(null); // 지역 초기화
    onSearch(''); // 검색어 초기화
  };

  const handleLogin = () => {
    navigate('/login'); // /login 경로로 이동
  };

  return (
    <header className="header">
      {/* 로고 */}
      <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        레츠고 코리아
      </div>

      {/* 로그인 상태에 따라 버튼 표시 */}
      <div className="auth-section">
        {isLoggedIn ? (
          <div className="user-info">
            <span>{userName}님</span>
            <button onClick={onLogout} className="logout-button">로그아웃</button>
          </div>
        ) : (
          <div className="auth-buttons">
            <button onClick={handleLogin} className="login-button">로그인</button>
          </div>
        )}
      </div>

      {/* 지역 버튼 */}
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

      {/* 검색창 */}
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