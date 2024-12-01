import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './components/Main';
import Login from './pages/Login';
import Register from './components/Register';
import List from './pages/List';
import Header from './components/Header';
import { useState } from 'react';

function App() {
  // 지역 선택 및 검색 상태 관리
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

  return (
    <div className="App">
      {/* Header 컴포넌트에 핸들러 전달 */}
      <Header onRegionClick={handleRegionClick} onSearch={handleSearch} />
      <Routes>
        {/* Main 페이지에 선택된 지역 및 검색어 전달 */}
        <Route
          path="/"
          element={<Main selectedRegion={selectedRegion} searchQuery={searchQuery} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/list" element={<List />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;