import { Route, Routes } from 'react-router-dom';
import './App.css';
<<<<<<< HEAD
import Main from './pages/Main';
import Login from './pages/Login';
import List from './pages/List';
import Header from './components/Header';
import { useState } from 'react';
=======
import Main from './components/Main';
import Login from './components/Login';
import Register from './components/Register';
>>>>>>> ce8672e5c552ab7e5a9dccd82a542391759b9148

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
<<<<<<< HEAD
      <Header onRegionClick={handleRegionClick} onSearch={handleSearch} />
      <Routes>
        <Route
          path="/"
          element={<Main selectedRegion={selectedRegion} searchQuery={searchQuery} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/list" element={<List />} />
=======
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
>>>>>>> ce8672e5c552ab7e5a9dccd82a542391759b9148
      </Routes>
    </div>
  );
}

export default App;