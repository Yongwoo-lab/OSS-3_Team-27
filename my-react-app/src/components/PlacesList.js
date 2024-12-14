import React, { useState } from 'react';
import Modal from './Modal';
import './Main.css';

const PlacesList = ({ places, userInfo }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleItemClick = (place) => {
    console.log("Place clicked:", place); // 로그 추가
    setSelectedPlace(place);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPlace(null);
    setIsModalOpen(false);
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
            onClick={() => handleItemClick(place)}
          >
            <img
              src={
                place.firstimage ||
                place.firstimage2 ||
                'https://www.shinsegaegroupnewsroom.com/wp-content/uploads/2022/11/2-%EC%A7%80%EB%A7%88%EC%BC%93_%EB%B3%B8%EB%AC%B8.png'
              }
              alt={place.title}
              className="place-image"
            />
            <div className="place-info">
              <h3>{place.title}</h3>
              <p>
                <strong>주소:</strong> {place.addr1 || '정보 없음'}
              </p>
              <p>
                <strong>전화번호:</strong> {place.tel || '정보 없음'}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal을 리스트 외부에서 호출 */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        data={selectedPlace}
        userInfo={userInfo} // 반드시 전달
      />
    </div>
  );
};

export default PlacesList;