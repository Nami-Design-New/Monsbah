import { useTranslation } from "react-i18next";
import BlogCard from "../ui/cards/BlogCard";
import useGetBlogs from "../hooks/blogs/useGetBlogs";
import PageLoader from "../ui/loaders/PageLoader";

export default function BLogs() {
  const { t } = useTranslation();
  const { data: blogs, isLoading } = useGetBlogs();
  return (
    <section className="blogs_section">
      <div className="container">
        <h1>{t("blogs.title")}</h1>
        <p>{t("blogs.subtitle")}</p>
        {isLoading ? (
          <PageLoader />
        ) : (
          <div className="row">
            {blogs?.data?.map((blog) => (
              <div className="col-lg-4 col-md-6 col-12 p-2" key={blog?.id}>
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
