import { useTranslation } from "react-i18next";

const MyOrders = () => {
  const { t } = useTranslation();

  return (
    <div className="MyOrder">
      <div className="row m-0">
        <div className="col-lg-4 col-md-6 col-12 p-2">
          <div className="card">
            <div className="status">
              <p className="Date">Aug 28, 2023 6:05 pm</p>

              <div className="pending">
                <p>{t("Pending")}</p>
                <span />
              </div>
            </div>

            <div className="transport">
              <span>
                <i className="fa-light fa-truck-moving" />
              </span>
              <p>Transport</p>
            </div>

            <div className="name">Mercedes e200 - 2022</div>
            <div className="location">
              <i className="fa-light fa-location-dot" />
              location{" "}
            </div>
            <div className="address">Louisville, CO, US</div>
            <div className="price">
              <span>Price :</span>
              <p>$ 10,000</p>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 col-12 p-2">
          <div className="card">
            <div className="status">
              <p className="Date">Aug 28, 2023 6:05 pm</p>

              <div className="Accepting">
                <p>Accepting</p>
                <span />
              </div>
            </div>

            <div className="transport">
              <span>
                <i className="fa-light fa-truck-moving" />
              </span>
              <p>Transport</p>
            </div>
            <div className="name">Mercedes e200 - 2022</div>
            <div className="location">
              <i className="fa-light fa-location-dot" />
              location{" "}
            </div>
            <div className="address">Louisville, CO, US</div>
            <div className="price">
              <span>Price :</span>
              <p>$ 10,000</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-12 p-2">
          <div className="card">
            <div className="status">
              <p className="Date">Aug 28, 2023 6:05 pm</p>

              <div className="in_progress">
                <p>in progress</p>
                <span />
              </div>
            </div>

            <div className="transport">
              <span>
                <i className="fa-light fa-truck-moving" />
              </span>
              <p>Transport</p>
            </div>
            <div className="name">Mercedes e200 - 2022</div>
            <div className="location">
              <i className="fa-light fa-location-dot" />
              location{" "}
            </div>
            <div className="address">Louisville, CO, US</div>
            <div className="price">
              <span>Price :</span>
              <p>$ 10,000</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-12 p-2">
          <div className="card">
            <div className="status">
              <p className="Date">Aug 28, 2023 6:05 pm</p>

              <div className="completed">
                <p>completed</p>
                <span />
              </div>
            </div>

            <div className="transport">
              <span>
                <i className="fa-light fa-truck-moving" />
              </span>
              <p>Transport</p>
            </div>
            <div className="name">Mercedes e200 - 2022</div>
            <div className="location">
              <i className="fa-light fa-location-dot" />
              location{" "}
            </div>
            <div className="address">Louisville, CO, US</div>
            <div className="price">
              <span>Price :</span>
              <p>$ 10,000</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-12 p-2">
          <div className="card">
            <div className="status">
              <p className="Date">Aug 28, 2023 6:05 pm</p>

              <div className="rejected">
                <p>rejected</p>
                <span />
              </div>
            </div>

            <div className="transport">
              <span>
                <i className="fa-light fa-truck-moving" />
              </span>
              <p>Transport</p>
            </div>
            <div className="name">Mercedes e200 - 2022</div>
            <div className="location">
              <i className="fa-light fa-location-dot" />
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
    </div>
  );
};

export default MyOrders;
