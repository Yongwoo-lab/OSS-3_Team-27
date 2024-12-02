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

  const handleRegionClick = (regionCode) => {
    setSelectedRegion(regionCode);
    setSearchQuery('');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedRegion(null);
  };

  const hideHeaderRoutes = ['/login', '/register'];
  const shouldHideHeader = hideHeaderRoutes.some((route) => location.pathname.startsWith(route));

  return (
    <div className="App">
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