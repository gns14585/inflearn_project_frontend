import React, { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { getList } from "../../api/todoApi";
import PageComponent from "../common/PageComponent";

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

function ListComponent(props) {
  const { page, size, refresh, moveToList, moveToRead } = useCustomMove();

  // 기본값을 initState를 넣어도되고 null로 넣어도됨, 단 null로 넣을경우 if문 사용해서 스피너 넣어주거나 null일경우 대비해서 작성해야함
  const [serverData, setServerData] = useState(initState);

  useEffect(() => {
    getList({ page, size }).then((data) => {
      console.log(data);
      setServerData({ ...data, current: page });
    });
  }, [page, size, refresh]);

  return (
    <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
      <div className="flex flex-wrap mx-auto justify-center p-6">
        {serverData.dtoList.map((todo) => (
          <div
            key={todo.tno}
            className="w-full min-w-[400px] p-2 m-2 rounded shadow-md"
            onClick={() => moveToRead(todo.tno)}
          >
            <div className="flex">
              <div className="font-extrabold text-2xl p-2 w-1/12">
                {todo.tno}
              </div>
              <div className="text-1xl m-1 p-2 w-8/12 font-extrabold">
                {todo.title}
              </div>
              <div className="text-1xl m-1 p-2 w-8/12 font-extrabold">
                {todo.dueDate}
              </div>
            </div>
          </div>
        ))}
      </div>

      <PageComponent serverData={serverData} movePage={moveToList} />
    </div>
  );
}

export default ListComponent;
