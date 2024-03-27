import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useState } from "react";

const getNum = (param, defaultValue) => {
  if (!param) {
    return defaultValue;
  }
  return parseInt(param);
};

const useCustomMove = () => {
  const navigate = useNavigate();

  const [refresh, setRefresh] = useState(false);

  const [queryParams] = useSearchParams();

  const page = getNum(queryParams.get("page"), 1); // 없으면 1페이지 있으면 제대로된 정보를 가져오기 , 를 기준으로 구분
  const size = getNum(queryParams.get("size"), 10);

  // page=3&size=10
  const queryDefault = createSearchParams({ page, size }).toString();

  const moveToList = (pageParam) => {
    let queryStr = "";

    if (pageParam) {
      const pageNum = getNum(pageParam.page, 1);
      const sizeNum = getNum(pageParam.size, 10);

      queryStr = createSearchParams({
        page: pageNum,
        size: sizeNum,
      }).toString();
    } else {
      queryStr = queryDefault;
    }

    setRefresh(!refresh); // 상태를 계속 바꿈으로써 현재 선택된 페이지를 또 클릭가능함

    navigate({ pathname: `../list`, search: queryStr });
  };

  const moveToModify = (num) => {
    navigate({
      pathname: `../modify/${num}`,
      search: queryDefault,
    });
  };

  const moveToRead = (num) => {
    navigate({
      pathname: `../read/${num}`,
      search: queryDefault,
    });
  };

  return { moveToList, moveToModify, moveToRead, page, size, refresh };
};

export default useCustomMove;
