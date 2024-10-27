import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function About() {
  const { t } = useTranslation();

  return (
    <section className="aboutus_section">
      <div className="container">
        <>
          <div className="heading-section">
            <div className="image-wrapper">
              <img src="/images/auth-benner.png" alt="Monsbah" />
            </div>
            <div className="info-wrapper">
              <h3>
                {t("about.title")} <span>{t("appName")}</span>
              </h3>
              <p>{t("about.desc")}</p>
            </div>
          </div>
          <div className="how-it-works">
            <h3>{t("about.howItWorks")}</h3>
            <div className="steps-wrapper">
              <div className="col-lg-4  col-12 p-3">
                <div className="step ">
                  <div className="step-header">
                    <h2>01</h2>
                    <span className="header-line"></span>
                  </div>
                  <div className="info-wrapper">
                    <h4>{t("about.step1")}</h4>
                    <p>{t("about.step1Desc")}</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4  col-12 p-3">
                <div className="step ">
                  <div className="step-header">
                    <h2>02</h2>
                    <span className="header-line"></span>
                  </div>
                  <div className="info-wrapper">
                    <h4>{t("about.step2")}</h4>
                    <p>{t("about.step2Desc")}</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4  col-12 p-3">
                <div className="step ">
                  <div className="step-header">
                    <h2>03</h2>
                    <span className="header-line"></span>
                  </div>
                  <div className="info-wrapper">
                    <h4>{t("about.step3")}</h4>
                    <p>{t("about.step3Desc")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="countries-section">
            {/* Saudia */}
            <Link to={"/search/asks"} className="col-lg-4 col-md-6 col-12 p-3">
              <div className="country-box">
                <div className="image-wrapper">
                  <img
                    src={"../../images/countries/saudia-1.webp"}
                    alt={"Saudi"}
                  />
                </div>
                <div className="info-wrapper">
                  <h5>{t("about.saudi")}</h5>
                  <span>5 {t("about.ads")}</span>
                </div>
              </div>
            </Link>
            {/* Kuwait */}
            <Link to={"/search/asks"} className="col-lg-4 col-md-6 col-12 p-3">
              <div className="country-box">
                <div className="image-wrapper">
                  <img
                    src={"../../images/countries/kewit.webp"}
                    alt={"Kuwait"}
                  />
                </div>
                <div className="info-wrapper">
                  <h5>{t("about.kuwait")}</h5>
                  <span>5 {t("about.ads")}</span>
                </div>
              </div>
            </Link>
            {/* UAE */}
            <Link to={"/search/asks"} className="col-lg-4 col-md-6 col-12 p-3">
              <div className="country-box">
                <div className="image-wrapper">
                  <img
                    src={"../../images/countries/uae-1.webp"}
                    alt={"UAE"}
                  />
                </div>
                <div className="info-wrapper">
                  <h5>{t("about.uae")}</h5>
                  <span>5 {t("about.ads")}</span>
                </div>
              </div>
            </Link>
            {/* Bahrain */}
            <Link to={"/search/asks"} className="col-lg-4 col-md-6 col-12 p-3">
              <div className="country-box">
                <div className="image-wrapper">
                  <img
                    src={"../../images/countries/behrin.webp"}
                    alt={"Bahrain"}
                  />
                </div>
                <div className="info-wrapper">
                  <h5>{t("about.bahrain")}</h5>
                  <span>5 {t("about.ads")}</span>
                </div>
              </div>
            </Link>
            {/* Oman */}
            <Link to={"/search/asks"} className="col-lg-4 col-md-6 col-12 p-3">
              <div className="country-box">
                <div className="image-wrapper">
                  <img
                    src={"../../images/countries/oman.webp"}
                    alt={"Oman"}
                  />
                </div>
                <div className="info-wrapper">
                  <h5>{t("about.oman")}</h5>
                  <span>5 {t("about.ads")}</span>
                </div>
              </div>
            </Link>
            {/* Qatar */}
            <Link to={"/search/asks"} className="col-lg-4 col-md-6 col-12 p-3">
              <div className="country-box">
                <div className="image-wrapper">
                  <img
                    src={"../../images/countries/qatar-1.webp"}
                    alt={"Qatar"}
                  />
                </div>
                <div className="info-wrapper">
                  <h5>{t("about.qatar")}</h5>
                  <span>5 {t("about.ads")}</span>
                </div>
              </div>
            </Link>
          </div>
        </>
      </div>
    </section>
  );
}
