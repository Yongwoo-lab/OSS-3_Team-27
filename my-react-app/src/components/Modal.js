import React from 'react';
import './Main.css';

const Modal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <div className="modal-body">
          <h3>{data.title || '제목 없음'}</h3>
          <p><strong>주소:</strong> {`${data.addr1 || '정보 없음'} ${data.addr2 || ''}`}</p>
          <p><strong>전화번호:</strong> {data.tel || '정보 없음'}</p>
          <p><strong>등록일:</strong> {data.eventenddate || '정보 없음'}</p>
          <p><strong>수정일:</strong> {data.overview || '정보 없음'}</p>
          <p><strong>GoodStay:</strong> {data.goodstay === '1' ? 'Yes' : 'No'}</p>
          <p><strong>한옥 여부:</strong> {data.hanok === '1' ? 'Yes' : 'No'}</p>
          {data.firstimage && (
            <img src={data.firstimage} alt={data.title || '이미지'} className="modal-image" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;