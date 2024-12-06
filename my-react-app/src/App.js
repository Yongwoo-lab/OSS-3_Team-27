import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import Login from './pages/Login';
import Register from './components/Register';
import List from './pages/List';
import Header from './components/Header';
import MyPage from './pages/MyPage';
import { useState } from 'react';

function App() {
  const location = useLocation();
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null); 
  const navigate = useNavigate();

  

  const handleRegionClick = (regionCode) => {
    setSelectedRegion(regionCode);
    setSearchQuery('');
    navigate('/');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
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
          element={<Main selectedRegion={selectedRegion} searchQuery={searchQuery} />}
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/list" element={<List />} />
        <Route path="/mypage" element={<MyPage userInfo={userInfo} />} /> 
      </Routes>
    </div>
  );
}

export default App;