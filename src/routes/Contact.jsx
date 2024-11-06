import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import InputField from "./../ui/form-elements/InputField";
import SubmitButton from "./../ui/form-elements/SubmitButton";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
import { handleChange } from "../utils/helpers";
import PhoneInput from "../ui/form-elements/PhoneInput";
import TextField from "../ui/form-elements/TextField";

function Contact() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post(`/client/store-contact`, formData);
      if (res.status === 200) {
        toast.success(t("messageSentSuccessfully"));

        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        toast.error(t("someThingWentWrong"));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || t("someThingWentWrong"));
    } finally {
      setLoading(false);
    }
  };

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
                      <Link aria-label="Call" to="tel:+919999999999">
                        919999999999
                      </Link>
                    </div>
                  </li>

                  <li>
                    <div className="icon">
                      <img src="/images/icons/email-support.svg" alt="" />
                    </div>
                    <div className="content">
                      <h6>{t("contact.email")}</h6>
                      <Link aria-label="Mail" to="mailto:info@Monsbah.com">
                        info@Monsbah.com
                      </Link>
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
                <form className="form" onSubmit={handleSubmit}>
                  <div className="row m-0">
                    <div className="col-12 p-2">
                      <InputField
                        required
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
                      <PhoneInput
                        required
                        type="number"
                        id="phone"
                        name="phone"
                        placeholder={t("contact.phone")}
                        value={formData.phone}
                        countryCode={formData.country_code}
                        onChange={(e) => handleChange(e, setFormData)}
                        onSelect={(code, setShow) => {
                          setFormData((prev) => ({
                            ...prev,
                            country_code: code,
                          }));
                          setShow(false);
                        }}
                      />
                    </div>
                    <div className="col-lg-6 col-12 p-2">
                      <InputField
                        required
                        placeholder={t("contact.email")}
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => handleChange(e, setFormData)}
                      />
                    </div>
                    <div className="col-12 p-2">
                      <TextField
                        required
                        placeholder={t("contact.message")}
                        name="message"
                        id="message"
                        value={formData?.message}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            message: e.target.value,
                          });
                        }}
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
