import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import Login from './pages/Login';
import Register from './components/Register';
import List from './pages/List';
import Header from './components/Header';
import { useState } from 'react';

function App() {
  const location = useLocation();
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const handleRegionClick = (regionCode) => {
    setSelectedRegion(regionCode);
    setSearchQuery('');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedRegion(null);
  };

  const handleLogin = (name) => {
    setIsLoggedIn(true);
    setUserName(name);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
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
          userName={userName}
          onLogout={handleLogout}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={<Main selectedRegion={selectedRegion} searchQuery={searchQuery} />}
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/list" element={<List />} />
        <Route path="/register" element={<Register />} />
        <Route path="/header" element={<Header />} />
      </Routes>
    </div>
  );
}

export default App;