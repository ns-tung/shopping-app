import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getSingle } from "../redux/productsSlice";
import formatCurrency from "../helper/formatCurrency";
import toast from "react-hot-toast";

const notify = () => {
  toast.dismiss();
  toast("Đã thêm vào giỏ!", { icon: "😘", duration: 2000 });
};

function Product(props) {
  const dispatch = useDispatch();
  const [id, setID] = useState(0);
  const { products, loadingP, singleProduct } = useSelector(
    (state) => state.products
  );

  // const selectProduct = (e) => {
  //   setID(e);
  //   const result = dispatch(getSingle(e));
  //   console.log(result);
  // };

  const addToCart = (pId) => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    let cart = [];

    if (storedCart && storedCart !== null) {
      cart = [...storedCart];
    }
    let check = false;
    cart.forEach((e) => {
      if (e[0] === pId) {
        e[1]++;
        check = true;
      }
    });
    if (check === false) {
      cart.push([Number(pId), 1]);
    }
    localStorage.setItem("cart", JSON.stringify(cart));

    notify();
  };
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return (
    <div className="col">
      <div className="card rounded-4 pt-3 bg-white border-light-subtle">
        <img src={props.image} className="card-img-top" alt={props.name} />
        <div className="card-body">
          <p>
            <span className="badge text-bg-secondary me-1">
              {props.catename}
            </span>
            <span className="badge text-bg-dark">{props.brandname}</span>
          </p>
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text text-danger">{formatCurrency(props.price)}</p>
          <div className="d-grid d-lg-flex gap-2 gap-lg-1">
            <a
              href={`/detail/${props.id}`}
              className="btn btn-sm rounded-3 btn-outline-secondary me-0 me-lg-2"
            >
              Xem
            </a>
            <button
              className="btn btn-sm rounded-3 btn-danger"
              onClick={() => addToCart(Number(props.id))}
            >
              <i className="bi bi-bag-plus me-1"></i>Thêm vào giỏ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
