import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import Login from './pages/Login';
import Register from './components/Register';
import List from './pages/List';
import Header from './components/Header';
import { useState } from 'react';

function App() {
  const location = useLocation(); // 현재 경로를 가져오는 훅
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // 지역 버튼 클릭 핸들러
  const handleRegionClick = (regionCode) => {
    setSelectedRegion(regionCode);
    setSearchQuery(''); // 검색어 초기화
  };

  // 검색 핸들러
  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedRegion(null); // 지역 선택 초기화
  };

  // Header를 숨길 경로 설정
  const hideHeaderRoutes = ['/login', '/register'];

  // 현재 경로가 Header를 숨길 경로에 포함되는지 확인
  const shouldHideHeader = hideHeaderRoutes.some((route) => location.pathname.startsWith(route));

  return (
    <div className="App">
      {/* 특정 경로에서 Header 숨김 */}
      {!shouldHideHeader && (
        <Header onRegionClick={handleRegionClick} onSearch={handleSearch} />
      )}
      <Routes>
        <Route
          path="/"
          element={<Main selectedRegion={selectedRegion} searchQuery={searchQuery} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/list" element={<List />} />
        <Route path="/register" element={<Register />} />
        <Route path="/"element={<Main selectedRegion={selectedRegion} />}
/>
      </Routes>
    </div>
  );
}

export default App;