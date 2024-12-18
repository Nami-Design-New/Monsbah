import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import useGetBlog from "../hooks/blogs/useGetBlog";
import PageLoader from "../ui/loaders/PageLoader";
import useGetBlogs from "../hooks/blogs/useGetBlogs";

export default function BlogDetails() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data: blogs, isLoading: blogsLoading } = useGetBlogs();
  const { data: blog, isLoading } = useGetBlog();

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: blog?.title,
          url: window.location.href,
        })
        .then(() => t("Shared successfully"))
        .catch((error) => t("Error sharing:", error));
    } else {
      alert(t("share_not_supported"));
    }
  };

  return (
    <section className="blog_details">
      {isLoading || blogsLoading ? (
        <PageLoader />
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-lg-9 col-12 p-2">
              <div className="blog_header">
                <h1>{blog?.title}</h1>
                <div className="blog_header_actions">
                  <span className="date">
                    <i className="fa-light fa-calendar-days"></i> {blog?.date}
                  </span>
                  <button className="share" onClick={handleShare}>
                    <i className="fa-light fa-share-nodes"></i>
                  </button>
                </div>
              </div>
              <div className="blog_content">
                <div className="img">
                  <img src={blog?.image} alt="فساتين زفاف 2024" />
                </div>

                <div
                  className="content-text"
                  dangerouslySetInnerHTML={{ __html: blog?.description }}
                />
              </div>
            </div>

            <div className="col-lg-3 col-12 p-2">
              <div className="recent_blogs">
                <h3>{t("recentArticles")}</h3>
                <ul>
                  {blogs?.data
                    ?.filter((blog) => blog?.id !== +id)
                    ?.map((blog) => (
                      <li key={blog?.id}>
                        <Link to={`/blogs/${blog?.id}`}>
                          <h4>{blog?.title}</h4>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
