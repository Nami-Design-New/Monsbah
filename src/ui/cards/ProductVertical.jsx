import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ImageLoad from "../loaders/ImageLoad";

function ProductVertical({ product }) {
  const { t } = useTranslation();
  const [isImageLoaded, setIsImageLoaded] = useState(true);

  const handleImageLoad = () => {
    setIsImageLoaded(false);
  };

  return (
    <div className="product_vertical">
      <Link to={`/product/${product.id}`} className="img">
        <img src={product.image} onLoad={handleImageLoad} alt="" />
        <ImageLoad isImageLoaded={isImageLoaded} />
        <span className="type">{t(`${product?.type}`)}</span>
      </Link>
      <div className="content">
        <Link to={`/product/${product.id}`} className="title">
          <h3>{product.name}</h3>
          <button className="favourite_btn active">
            <i className="fa-light fa-heart"></i>
          </button>
        </Link>
        <h3 className="price">
          <span>{product?.price}</span> {product?.currency?.name}
        </h3>
        <ul>
          <li className="w-100">
            <i className="fa-light fa-location-dot"> </i>{" "}
            {product.country?.name}, {product.city?.name}
          </li>

          <li style={{ flex: 1 }}>
            <Link to={`/profile/${product.user?.id}`}>
              <i className="fa-light fa-user"></i> {product.user?.username}
            </Link>
          </li>

          <li>
            <i className="fa-light fa-clock"></i> {product.date}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProductVertical;
