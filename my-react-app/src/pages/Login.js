import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Auth.css'; // 공통 스타일 파일 추가

const Login = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // 페이지 이동을 위한 hook

  const handleLogin = async () => {
    try {
      const response = await axios.get('https://674be82c71933a4e88564820.mockapi.io/User_ID_PW');
      const users = response.data;

      const foundUser = users.find(u => u.User === user && u.Password === password);

      if (foundUser) {
        alert('로그인 성공!');
      } else {
        alert('아이디 또는 비밀번호가 잘못되었습니다.');
      }
    } catch (error) {
      console.error('로그인 중 오류가 발생했습니다.', error);
      setMessage('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="auth-container">
      <div className="back-box" onClick={() => navigate('/')}>
        ←
      </div>
      <h2>로그인 페이지</h2>
      <div className="auth-input-group">
        <input
          type="text"
          placeholder="사용자"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="auth-input"
        />
      </div>
      <div className="auth-input-group">
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
        />
      </div>
      <button onClick={handleLogin} className="auth-button">로그인</button>
      <p className="auth-message">{message}</p>
      <div className="auth-footer">
        <p>계정이 없으신가요?</p>
        <Link to="/register" className="auth-link">회원가입</Link>
      </div>
    </div>
  );
};

export default Login;