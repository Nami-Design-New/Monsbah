import { useNavigate } from "react-router-dom";

function SectionHeader() {
  const navigate = useNavigate();

  return (
    <section className="section-head">
      <div className="small_nav">
        <div className="arrow_icon" onClick={() => navigate(-1)}>
          <i className="fa-light fa-arrow-right"></i>
        </div>
      </div>
    </section>
  );
}

export default SectionHeader;
