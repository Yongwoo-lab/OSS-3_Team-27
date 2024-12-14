import React, { useState } from 'react';
import './Main.css';

const Modal = ({ isOpen, onClose, data, userInfo = {} }) => {
  const [memo, setMemo] = useState(''); // 메모 상태 관리

  if (!isOpen || !data) return null;

  const handleAddToFavorites = async () => {
    // 사용자 ID 확인
    if (!userInfo?.id) {
      console.error('유효하지 않은 사용자 정보입니다.');
      alert('사용자 정보가 필요합니다. 다시 시도해주세요.');
      return;
    }

    // 즐겨찾기 항목 구성
    const favoriteItem = {
      title: data.title || '제목 없음',
      address: `${data.addr1 || '정보 없음'} ${data.addr2 || ''}`,
      phone: data.tel || '정보 없음',
      memo, // 사용자가 입력한 메모
    };

    try {
      // 기존 Wishlist 가져오기
      const responseGet = await fetch(`https://675caa09fe09df667f6476c0.mockapi.io/users/${userInfo.id}`);
      if (!responseGet.ok) throw new Error('기존 데이터 가져오기 실패');
      
      const userData = await responseGet.json();

      // Wishlist가 배열인지 확인하고 새 항목 추가
      const updatedWishlist = Array.isArray(userData.Wishlist)
      ? [...userData.Wishlist, favoriteItem]
      : [favoriteItem]; // Wishlist가 배열이 아니면 새 배열로 초기화

      // // 새로운 Wishlist 데이터 구성
      // const updatedWishlist = [...(userData.Wishlist || []), favoriteItem];

      // API로 데이터 추가 요청
      const responseUpdate = await fetch(
        `https://675caa09fe09df667f6476c0.mockapi.io/users/${userInfo.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...userData,
            Wishlist: updatedWishlist, // 기존 Wishlist에 새로운 항목 추가
          }),
        }
      );

      if (!responseUpdate.ok) {
        throw new Error('즐겨찾기 추가 중 오류가 발생했습니다.');
      }

      alert('즐겨찾기에 추가되었습니다!');
      setMemo(''); // 메모 필드 초기화
    } catch (error) {
      console.error('즐겨찾기 추가 오류:', error);
      alert('즐겨찾기 추가에 실패했습니다.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <div className="modal-body">
          <h3>{data.title || '제목 없음'}</h3>
          <p><strong>주소:</strong> {`${data.addr1 || '정보 없음'} ${data.addr2 || ''}`}</p>
          <p><strong>전화번호:</strong> {data.tel || '정보 없음'}</p>
          {data.firstimage && (
            <img src={data.firstimage} alt={data.title || '이미지'} className="modal-image" />
          )}
        </div>
        <div className="favorites-section">
          <textarea
            className="memo-field"
            placeholder="여행지 메모를 입력하세요"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
          <button className="favorites-button" onClick={handleAddToFavorites}>
            ★ 즐겨찾기 추가
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;