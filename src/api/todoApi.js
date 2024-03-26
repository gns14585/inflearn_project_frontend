import async from "async";
import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080";

const prefix = `${API_SERVER_HOST}/api/todo`;

// 비동기통신은 async 사용
export const getOne = async (tno) => {
  const res = await axios.get(`${prefix}/${tno}`);

  return res.data;
};

export const getList = async (pageParam) => {
  const { page, size } = pageParam;

  const res = await axios.get(`${prefix}/list`, { params: { page, size } });

  return res.data; // async의 모든 리턴은 비동기(Promise)
};
