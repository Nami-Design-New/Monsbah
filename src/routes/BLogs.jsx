import { useTranslation } from "react-i18next";
import BlogCard from "../ui/cards/BlogCard";

export default function BLogs() {
  const { t } = useTranslation();
  return (
    <section className="blogs_section">
      <div className="container">
        <h1>{t("blogs.title")}</h1>
        <p>{t("blogs.subtitle")}</p>
        <div className="row">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="col-lg-4 col-md-6 col-12 p-2" key={index}>
              <BlogCard />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
