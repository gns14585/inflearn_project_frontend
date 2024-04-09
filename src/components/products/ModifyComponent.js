import React, { useEffect, useState } from "react";
import { getOne } from "../../api/productsApi";
import FetchingModal from "../common/FetchingModal";

const initState = {
  tno: 0,
  pname: "",
  pdesc: "",
  price: 0,
  delFlag: false,
  uploadFileNames: [],
};

function ModifyComponent({ pno }) {
  const [product, setProduct] = useState(initState);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);
    getOne(pno).then((data) => {
      setProduct(data);
      setFetching(false);
    });
  }, [pno]);

  return (
    <div className="border-2 border-sky-200 mt-10 p-4">
      Product Modify Component
      {fetching ? <FetchingModal /> : <></>}
    </div>
  );
}

export default ModifyComponent;
