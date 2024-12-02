import React from 'react';
import './Main.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // 현재 페이지가 속한 그룹 계산
  const itemsPerGroup = 10; // 그룹당 버튼 개수
  const currentGroup = Math.ceil(currentPage / itemsPerGroup); // 현재 그룹 번호
  const startPage = (currentGroup - 1) * itemsPerGroup + 1; // 그룹 시작 페이지 번호
  const endPage = Math.min(currentGroup * itemsPerGroup, totalPages); // 그룹 끝 페이지 번호

  return (
    <div className="pagination">
      {/* 이전 그룹으로 이동 */}
      {startPage > 1 && (
        <button
          className="pagination-button"
          onClick={() => onPageChange(startPage - 1)}
        >
          &laquo;
        </button>
      )}

      {/* 현재 그룹의 페이지 버튼 */}
      {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
        <button
          key={index}
          className={`pagination-button ${currentPage === startPage + index ? 'active' : ''}`}
          onClick={() => onPageChange(startPage + index)}
        >
          {startPage + index}
        </button>
      ))}

      {/* 다음 그룹으로 이동 */}
      {endPage < totalPages && (
        <button
          className="pagination-button"
          onClick={() => onPageChange(endPage + 1)}
        >
          &raquo;
        </button>
      )}
    </div>
  );
};

export default Pagination;