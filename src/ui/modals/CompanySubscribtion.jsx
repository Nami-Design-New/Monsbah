import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { setShowModal } from "../../redux/slices/companySubscribe";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import SubmitButton from "../form-elements/SubmitButton";
import useGetPackages from "../../hooks/subscription/useGetPackages";
import axiosInstance from "../../utils/axiosInstance";

export default function CompanySubscribtion() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [packageId, setPackageId] = useState(null);
  const { data: packages } = useGetPackages();
  const showModal = useSelector((state) => state.companySubscribe.showModal);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/company/store-subscription", {
        package_id: packageId,
      });
      if (res.status === 200) {
        toast.success(res.data.message);
        dispatch(setShowModal(false));
        queryClient.invalidateQueries({ queryKey: ["authed-user"] });
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={() => dispatch(setShowModal(false))}
      centered
    >
      <Modal.Header className="pb-0" closeButton></Modal.Header>
      <Modal.Body>
        <div className="container p-0">
          <h2 className="head fs-6 my-3">{t("subTitle")} </h2>

          <form className="form">
            {packages?.map((pack) => (
              <div className="sub" key={pack.id}>
                <label>
                  <div className="sub-input">
                    <input
                      type="radio"
                      name="sub"
                      checked={packageId === pack.id}
                      onChange={() => setPackageId(pack.id)}
                    />
                    <h2>{t(pack?.type)}</h2>
                  </div>

                  <ol className="info-sub">
                    {pack?.description
                      .split("-")
                      ?.filter((item) => item)
                      .map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                  </ol>

                  {pack?.price > 0 && (
                    <p className="price">
                      <span>
                        {pack?.price} د.ك / {t(`packages.${pack?.type}`)}
                      </span>
                      {pack?.is_sale === 1 ? (
                        <span className="discount">
                          {(pack?.price * pack?.sale_percent) / 100} د.ك /{" "}
                          {t(`packages.${pack?.type}`)}
                        </span>
                      ) : null}
                    </p>
                  )}

                  {pack?.is_sale ? (
                    <div className="offer">
                      <span>
                        {t("off")} {pack?.sale_percent} %
                      </span>
                    </div>
                  ) : null}
                </label>
              </div>
            ))}

            <SubmitButton
              name={t("subscribe")}
              loading={loading}
              event={handleSubscribe}
            />
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
