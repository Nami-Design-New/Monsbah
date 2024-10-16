import { Modal } from "react-bootstrap";
import SubmitButton from "../form-elements/SubmitButton";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { handleChange } from "../../utils/helpers";
import PhoneInput from "../form-elements/PhoneInput";

function ChangePhoneModal({
  country_code,
  phone,
  showModal,
  setShowModal,
  setGeneralFormData,
}) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    country_code: "965",
    phone: "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      country_code: country_code || phone ? "" : "965",
      phone: phone || "",
    }));
  }, [country_code, phone]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post(
        `/client/auth/change-phone`,
        formData
      );
      if (res.status === 200) {
        toast.success(t("profile.phoneSuccessfullyChanged"));
        setGeneralFormData({
          ...formData,
          country_id: formData.country_id,
          city_id: "",
          state_id: "",
        });
        setShowModal(false);
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
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header className="pb-0" closeButton>
        <h5>{t(`profile.changePhone`)}</h5>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="col-12 p-2">
            <form onSubmit={handleSubmit} className="form">
              <div className="col-12 w-100">
                <div className="col-12 py-2 px-0">
                  <PhoneInput
                    label={t("auth.phone")}
                    required
                    type="number"
                    id="phone"
                    name="phone"
                    placeholder={t("auth.phone")}
                    value={formData.phone}
                    countryCode={formData.country_code}
                    onChange={(e) => handleChange(e, setFormData)}
                    onSelect={(code, setShow) => {
                      setFormData((prev) => ({ ...prev, country_code: code }));
                      setShow(false);
                    }}
                  />
                </div>
                <div className="col-12 py-2 px-0">
                  <div className="btns">
                    <SubmitButton
                      name={t("save")}
                      className="wizard_btn next"
                      loading={loading}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ChangePhoneModal;
