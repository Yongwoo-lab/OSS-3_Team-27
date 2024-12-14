import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import SortButtons from '../components/SortButtons';
import PlacesList from '../components/PlacesList';
import Pagination from '../components/Pagination';
import '../components/Main.css';

const SearchResults = ({ searchQuery, userInfo }) => {
  const location = useLocation();
  const query = location.state?.query || searchQuery; // 검색어 가져오기
  const [places, setPlaces] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState('A');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      fetchSearchResults(query, currentPage, sortOrder);
    }
  }, [query, currentPage, sortOrder]);

  const fetchSearchResults = async (keyword, page, order) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://apis.data.go.kr/B551011/KorService1/searchKeyword1', {
        params: {
          serviceKey: '1iGefq76e+XNm2g6qKPNzO2XXWbqKvuXd/cEO9wnwOgz9W0nwbipqZbd/Ht1xp5WzqyvC9YkG4KuilH5S6WDgg==',
          MobileApp: 'AppTest',
          MobileOS: 'ETC',
          pageNo: page,
          numOfRows: 10,
          listYN: 'Y',
          arrange: order,
          keyword: keyword,
          _type: 'json',
        },
      });
      const items = response.data.response.body.items?.item || [];
      setPlaces(items);
      setTotalPages(Math.ceil(response.data.response.body.totalCount / 10));
    } catch (err) {
      setError('데이터를 불러오는 중 문제가 발생했습니다.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="main-container">
      {isLoading ? (
        <p>데이터를 불러오는 중...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2>{`"${query}" 검색 결과`}</h2>
          {/* <SortButtons sortOrder={sortOrder} onSortChange={setSortOrder} /> */}
          {/* userInfo 전달 */}
          <PlacesList places={places} userInfo={userInfo} />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
      )}
    </div>
  );
};

export default SearchResults;