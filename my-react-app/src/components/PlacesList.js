import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import './Main.css';

const PlacesList = ({ places, userInfo }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favoritePlaces, setFavoritePlaces] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch(
          `https://675caa09fe09df667f6476c0.mockapi.io/users/${userInfo?.id}`
        );
        const userData = await response.json();
        setFavoritePlaces(userData.Wishlist || []);
      } catch (error) {
        console.error('즐겨찾기 가져오기 오류:', error);
      }
    };

    if (userInfo?.id) fetchWishlist();
  }, [userInfo]);

  const handleItemClick = (place) => {
    setSelectedPlace(place);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPlace(null);
    setIsModalOpen(false);
  };

  const isFavorite = (place) =>
    favoritePlaces.some((fav) => fav.title === place.title);

  const toggleFavorite = async (place) => {
    try {
      const updatedFavorites = isFavorite(place)
        ? favoritePlaces.filter((fav) => fav.title !== place.title)
        : [...favoritePlaces, {
            title: place.title,
            address: `${place.addr1 || '정보 없음'} ${place.addr2 || ''}`,
            phone: place.tel || '정보 없음',
          }];

      await fetch(`https://675caa09fe09df667f6476c0.mockapi.io/users/${userInfo?.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Wishlist: updatedFavorites }),
      });

      setFavoritePlaces(updatedFavorites);
      // alert(isFavorite(place) ? '즐겨찾기에서 제거되었습니다.' : '즐겨찾기에 추가되었습니다.');
    } catch (error) {
      console.error('즐겨찾기 업데이트 오류:', error);
      alert('즐겨찾기 업데이트에 실패했습니다.');
    }
  };

  if (places.length === 0) {
    return <p>해당 지역의 여행지가 없습니다.</p>;
  }

  return (
    <div>
      <ul className="places-list">
        {places.map((place) => (
          <li
            key={place.contentid}
            className="place-item"
            // onClick={() => handleItemClick(place)}
          >
            <img
              src={place.firstimage || place.firstimage2 || 'https://via.placeholder.com/150'}
              alt={place.title}
              className="place-image"
            />
            <div className="place-info">
              <h3>{place.title}</h3>
              <p><strong>주소:</strong> {place.addr1 || '정보 없음'}</p>
              <p><strong>전화번호:</strong> {place.tel || '정보 없음'}</p>
            </div>
            <button
              className={`favorite-button ${isFavorite(place) ? 'filled' : ''}`}
              onClick={(e) => {
                e.stopPropagation(); // 부모 요소의 클릭 이벤트 전파 방지
                handleItemClick(place); // 모달창 열기
                toggleFavorite(place); // 즐겨찾기 추가/제거 실행
              }}
            >
              {isFavorite(place) ? '★' : '☆'}
            </button>
          </li>
        ))}
      </ul>

      <Modal isOpen={isModalOpen} onClose={closeModal} data={selectedPlace} userInfo={userInfo} />
    </div>
  );
};

export default PlacesList;