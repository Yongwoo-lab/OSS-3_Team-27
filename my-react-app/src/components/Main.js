import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Main.css';

const Main = ({ selectedRegion }) => {
  const [places, setPlaces] = useState([]);
  const [randomAds] = useState([
    {
      image: 'https://mblogthumb-phinf.pstatic.net/MjAyMzAzMTlfMTg4/MDAxNjc5MjIzNjM2MjM4.ZfmZKR8miRxvYfhdBAI3Qv9mf4E2zQvr59Sb74qSuTQg.EPXvjl8WT-8jGdgdQiY3cWW8F3VLDwq9V00VDh0gHc4g.JPEG.babtol2000/%EA%B5%90%EC%9C%A1_9_%EB%B3%B5%EC%82%AC.jpg?type=w800',
      title: '한옥에서의 평화로운 시간',
      description: '논산 한옥스테이와 함께 여유와 쉼을 느껴보세요.',
    },
    {
      image: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNjEwMjVfMjQ2%2FMDAxNDc3MzY0NjMwNDIy.1ma9Tb7-ba5I-21jyusrof5G1tCY2zXEu28pjfSkD0og.uh63GdzvG_LPY4WJfyh8mMh_XBeFGRJgJ9uEJpsP4SEg.JPEG.lyu1388%2FDPP_0044.JPG&type=sc960_832',
      title: '제주도의 푸른 바다',
      description: '제주에서 만나는 에메랄드빛 바다와 돌담길.',
    },
    {
      image: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAxMzFfMTQ1%2FMDAxNzA2NjcwMDE4NDUy.rGjWElE76tZi5k5IE_PzI9toVuqjamOVm-QBWQWpEVgg.T1TGYiZSaZfiqQZBzGpeLgR4SHV65SI2K2SDdT7xt0Ag.JPEG.green472%2F20240129_084605.jpg&type=sc960_832',
      title: '설악산 겨울 여행',
      description: '눈 덮인 설악산의 웅장함을 느껴보세요.',
    },
  ]);
  const [currentAd, setCurrentAd] = useState(0);

  // 슬라이더 자동 갱신
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAd((prevAd) => (prevAd + 1) % randomAds.length);
    }, 5000); // 5초마다 슬라이드 전환
    return () => clearInterval(timer);
  }, [randomAds]);

  useEffect(() => {
    if (selectedRegion) {
      fetchPlaces();
    } else {
      setPlaces([]); // 지역 선택 해제 시 장소 리스트 초기화
    }
  }, [selectedRegion]);

  const fetchPlaces = async () => {
    try {
      const response = await axios.get('http://apis.data.go.kr/B551011/KorService1/areaBasedList1', {
        params: {
          serviceKey: '1iGefq76e+XNm2g6qKPNzO2XXWbqKvuXd/cEO9wnwOgz9W0nwbipqZbd/Ht1xp5WzqyvC9YkG4KuilH5S6WDgg==',
          MobileApp: 'AppTest',
          MobileOS: 'ETC',
          pageNo: 1,
          numOfRows: 10,
          listYN: 'Y',
          arrange: 'A',
          contentTypeId: 12,
          areaCode: selectedRegion,
          _type: 'json',
        },
      });
      const items = response.data.response.body.items.item || [];
      setPlaces(items);
    } catch (err) {
      console.error('데이터를 가져오는 중 문제가 발생했습니다:', err);
    }
  };

  return (
    <div className="main-container">
      {/* 광고 슬라이더 */}
      {!selectedRegion && (
        <div className="slider">
          <div className="slide">
            <img
              src={randomAds[currentAd].image}
              alt={randomAds[currentAd].title}
              className="slide-image"
            />
            <div className="slide-text">
              <h2>{randomAds[currentAd].title}</h2>
              <p>{randomAds[currentAd].description}</p>
              <p className="cta">지역을 선택해 여행지를 탐색해보세요!</p>
            </div>
          </div>
        </div>
      )}

      {/* 지역별 여행지 리스트 */}
      {selectedRegion && (
        <div className="places-list-container">
          {places.length > 0 ? (
            <ul className="places-list">
              {places.map((place) => (
                <li key={place.contentid} className="place-item">
                  <img
                    src={place.firstimage || 'https://via.placeholder.com/150'}
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
          ) : (
            <p>해당 지역의 여행지를 찾을 수 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Main;