import React from "react";

function PageComponent({ serverData, movePage }) {
  return (
    // 이전 데이터가 있다면 그리고 이전 페이지로 이동기능 prev 없다면 빈값
    <div className="m-6 flex justify-center">
      {serverData.prev ? (
        <div
          style={{ cursor: "pointer" }}
          className="m-2 p-2 w-16 text-center font-bold text-blue-400"
          onClick={() => movePage({ page: serverData.prevPage })}
        >
          Prev
        </div>
      ) : (
        <></>
      )}

      {serverData.pageNumList.map((pageNum) => (
        <div
          style={{ cursor: "pointer" }}
          key={pageNum}
          className={`m-2 p-2 w-12 text-center rounded shadow-md text-white ${serverData.current === pageNum ? "bg-gray-500" : "bg-blue-400"}`}
          onClick={() => movePage({ page: pageNum })}
        >
          {pageNum}
        </div>
      ))}

      {/* 다음 데이터가 있다면 그리고 다음 페이지로 이동 기능 next 없다면 빈값 */}
      {serverData.next ? (
        <div
          style={{ cursor: "pointer" }}
          className="m-2 p-2 w-16 text-center font-bold text-blue-400"
          onClick={() => movePage({ page: serverData.nextPage })}
        >
          Next
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default PageComponent;
