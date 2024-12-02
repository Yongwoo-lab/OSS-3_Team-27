import React from 'react';
import './Main.css';

const PlacesList = ({ places }) => {
  // 리스트 데이터 확인
  console.log('Places for Rendering:', places);

  if (places.length === 0) {
    return <p>해당 지역의 여행지가 없습니다.</p>;
  }

  return (
    <ul className="places-list">
      {places.map((place) => (
        <li key={place.contentid} className="place-item">
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
        </li>
      ))}
    </ul>
  );
};

export default PlacesList;