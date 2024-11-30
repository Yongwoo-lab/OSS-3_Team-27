import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './components/Main';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
<Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
