import React, { useEffect, useState } from "react";
import "../css/login.css";
import logo from "../logo-dark.png";
import toast from "react-hot-toast";

function Login() {
  const url = "https://students.trungthanhweb.com/api/checkLoginhtml";
  const [email, setEmail] = useState("");
  const notify = (status, message) => {
    switch (status) {
      case true:
        setTimeout(() => {
          toast.dismiss();
          toast.success(message, { icon: "😁" });
        }, 300);
        break;
      case false:
        setTimeout(() => {
          toast.dismiss();
          toast.error(message, { icon: "😏" });
        }, 300);
        break;
      default:
        toast.dismiss();
        toast.loading(message);
        break;
    }
  };

  const checkLogin = async () => {
    // if (email && email !== "") {
      const data = new URLSearchParams();
      data.append("email", "tungns.wd@gmail.com");
      notify("loading", "Chờ xíu nha ...");
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: data,
      }).catch((error) => {
        console.log(error);
      });
      const content = await response.json();
      console.log(content.check);
      if (content.check) {
        notify(content.check, "Ngon rồi!");
        localStorage.setItem("token", content.apitoken);
        setTimeout(() => window.location.replace("/products"), 1000);
      } else {
        notify(content.check, "Email không đúng!");
      }
    // }
    setEmail("");
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <>
      <main className="form-signin w-100 m-auto">
        <form action="email">
          <img className="mb-4" src={logo} alt="" width={80} height="auto" />
          <h5 className="mb-3 fw-normal">Đăng nhập để sử dụng</h5>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control rounded-3 px-3"
              id="floatingInput"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="floatingInput" className="px-3">
              Email
            </label>
          </div>
          {/* <button
            type="submit"
            className={`btn btn-danger w-100 py-3 rounded-3${
              !email ? " disabled" : ""
            }`}
            onClick={checkLogin}
          >
            Đăng nhập
          </button> */}
        </form>
      </main>
    </>
  );
}

export default Login;
