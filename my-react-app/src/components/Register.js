import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const newUser = { User: user, Password: password };
      const response = await axios.post('https://674be82c71933a4e88564820.mockapi.io/User_ID_PW', newUser);

      if (response.status === 201) {
        setMessage('회원가입 성공!');
        setUser('');
        setPassword('');
      }
    } catch (error) {
      console.error('회원가입 중 오류가 발생했습니다.', error);
      setMessage('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div>
      <h2>회원가입 페이지</h2>
      <div>
        <input
          type="text"
          placeholder="아이디"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleRegister}>회원가입</button>
      <p>{message}</p>
    </div>
  );
};

export default Register;