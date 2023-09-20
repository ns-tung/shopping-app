import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import Carousel from "../components/Carousel";
import Vouchers from "../components/Vouchers";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Products() {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(4);
  const [count, setCount] = useState(0);
  const image = `https://students.trungthanhweb.com/images/`;
  const token = localStorage.getItem("token");
  const getValue = async () => {
    fetch(
      `https://students.trungthanhweb.com/api/home1?apitoken=${token}&limit=${limit}`
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.products.length > 0) {
          setProducts(result.products);
          setCount(result.count);
        }
      });
  };

  const loadMore = () => {
    setLimit(limit + 4);
    getValue();
  };

  useEffect(() => {
    getValue();
  }, [limit]);

  return (
    <>
      <Header />
      <Carousel />
      <Vouchers />
      <div className="container mb-5">
        {products && products.length > 0 && (
          <div className="row mt-4">
            {products.map((item) => (
              <div className="col-md-3 mb-3" key={item.id}>
                <Product
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  catename={item.catename}
                  brandname={item.brandname}
                  image={image + item.images}
                />
              </div>
            ))}
          </div>
        )}
        <div className="text-center mt-3">
          <div className="col-md-10"></div>
          {limit <= count ? (
            <button
              className="btn btn-outline-secondary rounded-3"
              onClick={loadMore}
            >
              Xem thêm<i className="bi bi-chevron-right"></i>
            </button>
          ) : (
            <button className="btn btn-outline-secondary rounded-3 disabled">
              😅 Hết rồi fen
            </button>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Products;
