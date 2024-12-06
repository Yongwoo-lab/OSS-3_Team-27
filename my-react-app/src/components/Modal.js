import React from "react";

const Modal = ({ isOpen, data, onClose }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{data.title}</h3>
        <p><strong>주소:</strong> {data.addr1 || "정보 없음"}</p>
        <p><strong>전화번호:</strong> {data.tel || "정보 없음"}</p>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default Modal;