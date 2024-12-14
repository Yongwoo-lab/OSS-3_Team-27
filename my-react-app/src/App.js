import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import Login from './pages/Login';
import Register from './components/Register';
import List from './pages/List';
import Header from './components/Header';
import MyPage from './pages/MyPage';
import SearchResults from './pages/SearchResults';
import { useState } from 'react';

function App() {
  const location = useLocation();
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const handleRegionClick = (regionCode) => {
    setSelectedRegion(regionCode);
    setSearchQuery('');
  };

  const handleSearch = (query) => {
    setSearchQuery(query); // 검색어 상태 업데이트
    setSelectedRegion(null);
  };

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUserInfo(userData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserInfo(null);
  };

  const hideHeaderRoutes = ['/login', '/register'];
  const shouldHideHeader = hideHeaderRoutes.some((route) => location.pathname.startsWith(route));

  return (
    <div className="App">
      {!shouldHideHeader && (
        <Header
          onRegionClick={handleRegionClick}
          onSearch={handleSearch}
          isLoggedIn={isLoggedIn}
          userName={userInfo?.User || ''}
          onLogout={handleLogout}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={<Main userInfo={userInfo} selectedRegion={selectedRegion} searchQuery={searchQuery} />}
        />
        <Route
          path="/search"
          element={<SearchResults searchQuery={searchQuery} userInfo={userInfo}  />} // 검색어 전달
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/list" element={<List />} />
        <Route path="/mypage" element={<MyPage isLoggedIn={isLoggedIn} userInfo={userInfo} />} />
      </Routes>
    </div>
  );
}

export default App;