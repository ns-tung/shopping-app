import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "../components/Carousel";
import Product from "../components/Product";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getProducts } from "../redux/productsSlice";

function BrandProduct() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { products, loadingP } = useSelector((state) => state.products);
  const product = products.filter((item) => item.idBrand === id);
  const [limit, setLimit] = useState(4);
  const [result, setResult] = useState([]);
  const [search, setSearch] = useState(false);
  const image = `https://students.trungthanhweb.com/images/`;
  const searchPrice = (e) => {
    if (e != "") {
      var result = product.filter((product) => product.price < Number(e));
      setResult(result);
      setSearch(true);
    } else {
      setSearch(false);
    }
  };
  const searchName = (e) => {
    if (e != "") {
      var result = product.filter((product) => product.name.includes(e));
      setResult(result);
      setLimit(4);
      setSearch(true);
    } else {
      setSearch(false);
    }
  };
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return (
    <>
      <Header />
      <Carousel />
      <div className="container-fluid mb-5">
        <div className="row w-100">
          <div className="col-md-3 border-end">
            <div className="container text-center mb-3">
              <input
                type="text"
                className="form-control"
                onChange={(e) => searchName(e.target.value)}
                placeholder="Tên sản phẩm"
              />
              <hr />
              <input
                type="number"
                placeholder="Số tiền"
                onChange={(e) => searchPrice(e.target.value)}
                className="form-control"
              />
            </div>
          </div>
          <div className="col-md w-100">
            <div className="row w-100 ms-3" style={{ width: "100%" }}>
              {!search &&
                products &&
                product.length > 0 &&
                product.slice(0, limit).map((item, index) => (
                  <div key={index} className="col-md-3 mb-2">
                    <Product
                      image={image + item.images}
                      brandname={item.brandname}
                      catename={item.catename}
                      id={item.id}
                      name={item.name}
                      price={item.price}
                    />
                  </div>
                ))}
              {search &&
                result &&
                result.length > 0 &&
                result.slice(0, limit).map((item, index) => (
                  <div key={index} className="col-md-3 mb-2">
                    <Product
                      image={image + item.images}
                      brandname={item.brandname}
                      catename={item.catename}
                      id={item.id}
                      name={item.name}
                      price={item.price}
                    />
                  </div>
                ))}
            </div>
            {!search && limit < product.length && (
              <div className="row w-100 mt-3">
                <div className="ps-5 col-md-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => setLimit(limit + 4)}
                  >
                    Xem thêm
                  </button>
                </div>
              </div>
            )}
            {search && limit < result.length && (
              <div className="row w-100 mt-3">
                <div className="ps-5 col-md-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => setLimit(limit + 4)}
                  >
                    Xem thêm
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BrandProduct;
