import AskLoader from "../../ui/loaders/AskLoader";
import RateCard from "../../ui/cards/RateCard";
import { useTranslation } from "react-i18next";
import useGetAllRates from "../../hooks/rates/useGetAllRates";
import { useState } from "react";
import CreateRateModal from "../../ui/modals/CreateRateModal";

function RatesTab({ user, isActive }) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const { data: rates, isLoading } = useGetAllRates({
    id: user?.id,
    enabled: isActive,
  });

  return (
    <section className="products_section w-100">
      <div className="w-100">
        <div className=" w-100 actions-wrapper p-0 d-flex align-items-center justify-content-end">
          <span
            className="customBtn m-0 d-flex align-items-center gap-2"
            style={{ cursor: "pointer" }}
            onClick={() => setShowModal(true)}
          >
            <i className="fa-regular fa-star"></i>
            {t("rate")}
          </span>
        </div>
      </div>
      <div className="row">
        {rates?.data?.data?.data?.map((rate, index) => (
          <div className="col-12 p-2" key={index}>
            <RateCard rate={rate} userId={user?.id} className="reverse" />
          </div>
        ))}

        {isLoading && (
          <>
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <div className="col-lg-6 col-12 p-2" key={`loader-${index}`}>
                  <AskLoader />
                </div>
              ))}
          </>
        )}
      </div>
      <CreateRateModal
        id={user?.id}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </section>
  );
}

export default RatesTab;
