import React from "react";

function Vouchers() {
  return (
    <div className="container mb-5">
      <div className="row row-cols-1 row-cols-md-3 g-5">
        <div className="col">
          <img
            className="img-fluid rounded-4"
            src="https://shopdunk.com/images/uploaded/BONUSt7.png"
            alt="banner sale"
          />
        </div>
        <div className="col">
          <img
            className="img-fluid rounded-4"
            src="https://shopdunk.com/images/uploaded/Bonus%20banner-26.png"
            alt="banner sale"
          />
        </div>
        <div className="col">
          <img
            className="img-fluid rounded-4"
            src="https://shopdunk.com/images/uploaded/Bonus%20banner-16.png"
            alt="banner sale"
          />
        </div>
      </div>
    </div>
  );
}

export default Vouchers;
