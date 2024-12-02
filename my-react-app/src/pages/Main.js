import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from '../components/Slider';
import SortButtons from '../components/SortButtons';
import PlacesList from '../components/PlacesList';
import Pagination from '../components/Pagination';
import '../components/Main.css';

const Main = ({ selectedRegion }) => {
  const [places, setPlaces] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState('P');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedRegion) {
      fetchPlaces(currentPage, sortOrder);
    } else {
      setPlaces([]);
    }
  }, [selectedRegion, currentPage, sortOrder]);

  const fetchPlaces = async (page, order) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://apis.data.go.kr/B551011/KorService1/areaBasedList1', {
        params: {
          serviceKey: '1iGefq76e+XNm2g6qKPNzO2XXWbqKvuXd/cEO9wnwOgz9W0nwbipqZbd/Ht1xp5WzqyvC9YkG4KuilH5S6WDgg==',
          MobileApp: 'AppTest',
          MobileOS: 'ETC',
          pageNo: page,
          numOfRows: 10,
          listYN: 'Y',
          arrange: order,
          contentTypeId: 12,
          areaCode: selectedRegion,
          _type: 'json',
        },
      });
      const items = response.data.response.body.items.item || [];
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
      {!selectedRegion ? (
        <Slider />
      ) : isLoading ? (
        <p>데이터를 불러오는 중...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <SortButtons sortOrder={sortOrder} onSortChange={setSortOrder} />
          <PlacesList places={places} />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
      )}
    </div>
  );
};

export default Main;