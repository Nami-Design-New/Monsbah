import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import useGetCountries from "../hooks/settings/useGetCountries.js";

export default function About() {
  const { t } = useTranslation();
  const { data: countries } = useGetCountries();

  return (
    <section className="aboutus_section">
      <div className="container">
        <>
          <div className="heading-section">
            <div className="image-wrapper">
              <img src="images/auth-benner.png" alt="Monsbah" />
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
            {countries &&
              countries?.length > 0 &&
              countries.map((country) => (
                <Link
                  aria-label="Country products"
                  to={`/?country=${country?.id}`}
                  className="col-lg-4 col-md-6 col-12 p-3"
                  key={country?.id}
                >
                  <div className="country-box">
                    <div className="image-wrapper">
                      <img src={country?.cover} alt={"Saudi"} />
                    </div>
                    <div className="info-wrapper">
                      <h5>{country?.name}</h5>
                      <span>
                        {country?.products_count} {t("about.ads")}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </>
      </div>
    </section>
  );
}
