import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import InputField from "./../ui/form-elements/InputField";
import SubmitButton from "./../ui/form-elements/SubmitButton";

function Contact() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  return (
    <>
      
      <section className="contact_section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 p-2">
              <div className="contact_info">
                <span className="title_hint">{t("header.contact")}</span>
                <h2>{t("contact.title")}</h2>
                <p>{t("contact.subtitle")}</p>
                <ul>
                  <li>
                    <div className="icon">
                      <img src="/images/icons/support.svg" alt="" />
                    </div>
                    <div className="content">
                      <h6>{t("contact.support")}</h6>
                      <Link to="tel:+919999999999">919999999999</Link>
                    </div>
                  </li>

                  <li>
                    <div className="icon">
                      <img src="/images/icons/email-support.svg" alt="" />
                    </div>
                    <div className="content">
                      <h6>{t("contact.email")}</h6>
                      <Link to="mailto:info@Monsbah.com">info@Monsbah.com</Link>
                    </div>
                  </li>

                  <li>
                    <div className="icon">
                      <img src="/images/icons/office.svg" alt="" />
                    </div>
                    <div className="content">
                      <h6>{t("contact.officeLocation")}</h6>
                      <p>{t("contact.officeAddress")}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 p-2">
              <div className="contact_form">
                <h3>{t("contact.sendMessage")}</h3>
                <p>{t("contact.sendSubtitle")}</p>
                <form className="form">
                  <div className="row m-0">
                    <div className="col-12 p-2">
                      <InputField
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder={t("contact.name")}
                      />
                    </div>
                    <div className="col-lg-6 col-12 p-2">
                      <InputField
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder={t("contact.phone")}
                      />
                    </div>
                    <div className="col-lg-6 col-12 p-2">
                      <InputField
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder={t("contact.email")}
                      />
                    </div>
                    <div className="col-12 p-2">
                      <InputField
                        as={"textarea"}
                        name="message"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder={t("contact.message")}
                      />
                    </div>
                    <div className="col-12 p-2 d-flex justify-content-center">
                      <SubmitButton
                        loading={loading}
                        name={t("contact.send")}
                        className={"contact_btn mt-3"}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
