import { useTranslation } from "react-i18next";

function ProductInfo({ product }) {
  const { t } = useTranslation();

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: product?.name,
          text: product?.description,
          url: window.location.href
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      alert(t("share_not_supported"));
    }
  };

  return (
    <>
      <div className="priceInfo mt-3">
        <h4 className="price">
          <span>{product?.price}</span> {product?.currency?.name}
        </h4>

        <button className={`favorite ${product?.is_favorite ? "active" : ""}`}>
          <i className="fa-light fa-heart"></i>
        </button>

        <div className="actions">
          <span className="action-btn report" onClick={handleShare}>
            <i className="fa-solid fa-share"></i> {t("share")}
          </span>

          <span className="action-btn report">
            <i className="fa-sharp fa-light fa-share-nodes"></i> {t("report")}
          </span>
        </div>
      </div>

      <div className="itemInfo mt-3">
        <h3 className="title">{product?.name}</h3>

        <div className="itemBottom">
          <div className="location">
            <i className="fa-light fa-location-dot"></i>
            <span>
              {product?.country?.name}, {product?.city?.name}
            </span>
          </div>
          <div className="time">
            <i className="fa-light fa-clock"></i> {product?.create_at}
          </div>
        </div>
        <p className="description">{product?.description}</p>
      </div>
    </>
  );
}

export default ProductInfo;
