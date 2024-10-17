import { useTranslation } from "react-i18next";

const Payments = () => {
  const { t } = useTranslation();

  return (
    <div className="Payments_content">
      <div className="row m-0">
        <div className="col-lg-3 col-md-6 col-12 p-2">
          <div className="Box">
            <p>{t("Deposit")}</p>
            <h2> $ 10,000</h2>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-12 p-2">
          <div className="Box">
            <p>{t("Auction")}</p>
            <h2> $ 10,000</h2>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-12 p-2">
          <div className="Box">
            <p>{t("Total")}</p>
            <h2> $ 10,000</h2>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-12 p-2">
          <div className="Box">
            <p>{t("Services")}</p>
            <h2> $ 10,000</h2>
          </div>
        </div>
      </div>

      <div className="row m-0 mt-5">
        <div className="col-12">
          <div className="payment_history">
            <h3>{t("PaymentHistory")}</h3>
            <div className="history-row">
              <div className="icon">
                <div className="img">
                  <i className="fa-thin fa-car" />{" "}
                </div>
                <div className="date">
                  <h4>{t("Test")}</h4>
                  <p>01/01/2024</p>
                </div>
              </div>
              <div className="price">10,000$</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
