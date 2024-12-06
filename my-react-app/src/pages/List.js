import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import Modal from "../components/Modal";
import "../components/Main.css";

const List = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryType = location.state?.type;
  const query = location.state?.query;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://apis.data.go.kr/B551011/KorService1/areaBasedList1",
        {
          params: {
            serviceKey: "1iGefq76e+XNm2g6qKPNzO2XXWbqKvuXd/cEO9wnwOgz9W0nwbipqZbd/Ht1xp5WzqyvC9YkG4KuilH5S6WDgg==",
            numOfRows: 20,
            pageNo: 1,
            MobileOS: "ETC",
            MobileApp: "TestApp",
            _type: "json",
            ...(queryType === "region" && { areaCode: query }),
          },
        }
      );

      const items = response.data.response.body.items.item || [];
      setData(
        queryType === "search"
          ? items.filter((item) => item.title.includes(query))
          : items
      );
      setError(null);
    } catch (err) {
      setError("데이터를 가져오는 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [query, queryType]);

  const openModal = (item) => {
    setModalData(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalData(null);
    setIsModalOpen(false);
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="list-container">
      <h2>
        {queryType === "search"
          ? `검색 결과: ${query}`
          : `${query} 지역 여행지 목록`}
      </h2>
      <div className="result-list">
        {data.map((item) => (
          <div
            key={item.contentid}
            className="list-item"
            onClick={() => openModal(item)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={item.firstimage || "https://via.placeholder.com/150"}
              alt={item.title}
              className="list-item-image"
            />
            <div className="list-item-content">
              <h3>{item.title}</h3>
              <p>
                <strong>주소:</strong> {item.addr1 || "정보 없음"}
              </p>
              <p>
                <strong>전화번호:</strong> {item.tel || "정보 없음"}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Link to="/" className="back-button">
        뒤로가기
      </Link>
      <Modal isOpen={isModalOpen} data={modalData} onClose={closeModal} />
    </div>
  );
};

export default List;