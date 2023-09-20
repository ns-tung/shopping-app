import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrand } from "../redux/brandSlice";
import { getCates } from "../redux/cateSlice";
import logo from "../logo.png";
import toast from "react-hot-toast";

const notify = () => {
  toast.success("Ok, see ya!", { duration: 1000, icon: "👋" });
};

function Header() {
  if (
    !localStorage.getItem("token") ||
    localStorage.getItem("token") === null
  ) {
    window.location.replace("/");
  }

  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [cart, setCart] = useState(0);
  const { brands, loading1 } = useSelector((state) => state.brand);
  const { cates, loading } = useSelector((state) => state.cate);
  useEffect(() => {
    dispatch(getBrand());
    dispatch(getCates());
    setInterval(() => {
      const storedCart = JSON.parse(localStorage.getItem("cart"));
      if (storedCart) {
        setCart(storedCart.length);
      } else {
        setCart(0);
      }
    }, 1000);
  }, []);
  const logout = () => {
    if (token && token !== "") {
      localStorage.removeItem("token");
      localStorage.removeItem("cart");
    }
    notify();
    window.location.reload();
  };
  return (
    <header className="header sticky-top">
      <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div className="container">
          <a className="navbar-brand" href={"/products"}>
            <img
              className="img-fluid"
              src={logo}
              width="100px"
              alt="NoobDunk"
            />
          </a>
          <div className="vr d-none d-lg-block bg-light ms-2 me-3 opacity-100"></div>
          <div className="d-flex align-items-center">
            <ul className="navbar-nav me-auto d-block d-lg-none mb-lg-0 align-items-center">
              {!token ? (
                <li id="login-mb" className="nav-item">
                  <a
                    href="/"
                    className="nav-link text-nowrap me-lg-3"
                    id="loginBtn-mb"
                    data-bs-toggle="modal"
                    data-bs-target="#loginModal"
                  >
                    Đăng nhập
                  </a>
                </li>
              ) : (
                <li id="logout-mb" className="nav-item">
                  <a
                    href="/"
                    className="nav-link text-nowrap me-lg-3"
                    onClick={logout}
                  >
                    Đăng xuất
                  </a>
                </li>
              )}
            </ul>
            <div className="vr bg-light d-inline-block d-lg-none ms-4 me-3 opacity-100"></div>
            <a
              type="button"
              href="/cart"
              className="btn btn-outline-secondary d-inline-block d-lg-none position-relative me-2 fs-4 border-0 rounded-3 text-light"
            >
              <i className="bi bi-bag"></i>
              <span
                id="cartCount-mb"
                className="position-absolute translate-middle badge rounded-pill bg-danger fw-normal"
                style={{ fontSize: ".375em", top: "75%", left: "75%" }}
              >
                {cart}
              </span>
            </a>
            <button
              className="navbar-toggler d-inline-block d-lg-none rounded-3 border-light"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link me-auto me-lg-3 active"
                  aria-current="page"
                  href={"/products"}
                >
                  Products
                </a>
              </li>
              <li className="nav-item dropdown">
                {!token ? (
                  <a
                    href="/"
                    className="nav-link me-auto me-lg-3 pe-none user-select-none"
                  >
                    Thương hiệu
                  </a>
                ) : (
                  <>
                    <a
                      href="/"
                      className="nav-link me-auto me-lg-3 dropdown-toggle"
                      data-bs-toggle="dropdown"
                    >
                      Thương hiệu
                    </a>
                    <ul className="dropdown-menu">
                      {brands.map((brand) => (
                        <li key={brand.id}>
                          <a
                            className="dropdown-item"
                            href={`/brand/${brand.id}`}
                          >
                            {brand.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </li>
              <li className="nav-item dropdown">
                {!token ? (
                  <a
                    href="/"
                    className="nav-link me-auto me-lg-3 pe-none user-select-none"
                  >
                    Danh mục
                  </a>
                ) : (
                  <>
                    <a
                      href="/"
                      className="nav-link me-auto me-lg-3 dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                    >
                      Danh mục
                    </a>
                    <ul className="dropdown-menu">
                      {cates.map((cate) => (
                        <li key={cate.id}>
                          <a
                            className="dropdown-item"
                            href={`/category/${cate.id}`}
                          >
                            {cate.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </li>
              <li className="nav-item">
                <a className="nav-link me-auto me-lg-3" href="/bills">
                  Đơn hàng
                </a>
              </li>
            </ul>
            <form className="d-flex align-items-center" role="search">
              <ul className="navbar-nav d-none d-lg-block me-auto mb-lg-0">
                {!token ? (
                  <li id="login" className="nav-item">
                    <a
                      href="/"
                      className="nav-link text-nowrap me-lg-3"
                      id="loginBtn"
                      data-bs-toggle="modal"
                      data-bs-target="#loginModal"
                    >
                      Đăng nhập
                    </a>
                  </li>
                ) : (
                  <li id="logout" className="nav-item">
                    <a
                      href="/"
                      className="nav-link text-nowrap me-lg-3"
                      onClick={logout}
                    >
                      Đăng xuất
                    </a>
                  </li>
                )}
              </ul>
              <div className="vr d-none d-lg-block bg-light ms-2 me-3 opacity-100"></div>
              <a
                type="button"
                href="/cart"
                className="btn btn-outline-secondary d-none d-lg-block position-relative me-2 fs-4 border-0 text-light"
              >
                <i className="bi bi-bag"></i>
                <span
                  id="cartCount"
                  className="position-absolute translate-middle badge rounded-pill bg-danger fw-normal"
                  style={{ fontSize: ".375em", top: "75%", left: "75%" }}
                >
                  {cart}
                </span>
              </a>
              <input
                id="inputSearch"
                className="form-control border-light"
                type="search"
                placeholder="Tìm kiếm"
              />
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
