import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Page404 from "./pages/Page404";
import Logout from "./pages/Logout";
import Detail from "./pages/Detail";
import Cart from "./pages/Cart";
import CateProduct from "./pages/CateProduct";
import BrandProduct from "./pages/BrandProduct";
import "./index.css";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/category/:id" element={<CateProduct />} />
          <Route path="/brand/:id" element={<BrandProduct />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
