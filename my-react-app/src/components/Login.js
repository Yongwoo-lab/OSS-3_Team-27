// import React, { useState } from 'react';
// import axios from 'axios';

// const Login = () => {
//   const [user, setUser] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleLogin = async () => {
//     try {
//       const response = await axios.get('https://674be82c71933a4e88564820.mockapi.io/User_ID_PW');
//       const users = response.data;

//       const foundUser = users.find(u => u.User === user && u.Password === password);

//       if (foundUser) {
//         setMessage('로그인 성공!');
//       } else {
//         setMessage('아이디 또는 비밀번호가 잘못되었습니다.');
//       }
//     } catch (error) {
//       console.error('로그인 중 오류가 발생했습니다.', error);
//       setMessage('오류가 발생했습니다. 다시 시도해주세요.');
//     }
//   };

//   return (
//     <div>
//       <h2>로그인 페이지</h2>
//       <div>
//         <input
//           type="text"
//           placeholder="아이디"
//           value={user}
//           onChange={(e) => setUser(e.target.value)}
//         />
//       </div>
//       <div>
//         <input
//           type="password"
//           placeholder="비밀번호"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>
//       <button onClick={handleLogin}>로그인</button>
//       <p>{message}</p>
//     </div>
//   );
// };

// export default Login;