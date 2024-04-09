import React, { useRef, useState } from "react";

const initState = {
  pname: "",
  pdesc: "",
  price: 0,
  files: [],
};

function AddComponent(props) {
  const [product, setProduct] = useState(initState);
  const uploadRef = useRef();

  return <div></div>;
}

export default AddComponent;
