import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Mypage.css';

const MyPage = ({ userInfo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState(userInfo || {}); // 초기값 설정
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    setMessage('정보가 성공적으로 수정되었습니다.');
  };

  if (!userInfo) {
    return (
      <div className="mypage-container">
        <h2>로그인이 필요합니다.</h2>
        <p>
          메인 페이지로 돌아가려면{' '}
          <Link to="/" className="main-link">여기를 클릭하세요.</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="mypage-container">
      <h1>마이페이지</h1>
      {isEditing ? (
        <div>
          <div className="mypage-content">
            <div className="input-group">
              <label>이름:</label>
              <input
                type="text"
                name="User"
                value={userDetails.User}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label>이메일:</label>
              <input
                type="email"
                name="Email"
                value={userDetails.Email || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label>전화번호:</label>
              <input
                type="text"
                name="Phone"
                value={userDetails.Phone || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="action-buttons">
            <button onClick={handleSave} className="save-button">저장</button>
            <button onClick={() => setIsEditing(false)} className="cancel-button">취소</button>
          </div>
        </div>
      ) : (
        <div>
          <div className="mypage-content">
            <div>
              <p><strong>이름:</strong> {userDetails.User}</p>
            </div>
            <div>
              <p><strong>이메일:</strong> {userDetails.Email}</p>
            </div>
            <div>
              <p><strong>전화번호:</strong> {userDetails.Phone}</p>
            </div>
          </div>
          <div className="action-buttons">
            <button onClick={() => setIsEditing(true)} className="login-button">정보 수정</button>
          </div>
        </div>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default MyPage;