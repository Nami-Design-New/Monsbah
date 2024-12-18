import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function BlogCard({ blog }) {
  const { t } = useTranslation();

  return (
    <div className="blog_card">
      <div className="blog_image">
        <img src={blog?.image} alt="فساتين زفاف" />
      </div>
      <div className="blog_content">
        <span className="date">
          <i className="fa-light fa-calendar-days"></i> {blog?.date}
        </span>
        <h3>{blog?.title}</h3>
        <Link to={`/blogs/${blog?.id}`} className="read_more">
          {t("readMore")} <i className="fa-solid fa-arrow-up-left"></i>
        </Link>
      </div>
    </div>
  );
}
