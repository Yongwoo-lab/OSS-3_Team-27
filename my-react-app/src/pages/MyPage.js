import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Mypage.css';

const MyPage = ({ isLoggedIn, userInfo }) => {
  const [wishlist, setWishlist] = useState([]);
  const [localMemo, setLocalMemo] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortType, setSortType] = useState('all');

  const [phone, setPhone] = useState(userInfo?.Phone || '');
  const [email, setEmail] = useState(userInfo?.Email || '');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  useEffect(() => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      return;
    }

    const fetchWishlist = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://675caa09fe09df667f6476c0.mockapi.io/users/${userInfo?.id}`);
        const data = await response.json();
        const wishlistData = Array.isArray(data.Wishlist) ? data.Wishlist : [];
        setWishlist(wishlistData);

        const initialMemoState = wishlistData.reduce((acc, item, index) => {
          acc[index] = item.memo || '';
          return acc;
        }, {});
        setLocalMemo(initialMemoState);

        setPhone(data.Phone || '');
        setEmail(data.Email || '');
        setPassword(data.Password || ''); // 서버에서 비밀번호 초기화
      } catch (err) {
        console.error('위시리스트 가져오기 오류:', err);
        setError('위시리스트를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [isLoggedIn, userInfo]);

  const filterWishlist = () => {
    switch (sortType) {
      case 'alphabetical':
        return [...wishlist].sort((a, b) => a.title.localeCompare(b.title));
      default:
        return wishlist;
    }
  };

  const handlePasswordCheck = () => {
    if (passwordInput !== password) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    setIsPasswordModalOpen(false);
    setPasswordInput(''); // 비밀번호 입력 필드 초기화
    setEditMode(true);
  };

  const handleEditSubmit = async () => {
    try {
      const updatedUser = {
        ...userInfo,
        Phone: phone,
        Email: email,
        Password: newPassword || password, // 새 비밀번호가 없으면 기존 비밀번호 유지
      };

      await fetch(`https://675caa09fe09df667f6476c0.mockapi.io/users/${userInfo?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      alert('정보가 성공적으로 수정되었습니다.');
      setPassword(newPassword || password); // 새로운 비밀번호를 현재 비밀번호로 업데이트
      setNewPassword(''); // 새 비밀번호 입력 필드 초기화
      setEditMode(false);
    } catch (err) {
      console.error('정보 수정 오류:', err);
      alert('정보 수정 중 오류가 발생했습니다.');
    }
  };

  const openPasswordModal = () => {
    setPasswordInput(''); // 모달 열 때 입력값 초기화
    setIsPasswordModalOpen(true);
  };

  if (!isLoggedIn) {
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

  const handleEditMemo = async (index) => {
    const updatedWishlist = wishlist.map((item, i) =>
      i === index ? { ...item, memo: localMemo[index] } : item
    );
    setWishlist(updatedWishlist);

    try {
      await fetch(`https://675caa09fe09df667f6476c0.mockapi.io/users/${userInfo?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...userInfo, Wishlist: updatedWishlist }),
      });
      alert('메모가 수정되었습니다.');
    } catch (error) {
      console.error('메모 수정 오류:', error);
      alert('메모 수정에 실패했습니다.');
    }
  };

  const handleDelete = async (index) => {
    // `wishlist`에서 항목 삭제
    const updatedWishlist = wishlist.filter((_, i) => i !== index);
  
    // `localMemo`에서 삭제된 항목에 대한 메모도 제거
    const updatedLocalMemo = { ...localMemo };
    delete updatedLocalMemo[index];
  
    // 삭제된 항목 이후의 메모 키를 재정렬
    const reindexedLocalMemo = Object.keys(updatedLocalMemo).reduce((acc, key) => {
      const numericKey = parseInt(key, 10);
      acc[numericKey > index ? numericKey - 1 : numericKey] = updatedLocalMemo[key];
      return acc;
    }, {});
  
    // 상태 업데이트
    setWishlist(updatedWishlist);
    setLocalMemo(reindexedLocalMemo);
  
    try {
      // 서버에 업데이트된 `Wishlist` 저장
      await fetch(`https://675caa09fe09df667f6476c0.mockapi.io/users/${userInfo?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...userInfo, Wishlist: updatedWishlist }),
      });
      alert('위시리스트가 삭제되었습니다.');
    } catch (error) {
      console.error('위시리스트 삭제 오류:', error);
      alert('위시리스트 삭제에 실패했습니다.');
    }
  };

  return (
    <div className="mypage-container">
      <h1>마이페이지</h1>

      {/* 비밀번호 확인 모달 */}
      {isPasswordModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>비밀번호 확인</h2>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            <button onClick={handlePasswordCheck}>확인</button>
            <button onClick={() => setIsPasswordModalOpen(false)}>취소</button>
          </div>
        </div>
      )}

      {/* 사용자 정보 수정 */}
      <div className="user-info-section">
        <h2>내 정보</h2>
        {editMode ? (
          <div className="edit-form">
            <label>
              연락처 번호:
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>
            <label>
              이메일 주소:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              새 비밀번호:
              <input
                type="password"
                placeholder="새 비밀번호를 입력하세요"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>
            <button onClick={handleEditSubmit}>수정 완료</button>
            <button onClick={() => setEditMode(false)}>취소</button>
          </div>
        ) : (
          <div className="user-info">
            <p><strong>전화번호:</strong> {phone}</p>
            <p><strong>이메일:</strong> {email}</p>
            <button onClick={openPasswordModal}>정보 수정</button>
          </div>
        )}
      </div>

         {/* 위시리스트 */}
         <div className="user-info-section">
        <h2>내 위시리스트</h2>
        {loading ? (
          <p>로딩 중...</p>
        ) : error ? (
          <p>{error}</p>
        ) : wishlist.length > 0 ? (
          <table className="wishlist-table">
            <thead>
              <tr>
                <th>여행지 이름</th>
                <th>주소</th>
                <th>전화번호</th>
                <th>메모</th>
                <th>수정</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              {filterWishlist().map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.address || '정보 없음'}</td>
                  <td>{item.phone || '정보 없음'}</td>
                  <td>
                    <textarea
                      value={localMemo[index] || ''}
                      onChange={(e) =>
                        setLocalMemo({ ...localMemo, [index]: e.target.value })
                      }
                      rows="4"
                      style={{ width: '100%', resize: 'none' }}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleEditMemo(index)}>수정</button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(index)}>삭제</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>위시리스트가 비어 있습니다.</p>
        )}
      </div>
    </div>
  );
};

export default MyPage;