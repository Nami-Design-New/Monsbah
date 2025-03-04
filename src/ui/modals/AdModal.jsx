import { Modal } from "react-bootstrap";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import SubmitButton from "../form-elements/SubmitButton";
import axiosInstance from "../../utils/axiosInstance";
import useGetSettings from "../../hooks/settings/useGetSettings";

export default function AdModal({ show, setShow, productId }) {
  const [loading, setLoading] = useState();
  const { t } = useTranslation();
  const handleClose = () => setShow(false);
  const { data: settings } = useGetSettings();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/client/store-subscription", {
        product_id: productId,
      });
      if (res.status === 200) {
        toast.success(res.data.message);
        setShow(false);
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal centered show={show} className="authModal" backdrop="static">
      <Modal.Body>
        <button
          aria-label="Close modal"
          className="closeModal"
          onClick={handleClose}
        >
          <i className="fa-regular fa-x"></i>
        </button>
        <p className="ad-modal-header">{t("adPost")}</p>

        <div className="p-4">
          <h2 className="head fs-6 my-2">{t("subTitle")} </h2>

          <form className="form mt-4" onSubmit={handleSubmit}>
            <div className="sub">
              <label>
                <div className="sub-input">
                  <input type="radio" name="sub" />
                  <h2>{t("freeAdd")}</h2>
                </div>

                <p>{t("freeAddDesc")}</p>
              </label>
            </div>

            <div className="sub">
              <label>
                <div className="sub-input">
                  <input type="radio" name="sub" />
                  <h2>{t("premiumAdd")}</h2>
                </div>
                <p>{t("premiumAddDesc")}</p>
                <p>
                  {settings?.product_subscription_price} د.ك /{" "}
                  {t("packages.monthly")}
                </p>
              </label>
            </div>

            <SubmitButton name={t("completePay")} loading={loading} />
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
