import { Link } from "react-router-dom";
import ImageLoad from "../loaders/ImageLoad";
import StarsRate from "../StarsRate";

export default function CompanyCard() {
  return (
    <Link aria-label="Product" to={`/companies/1`} className="campany_card">
      <div className="img">
        <img src="/images/company.png" alt="" />
        <ImageLoad isImageLoaded={false} />
      </div>

      <div className="content">
        <div className="title">
          <h3>قمر للعبايات الخليجية</h3>
        </div>
        <ul>
          <li className="w-100">
            <i className="fa-light fa-location-dot"> </i> مكة ، السعودية
          </li>
          <li>
            <StarsRate rate={4} reviewsCount={12} />
          </li>
        </ul>
      </div>
    </Link>
  );
}
