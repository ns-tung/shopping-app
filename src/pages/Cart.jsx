import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart, deleteItem, updateQuantity } from "../redux/cartSlice";
import { getProducts } from "../redux/productsSlice";
import "../css/cart.css";
import Swal from "sweetalert2";
import Header from "../components/Header";
import Footer from "../components/Footer";
import formatCurrency from "../helper/formatCurrency";

function Cart() {
  const dispatch = useDispatch();
  var { carts, loading2 } = useSelector((state) => state.carts);
  const [cart] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneerr, setPhoneErr] = useState(1);
  const [phone, setPhone] = useState("");
  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(4);
  const [bills, setBill] = useState([]);
  const validPhone = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
  const [idBill, setIdBill] = useState(0);
  const [billDetail, setBillDetail] = useState([]);
  const [billInfo, setBillInfo] = useState({});
  const [total, setTotal] = useState(0);
  const imgSrc = "https://students.trungthanhweb.com/images/";
  const validate = (e) => {
    if (e.match(validPhone)) {
      setPhoneErr(0);
      setPhone(e);
    } else {
      setPhoneErr(1);
    }
  };
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1700,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  const deleteCart = (i) => {
    Swal.fire({
      icon: "question",
      text: "Bạn muốn xóa sản phẩm ?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Đúng",
      denyButtonText: `Không`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(deleteItem(i));
      } else if (result.isDenied) {
      }
    });
  };
  const getBill = async () => {
    fetch(
      "https://students.trungthanhweb.com/api/bills1?apitoken=" +
        localStorage.getItem("token") +
        "&limit=" +
        limit
    )
      .then((res) => res.json())
      .then((res) => {
        setCount(res.count);
        setBill(res.bills);
      });
  };
  const submitBill = async () => {
    if (name == "" || address == "" || phone == "") {
      Toast.fire({
        icon: "error",
        title: "Thiếu thông tin nhận hàng",
      });
    } else {
      var data = new URLSearchParams();
      var cart = JSON.parse(localStorage.getItem("cart"));
      data.append("apitoken", localStorage.getItem("token"));
      data.append("tenKH", name);
      data.append("phone", phone);
      data.append("address", phone);
      data.append("cart", JSON.stringify(cart));
      fetch("https://students.trungthanhweb.com/api/createBill", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.check == true) {
            Toast.fire({
              icon: "success",
              title: "Đặt hàng thành công",
            }).then(() => {
              localStorage.removeItem("cart");
              window.location.replace("/products");
            });
          } else {
          }
        });
    }
  };
  const getDetailBill = async (id) => {
    setIdBill(id);

    if (idBill != 0) {
      await fetch(
        "https://students.trungthanhweb.com/api/singlebill?apitoken=" +
          localStorage.getItem("token") +
          "&id=" +
          id
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.check == true) {
            var sum = 0;
            setBillDetail(res.result);
            setBillInfo(res.bill[0]);
            res.result.forEach((el) => {
              sum += Number(el.price) * Number(el.qty);
            });
            setTotal(sum);
          }
        });
      window.scroll({ top: 0, behavior: "smooth" });
    }
  };
  const updateQuantityF = async (id, qty) => {
    dispatch(updateQuantity({ id: id, qty: qty }));
    window.location.reload();
  };
  const updateLimit = () => {
    setLimit(limit + 4);
    if (limit < count) {
      getBill();
    }
  };
  useEffect(() => {
    if (
      !localStorage.getItem("token") ||
      localStorage.getItem("token") == null
    ) {
      window.location.replace("/login");
    }
    getBill();
    dispatch(getCart());
    dispatch(getProducts());
  }, []);
  return (
    <>
      <Header />
      <div className="container my-5">
        {localStorage.getItem("cart") ? (
          <div style={{ minHeight: "529px" }} className="row mt-4">
            <div className="col-md-6">
              {localStorage.getItem("cart") && carts.length > 0 && (
                <div className="table-responsive">
                  <table className="table table-secondary">
                    <thead className="table-dark">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Hình ảnh </th>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Thành tiền</th>
                        <th scope="col">Xóa</th>
                      </tr>
                    </thead>
                    <tbody>
                      {carts.map((item, index) => (
                        <tr key={index} className="">
                          <th scope="row">{++index}</th>
                          <td>
                            <a href={`/detail/${item[0]}`}>
                              <img
                                style={{ width: "100px" }}
                                src={item[3]}
                                alt=""
                              />
                            </a>
                          </td>
                          <td className="text-left align-middle">
                            <a
                              style={{ textDecoration: "none" }}
                              href={`/detail/${item[0]}`}
                            >
                              {item[1]}
                            </a>
                          </td>
                          <td className="text-left align-middle">
                            {formatCurrency(item[5])}
                          </td>
                          <td
                            className="text-left align-middle"
                            style={{ width: "20%" }}
                          >
                            <input
                              type="number"
                              className="form-control"
                              onChange={(e) =>
                                updateQuantityF(item[0], Number(e.target.value))
                              }
                              placeholder=""
                              value={item[4]}
                            />
                          </td>
                          <td className="text-left align-middle">
                            {formatCurrency(item[6])}
                          </td>
                          <td className="text-left align-middle">
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => deleteCart(item[0])}
                            >
                              Xóa
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            {!localStorage.getItem("cart") || loading2 || cart.length != 0 ? (
              ""
            ) : (
              <div
                className="col-md p-3 border rounded"
                style={{ height: "160px", background: "#ebebeb" }}
              >
                <div className="row">
                  <div className="col-md">
                    <label htmlFor="">Tên người nhận</label>
                    <input
                      type="text"
                      className={`form-control ${
                        name == "" ? "border border-danger" : ""
                      }`}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Tên người nhận"
                    />
                  </div>
                  <div className="col-md ">
                    <label htmlFor="">Địa chỉ </label>
                    <input
                      type="text"
                      className={`form-control ${
                        address == "" ? "border border-danger" : ""
                      }`}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Địa chỉ"
                    />
                  </div>
                  <div className="col-md">
                    <label htmlFor="">Điện thoại</label>
                    <input
                      type="text"
                      className={`form-control ${
                        phoneerr == 1 ? "border border-danger" : ""
                      }`}
                      onKeyUp={(e) => validate(e.target.value)}
                      placeholder="Số điện thoại"
                    />
                  </div>
                  <div className="col-md">
                    <button
                      className={`btn btn-primary mt-4`}
                      onClick={submitBill}
                    >
                      Chốt đơn
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          ""
        )}

        {carts.length == 0 && (
          <div className="container my-5">
            <h1 className="mb-5">Đơn hàng</h1>
            <div className="row align-items-start border border-light-subtle bg-white overflow-hidden rounded-4 g-0">
              <div className="col-md-3">
                <ul className="list-group list-group-flush">
                  {carts.length == 0 &&
                    bills.slice(0, limit).map((item) => (
                      <li
                        role="button"
                        key={item.id}
                        onClick={(e) => getDetailBill(item.id)}
                        className={`list-group-item an-order px-4 py-3 border-top-0 border-end border-bottom-0 border-start-0 ${
                          item.id == idBill
                            ? "text-primary bg-primary-subtle border-2 border-primary"
                            : ""
                        }`}
                      >
                        <p className="mb-2 small">#{item.id}</p>
                        <p className="text-body-tertiary mb-2 small">
                          Tên: {item.tenKH}
                        </p>
                        <p className="text-body-tertiary mb-2 small">
                          Ngày mua: {item.created_at}
                        </p>
                      </li>
                    ))}
                </ul>
                {limit < count && (
                  <button className="btn btn-primary" onClick={updateLimit}>
                    Xem thêm
                  </button>
                )}
              </div>
              {billDetail && billDetail.length ? 
                <div className="col-md-9 px-5 py-4">
                  <div className="table-responsive">
                    <table className="table table-borderless">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            colSpan="4"
                            className="text-light-emphasis py-3"
                          >
                            Thông tin thanh toán
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border-top py-3">
                            Mã:{" "}
                            <span className="text-primary">#{billInfo.id}</span>
                          </td>
                          <td className="border-top py-3">
                            Tên:{" "}
                            <span className="text-primary">
                              {billInfo.tenKH}
                            </span>
                          </td>
                          <td className="border-top py-3">
                            Số điện thoại:{" "}
                            <span className="text-primary">
                              {billInfo.phone}
                            </span>
                          </td>
                          <td className="border-top py-3">
                            Địa chỉ:{" "}
                            <span className="text-primary">
                              {billInfo.address}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <hr className="opacity-100 border-2" />
                  <div className="table-responsive mb-5">
                    <table className="table table-borderless m-0">
                      <thead>
                        <tr>
                          <th scope="col" className="text-light-emphasis py-4">
                            Ảnh
                          </th>
                          <th scope="col" className="text-light-emphasis py-4">
                            Tên sản phẩm
                          </th>
                          <th scope="col" className="text-light-emphasis py-4">
                            Giá
                          </th>
                          <th scope="col" className="text-light-emphasis py-4">
                            Số lượng
                          </th>
                          <th scope="col" className="text-light-emphasis py-4">
                            Tổng phụ
                          </th>
                        </tr>
                      </thead>
                      <tbody id="bill" className="table-group-divider">
                        {billDetail.map((item) => (
                          <tr key={item.id}>
                            <th
                              scope="row"
                              className="border-top text-start py-3"
                              style={{ width: "12%" }}
                            >
                              <img
                                src={imgSrc + item.image}
                                alt={item.productname}
                                className="img-fluid"
                              />
                            </th>
                            <td className="border-top py-3">
                              {item.productname}
                            </td>
                            <td className="border-top py-3">
                              {formatCurrency(item.price)}
                            </td>
                            <td className="border-top py-3">
                              {item.qty < 10 ? "0" + item.qty : item.qty}
                            </td>
                            <td className="border-top py-3 text-primary-emphasis">
                              {formatCurrency(item.price * item.qty)}
                            </td>
                          </tr>
                        ))}
                        <tr>
                          <th
                            scope="row"
                            colSpan="4"
                            className="border-top text-light-emphasis py-3 fw-bold"
                          >
                            Tổng cộng:
                          </th>
                          <td className="border-top text-primary py-3">
                            {formatCurrency(total)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                :
                <div className="col-md-9 px-5 py-4">
                <div style={{height: "200px"}}>
                </div>
                <div className="text-center py-5">
                    <i className="bi bi-arrow-left-circle-fill fs-1 text-primary"></i>
                    <p>Chọn một đơn hàng để xem thông tin</p>
                </div>
            </div>
              }
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Cart;
