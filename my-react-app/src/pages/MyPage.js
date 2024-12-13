import React, { useState, useEffect } from 'react';
import './Mypage.css';

const MyPage = ({ isLoggedIn, userInfo }) => {
  const [wishlist, setWishlist] = useState([]);
  const [localMemo, setLocalMemo] = useState({}); // 메모 임시 저장 상태
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortType, setSortType] = useState('all'); // 필터링 타입
  const [phone, setPhone] = useState(userInfo?.Phone || '');
  const [email, setEmail] = useState(userInfo?.Email || '');
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

        // localMemo 초기화
        const initialMemoState = wishlistData.reduce((acc, item, index) => {
          acc[index] = item.memo || '';
          return acc;
        }, {});
        setLocalMemo(initialMemoState);
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

  const handleDelete = async (index) => {
    const updatedWishlist = wishlist.filter((_, i) => i !== index);
    setWishlist(updatedWishlist);

    try {
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

  const handlePasswordCheck = () => {
    if (passwordInput !== userInfo?.Password) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    setIsPasswordModalOpen(false); // 팝업 닫기
    setEditMode(true); // 정보 수정 모드 활성화
  };

  const handleEditSubmit = async () => {
    try {
      const updatedUser = {
        ...userInfo,
        Phone: phone,
        Email: email,
      };

      await fetch(`https://675caa09fe09df667f6476c0.mockapi.io/users/${userInfo?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      alert('정보가 성공적으로 수정되었습니다.');
      setEditMode(false);
    } catch (err) {
      console.error('정보 수정 오류:', err);
      alert('정보 수정 중 오류가 발생했습니다.');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="mypage-container">
        <h2>로그인이 필요합니다.</h2>
      </div>
    );
  }

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
              전화번호:
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
            <button onClick={handleEditSubmit}>수정 완료</button>
            <button onClick={() => setEditMode(false)}>취소</button>
          </div>
        ) : (
          <div className="user-info">
            <p><strong>전화번호:</strong> {phone}</p>
            <p><strong>이메일:</strong> {email}</p>
            <button onClick={() => setIsPasswordModalOpen(true)}>정보 수정</button>
          </div>
        )}
      </div>

      {/* 위시리스트 */}
      <div className="wishlist-section">
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