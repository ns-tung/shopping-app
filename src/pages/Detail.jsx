import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Swiper, SwiperSlide } from "swiper/react";
import Product from "../components/Product";
import Swal from "sweetalert2";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import "swiper/css";
import formatCurrency from "../helper/formatCurrency";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

function Detail() {
  
  const { id } = useParams();
  const storedCart = JSON.parse(localStorage.getItem("cart"));

  const addToCart = () => {
    let cart = [];
    if (storedCart && storedCart != null) {
      cart = [...storedCart];
    }
    let check = false;
    cart.forEach((e) => {
      if (e[0] == id) {
        e[1]++;
        check = true;
      }
    });
    if (!check) {
      cart.push([Number(id), 1]);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    Toast.fire({
      icon: "success",
      title: "Đã thêm vào giỏ",
    });
  };

  const baseURL = "https://students.trungthanhweb.com/api/single";
  const token = localStorage.getItem("token");
  const [product, setProduct] = useState({});
  const [brandProducts, setBrandProducts] = useState([]);
  const [cateProducts, setCateProducts] = useState([]);
  const [gallery, setGallery] = useState([]);
  const image = `https://students.trungthanhweb.com/images/`;

  const getData = () => {
    axios.get(`${baseURL}?apitoken=${token}&id=${id}`).then((res) => {
      if (res.data) {
        setBrandProducts(res.data.brandproducts);
        setCateProducts(res.data.cateproducts);
        setProduct(res.data.products[0]);
        setGallery(res.data.gallery);
      }
    });
  };

  const detail = product.content;
  const detailClean = DOMPurify.sanitize(detail, {
    USE_PROFILES: { html: true },
  });

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="row g-5 mb-5">
          <div className="col-12 col-md-7">
            <Carousel showStatus={true} showArrows={false}>
              {gallery &&
                gallery.map((item) => (
                  <div key={item.id}>
                    <img className="img-fluid" src={item} alt={item.name} />
                  </div>
                ))}
            </Carousel>
          </div>
          <div className="col-12 col-md-5">
                <h2>{product.name}</h2>
                <hr className="border-secondary" />
                <div className="py-2">
                    <h4 className="text-danger fw-bold">{formatCurrency(Number(product.price))}</h4>
                    <h6 className="mb-3">Giảm giá <span className="badge bg-danger">{product.discount}%</span></h6>
                </div>
                <div className="pb-3">
                    <p>Phân loại: <span>{product.catename}</span></p>
                    <p>Thương hiệu: <span>{product.brandname}</span></p>
                </div>
                <div className="row row-cols-2 mb-3">
                    <div className="col">
                        <div className="d-grid">
                            <button type="button" className="btn btn-outline-danger border-2">Trả góp</button>
                        </div>
                    </div>
                    <div className="col">
                        <div className="d-grid">
                            <button type="button" className="btn btn-outline-danger border-2">Mua ngay</button>
                        </div>
                    </div>
                </div>
                <div className="d-grid">
                <button type="button" className="btn btn-danger addToCart" 
                    onClick={() => addToCart()}>
                  <i className="bi bi-bag-plus me-2"></i>
                  Thêm vào giỏ
                  </button>
                </div>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col">
          <h2 className="mb-4">Thông tin sản phẩm</h2>
            <div className="border border-light-subtle rounded-4 overflow-hidden bg-white p-4 p-md-5">
          {parse(detailClean)}
            </div>
          </div>
          </div>
        <div className="row row-cols-1 row-cols-md-2 g-3 g-md-5">
          {brandProducts && brandProducts.length > 0 && (
            <div className="col">
              <h2 className="mb-3">Sản phẩm cùng thương hiệu</h2>
              <Swiper
                spaceBetween={10}
                slidesPerView={2}
              >
                {brandProducts.map((item) => (
                  <SwiperSlide key={item.id}>
                    <Product
                      key={item.id}
                      name={item.name}
                      image={image + item.image}
                      id={item.id}
                      price={item.price}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
          {cateProducts && cateProducts.length > 0 && (
            <div className="col">
              <h2 className="mb-3">Sản phẩm cùng loại</h2>
              <Swiper
                spaceBetween={10}
                slidesPerView={2}
              >
                {cateProducts.map((item) => (
                  <SwiperSlide key={item.id}>
                    <Product
                      key={item.id}
                      name={item.name}
                      image={image + item.image}
                      id={item.id}
                      price={item.price}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Detail;
