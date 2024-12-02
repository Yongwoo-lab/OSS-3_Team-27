import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Auth.css'; // 공통 스타일 파일 추가

const Register = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // 페이지 이동을 위한 hook

  const handleRegister = async () => {
    try {
      const newUser = {
        User: user,
        Password: password,
        Phone: phone,
        Email: email,
      };
      const response = await axios.post('https://674be82c71933a4e88564820.mockapi.io/User_ID_PW', newUser);

      if (response.status === 201) {
        alert('회원가입 성공!');
        setUser('');
        setPassword('');
        setPhone('');
        setEmail('');
      }
    } catch (error) {
      console.error('회원가입 중 오류가 발생했습니다.', error);
      setMessage('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="auth-container">
      <div className="back-box" onClick={() => navigate('/login')}>
        ←
      </div>
      <h2>회원가입 페이지</h2>
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
      <div className="auth-input-group">
        <input
          type="text"
          placeholder="전화번호"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="auth-input"
        />
      </div>
      <div className="auth-input-group">
        <input
          type="email"
          placeholder="이메일 주소"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
        />
      </div>
      <button onClick={handleRegister} className="auth-button">회원가입</button>
      <p className="auth-message">{message}</p>
      <div className="auth-footer">
        <p>이미 계정이 있으신가요?</p>
        <Link to="/login" className="auth-link">로그인</Link>
      </div>
    </div>
  );
};

export default Register;