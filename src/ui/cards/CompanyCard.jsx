import { Link } from "react-router-dom";
import ImageLoad from "../loaders/ImageLoad";
import StarsRate from "../StarsRate";

export default function CompanyCard({ company }) {
  return (
    <Link
      aria-label="Product"
      to={`/companies/${company?.id}`}
      className="campany_card"
    >
      <div className="img">
        <img src={company?.image} alt="" />
        <ImageLoad isImageLoaded={false} />
      </div>
      <div className="content">
        <div className="title">
          <h3>{company?.name}</h3>
        </div>
        <ul>
          <li className="w-100">
            <i className="fa-light fa-location-dot"> </i> {company?.city_name} ،{" "}
            {company?.country_name}
          </li>
          <li>
            <StarsRate rate={company?.["rate-count"]} reviewsCount={12} />
          </li>
        </ul>
      </div>
    </Link>
  );
}
