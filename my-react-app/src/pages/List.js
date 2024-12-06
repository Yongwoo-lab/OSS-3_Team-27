import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import Modal from '../components/Modal';

const List = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryType = location.state?.type; // 'search', 'region', 'festival', or 'stay'
  const query = location.state?.query?.trim();

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      let url;
      let params = {
        serviceKey: '1iGefq76e+XNm2g6qKPNzO2XXWbqKvuXd/cEO9wnwOgz9W0nwbipqZbd/Ht1xp5WzqyvC9YkG4KuilH5S6WDgg==',
        numOfRows: 50,
        pageNo: 1,
        MobileOS: 'ETC',
        MobileApp: 'TestApp',
        _type: 'json',
      };

      if (queryType === 'festival') {
        url = 'http://apis.data.go.kr/B551011/KorService1/searchFestival1';
        params = {
          ...params,
          listYN: 'Y',
          arrange: 'A',
          eventStartDate: new Date().toISOString().slice(0, 10).replace(/-/g, ''),
        };
      } else if (queryType === 'stay') {
        url = 'http://apis.data.go.kr/B551011/KorService1/searchStay1';
        params = {
          ...params,
          listYN: 'Y',
          arrange: 'A',
        };
      } else {
        url = 'http://apis.data.go.kr/B551011/KorService1/areaBasedList1';
      }

      const response = await axios.get(url, { params });
      const items = response.data.response.body.items.item || [];

      const filteredItems = items.filter(
        (item) =>
          (item.title && item.title.includes(query)) ||
          (item.addr1 && item.addr1.includes(query))
      );

      setData(filteredItems.length > 0 ? filteredItems : []);
    } catch (err) {
      setError('데이터를 가져오는 중 문제가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const fetchDetailInfo = async (contentId, contentTypeId) => {
    try {
      const response = await axios.get('http://apis.data.go.kr/B551011/KorService1/detailCommon1', {
        params: {
          serviceKey: '1iGefq76e+XNm2g6qKPNzO2XXWbqKvuXd/cEO9wnwOgz9W0nwbipqZbd/Ht1xp5WzqyvC9YkG4KuilH5S6WDgg==',
          numOfRows: 10,
          pageNo: 1,
          MobileOS: 'ETC',
          MobileApp: 'AppTest',
          contentId,
          contentTypeId,
          defaultYN: 'Y',
          firstImageYN: 'Y',
          areacodeYN: 'Y',
          catcodeYN: 'Y',
          addrinfoYN: 'Y',
          mapinfoYN: 'Y',
          overviewYN: 'Y',
          _type: 'json',
        },
      });

      const item = response.data.response.body.items.item[0];
      const detailData = {
        title: item.title || '정보 없음',
        address: item.addr1 || '정보 없음',
        phone: item.tel || '정보 없음',
        homepage: item.homepage || '정보 없음',
        overview: item.overview || '정보 없음',
        image: item.firstimage || null,
        zipcode: item.zipcode || '정보 없음',
      };
      setSelectedItem(detailData);
      setIsModalOpen(true);
    } catch (error) {
      console.error('세부 정보 가져오기 오류:', error);
    }
  };

  

  useEffect(() => {
    if (query) {
      fetchData();
    }
  }, [query, queryType]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;
  if (data.length === 0) return <p>검색 결과가 없습니다.</p>;

  return (
    <div className="list-container">
      <h2>{`검색 결과: "${query}"`}</h2>
      <ul className="result-list">
        {data.map((item) => (
          <li
            key={item.contentid}
            className="result-item"
            onClick={() => fetchDetailInfo(item.contentid, item.contenttypeid)}
          >
            <strong>{item.title}</strong>
            <p>주소: {item.addr1 || '정보 없음'}</p>
            {item.firstimage && (
              <img src={item.firstimage} alt={item.title} style={{ width: '100px' }} />
            )}
            <p>전화번호: {item.tel || '정보 없음'}</p>
          </li>
        ))}
      </ul>
      <Link to="/" className="back-button">
        뒤로가기
      </Link>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} data={selectedItem} />
    </div>
  );
};

export default List;