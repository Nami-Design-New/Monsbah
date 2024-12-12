import { Link } from "react-router-dom";

export default function BlogCard() {
  return (
    <div className="blog_card">
      <div className="blog_image">
        <img src="/images/blog.jpg" alt="فساتين زفاف" />
      </div>
      <div className="blog_content">
        <span className="date">
          <i className="fa-light fa-calendar-days"></i> 15 مارس 2024
        </span>
        <h3>أحدث صيحات فساتين الزفاف لعام 2024</h3>
        <Link to="/blogs/1" className="read_more">
          اقــرأ المزيــد <i className="fa-solid fa-arrow-up-left"></i>
        </Link>
      </div>
    </div>
  );
}
