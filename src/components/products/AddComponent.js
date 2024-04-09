import React, { useRef, useState } from "react";
import { postAdd } from "../../api/productsApi";
import FetchingModal from "../common/FetchingModal";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";

const initState = {
  pname: "",
  pdesc: "",
  price: 0,
  files: [],
};

function AddComponent(props) {
  const [product, setProduct] = useState(initState);
  const uploadRef = useRef();
  const [fetching, setFetching] = useState(false); // 모달 상태
  const [result, setResult] = useState(false); // 모달 사라졌을때 경로이동 상태
  const { moveToList } = useCustomMove(); // 리스트로 이동하는 커스텀훅

  const handleChangeProduct = (e) => {
    // 이렇게 코드를 작성함으로써 기존에 useState로 각 속성을 다 만들 필요 없이 미리 initState로 작성을 해놓으면 useState 중복사용을 줄일 수 있음.
    product[e.target.name] = e.target.value;
    setProduct({ ...product });
  };

  const handleClickAdd = (e) => {
    console.log(product);
    const formData = new FormData();
    const files = uploadRef.current.files;

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    formData.append("pname", product.pname);
    formData.append("pdesc", product.pdesc);
    formData.append("price", product.price);

    console.log(formData);

    setFetching(true);

    postAdd(formData).then((data) => {
      setFetching(false);
      setResult(data.result);
    });
  };

  const closeModal = () => {
    setResult(null);
    moveToList({ page: 1 });
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {/* --------------------------- pname 로직 --------------------------- */}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Product Name</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="pname"
            type="text"
            value={product.pname}
            onChange={handleChangeProduct}
          />
        </div>
      </div>

      {/* --------------------------- pdesc 로직 --------------------------- */}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Desc</div>
          <textarea
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
            name="pdesc"
            rows="4"
            onChange={handleChangeProduct}
            value={product.pdesc}
          />
        </div>
      </div>

      {/* --------------------------- price 로직 --------------------------- */}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Price</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            type="number"
            name="price"
            value={product.price}
            onChange={handleChangeProduct}
          />
        </div>
      </div>

      {/* --------------------------- 파일업로드 로직 --------------------------- */}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Files</div>
          <input
            ref={uploadRef}
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            type="file"
            multiple={true}
          />
        </div>
      </div>

      {/* --------------------------- 저장버튼 로직 --------------------------- */}
      <div className="flex justify-end">
        <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
          <button
            type="bytton"
            className="rounded p-4 w-36 bg-blue-500 text-xl text-white"
            onClick={handleClickAdd}
          >
            ADD
          </button>
        </div>
      </div>

      {/* --------------------------- 모달 로직 --------------------------- */}
      {fetching ? <FetchingModal /> : <></>}

      {result ? (
        <ResultModal
          callbackFn={closeModal}
          title={"Product Add Result"}
          content={`${result}번 상품 등록 완료`}
        ></ResultModal>
      ) : (
        <></>
      )}
    </div>
  );
}

export default AddComponent;
