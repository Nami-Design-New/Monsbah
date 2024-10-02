import React from "react";

const MyOrder = () => {
  return (
    <section className="MyOrder">
      <div className="container">
        <div className="Order_cards">
          <div className="card">
            <div className="status">
              <p className="Date">Aug 28, 2023 6:05 pm</p>

              <div className="pending">
                <p>Pending</p>
                <span></span>
              </div>
            </div>

            <div className="transport">
              <span>
                <i className="fa-light fa-truck-moving"></i>
              </span>
              <p>Transport</p>
            </div>
            <div className="name">Mercedes e200 - 2022</div>
            <div className="location">
              <i className="fa-light fa-location-dot"></i>
              location{" "}
            </div>
            <div className="address">Louisville, CO, US</div>
            <div className="price">
              <span>Price :</span>
              <p>$ 10,000</p>
            </div>
          </div>

          <div className="card">
            <div className="status">
              <p className="Date">Aug 28, 2023 6:05 pm</p>

              <div className="Accepting">
                <p>Accepting</p>
                <span></span>
              </div>
            </div>

            <div className="transport">
              <span>
                <i className="fa-light fa-truck-moving"></i>
              </span>
              <p>Transport</p>
            </div>
            <div className="name">Mercedes e200 - 2022</div>
            <div className="location">
              <i className="fa-light fa-location-dot"></i>
              location{" "}
            </div>
            <div className="address">Louisville, CO, US</div>
            <div className="price">
              <span>Price :</span>
              <p>$ 10,000</p>
            </div>
          </div>

          <div className="card">
            <div className="status">
              <p className="Date">Aug 28, 2023 6:05 pm</p>

              <div className="in_progress">
                <p>in progress</p>
                <span></span>
              </div>
            </div>

            <div className="transport">
              <span>
                <i className="fa-light fa-truck-moving"></i>
              </span>
              <p>Transport</p>
            </div>
            <div className="name">Mercedes e200 - 2022</div>
            <div className="location">
              <i className="fa-light fa-location-dot"></i>
              location{" "}
            </div>
            <div className="address">Louisville, CO, US</div>
            <div className="price">
              <span>Price :</span>
              <p>$ 10,000</p>
            </div>
          </div>

          <div className="card">
            <div className="status">
              <p className="Date">Aug 28, 2023 6:05 pm</p>

              <div className="completed">
                <p>completed</p>
                <span></span>
              </div>
            </div>

            <div className="transport">
              <span>
                <i className="fa-light fa-truck-moving"></i>
              </span>
              <p>Transport</p>
            </div>
            <div className="name">Mercedes e200 - 2022</div>
            <div className="location">
              <i className="fa-light fa-location-dot"></i>
              location{" "}
            </div>
            <div className="address">Louisville, CO, US</div>
            <div className="price">
              <span>Price :</span>
              <p>$ 10,000</p>
            </div>
          </div>

          <div className="card">
            <div className="status">
              <p className="Date">Aug 28, 2023 6:05 pm</p>

              <div className="rejected">
                <p>rejected</p>
                <span></span>
              </div>
            </div>

            <div className="transport">
              <span>
                <i className="fa-light fa-truck-moving"></i>
              </span>
              <p>Transport</p>
            </div>
            <div className="name">Mercedes e200 - 2022</div>
            <div className="location">
              <i className="fa-light fa-location-dot"></i>
              location{" "}
            </div>
            <div className="address">Louisville, CO, US</div>
            <div className="price">
              <span>Price :</span>
              <p>$ 10,000</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyOrder;
