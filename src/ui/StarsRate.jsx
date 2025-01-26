import { useState } from "react";
import { useTranslation } from "react-i18next";
import CountryReviewsModal from "./modals/CommentsReviewsModal";

export default function StarsRate({
  rate,
  reviewsCount,
  company,
  showbtn = false,
}) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="stars_rate">
      <div className="stars">
        {rate
          ? Array(Math.round(rate))
              .fill(0)
              .map(() => {
                return (
                  <img
                    key={Math.random()}
                    src="/images/icons/star-filled.svg"
                    alt="filled star"
                  />
                );
              })
          : null}
        {rate
          ? Array(5 - Math.round(rate))
              .fill(0)
              .map(() => {
                return (
                  <img
                    key={Math.random()}
                    src="/images/icons/star.svg"
                    alt="star"
                  />
                );
              })
          : null}
      </div>
      {reviewsCount && (
        <>
          <span>
            [ {reviewsCount} {t("review")} ]
          </span>

          {showbtn ? (
            <span onClick={() => setShowModal(true)} className="viewRates">
              {t("viewRates")}
            </span>
          ) : null}
        </>
      )}

      <CountryReviewsModal
        showModal={showModal}
        setShowModal={setShowModal}
        company={company}
      />
    </div>
  );
}
