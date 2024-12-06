import React, { useEffect, useState } from 'react';
import { getWishlist } from '../api/wishlist'; // API 호출 함수
import './Mypage.css';

const MyPage = ({ isLoggedIn }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      return;
    }

    const fetchWishlist = async () => {
      try {
        const data = await getWishlist(); // API로 GET 요청
        setWishlist(data);
      } catch (error) {
        console.error('위시리스트 가져오기 오류:', error);
        alert('위시리스트를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="mypage-container">
        <h2>로그인이 필요합니다.</h2>
      </div>
    );
  }

  if (loading) {
    return <p>로딩 중...</p>;
  }

  return (
    <div className="mypage-container">
      <h1>마이페이지</h1>
      <h2>내 위시리스트</h2>
      <ul className="wishlist">
        {wishlist.length > 0 ? (
          wishlist.map((item, index) => (
            <li key={index} className="wishlist-item">
              <h3>{item.title}</h3>
              <p><strong>주소:</strong> {item.address}</p>
              <p><strong>메모:</strong> {item.memo}</p>
            </li>
          ))
        ) : (
          <p>위시리스트가 비어 있습니다.</p>
        )}
      </ul>
    </div>
  );
};

export default MyPage;