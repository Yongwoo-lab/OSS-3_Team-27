import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const List = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const queryType = location.state?.type; // 'search' or 'region'
  const query = location.state?.query; // 검색어 또는 지역 이름

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'http://apis.data.go.kr/B551011/KorService1/areaBasedList1',
        {
          params: {
            serviceKey: '1iGefq76e+XNm2g6qKPNzO2XXWbqKvuXd/cEO9wnwOgz9W0nwbipqZbd/Ht1xp5WzqyvC9YkG4KuilH5S6WDgg==',
            numOfRows: 20,
            pageNo: 1,
            MobileOS: 'ETC',
            MobileApp: 'TestApp',
            _type: 'json',
            ...(queryType === 'region' && { areaCode: query }), // 지역 코드 조건
          },
        }
      );

      const items = response.data.response.body.items.item || [];
      setData(
        queryType === 'search'
          ? items.filter((item) => item.title.includes(query)) // 검색어 필터
          : items
      );
      setError(null);
    } catch (err) {
      console.error('API 호출 에러:', err);
      setError('데이터를 가져오는 중 문제가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [query, queryType]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="list-container">
      <h2>
        {queryType === 'search'
          ? `검색 결과: ${query}`
          : `${query} 지역 여행지 목록`}
      </h2>
      <ul className="result-list">
        {data.map((item) => (
          <li key={item.contentid}>
            {item.title} (주소: {item.addr1 || '정보 없음'})
          </li>
        ))}
      </ul>
      <Link to="/" className="back-button">
        뒤로가기
      </Link>
    </div>
  );
};

export default List;