import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Main.css';

const Main = ({ searchQuery, selectedRegion }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (regionCode = null) => {
    setLoading(true);
    try {
      const response = await axios.get(
        'http://apis.data.go.kr/B551011/KorService1/areaBasedList1',
        {
          params: {
            serviceKey: '1iGefq76e+XNm2g6qKPNzO2XXWbqKvuXd/cEO9wnwOgz9W0nwbipqZbd/Ht1xp5WzqyvC9YkG4KuilH5S6WDgg==',
            numOfRows: 10, // 요청 데이터 수
            pageNo: 1, // 페이지 번호
            MobileOS: 'ETC', // 운영체제
            MobileApp: 'TestApp', // 앱 이름
            areaCode: regionCode, // 지역 코드 (옵션)
            _type: 'json', // 응답 형식
          },
        }
      );
  
      console.log('API 응답:', response.data); // 응답 확인용
      const items = response.data.response.body.items.item || [];
      setData(items); // 데이터 상태 업데이트
      setError(null);
    } catch (error) {
      console.error('API 호출 에러:', error);
      setError('데이터를 가져오는 중 문제가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      fetchData({
        serviceKey: 'YOUR_API_KEY',
        numOfRows: 10,
        pageNo: 1,
        MobileOS: 'ETC',
        MobileApp: 'TestApp',
        keyword: searchQuery,
        _type: 'json',
      });
    } else if (selectedRegion) {
      fetchData({
        serviceKey: 'YOUR_API_KEY',
        numOfRows: 10,
        pageNo: 1,
        MobileOS: 'ETC',
        MobileApp: 'TestApp',
        areaCode: selectedRegion,
        _type: 'json',
      });
    }
  }, [searchQuery, selectedRegion]);

  if (loading) return <p>✈️.✈️.✈️.✈️</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="main">
      {data.length > 0 ? (
        <ul className="result-list">
          {data.map((item) => (
            <li key={item.contentid} className="result-item">
              {item.title} (주소: {item.addr1 || '정보 없음'})
            </li>
          ))}
        </ul>
      ) : (
        <p>결과가 없습니다.</p>
      )}
    </div>
  );
};

export default Main;