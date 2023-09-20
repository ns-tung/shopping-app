import React from "react";
import formatCurrency from "../helper/formatCurrency";

function ProductRelate(props) {
  return (
    <div key={props.id}>
      <div className="card" style={{ paddingTop: "10px" }}>
        <img
          src={props.image}
          className="card-img-top"
          style={{ width: "70%", margin: "0px auto" }}
          alt="..."
        />
        <div className="card-body" style={{ minHeight: "165px" }}>
          <div className="inforow" style={{ minHeight: "82px" }}>
            <h5 className="card-title" style={{ fontSize: "18px" }}>
              {props.name}
            </h5>
            <p className="card-text">
              Giá : {formatCurrency(props.price)}
            </p>
          </div>
          <div className="addcartrow">
            <a href={`/detail/${props.id}`} className="btn btn-primary">
              Xem
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductRelate;
