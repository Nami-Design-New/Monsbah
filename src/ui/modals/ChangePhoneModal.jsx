import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { handleChange } from "../../utils/helpers";
import PhoneInput from "../form-elements/PhoneInput";
import axiosInstance from "../../utils/axiosInstance";
import OtpContainer from "../form-elements/OtpContainer";
import SubmitButton from "../form-elements/SubmitButton";
import useGetCurrentLocation from "../../hooks/settings/useGetCurrentLocation";

function ChangePhoneModal({ country_code, phone, showModal, setShowModal }) {
  const { t } = useTranslation();
  const [formType, setFormType] = useState("phone");
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [formData, setFormData] = useState({
    country_code: "",
    phone: "",
  });

  const { data } = useGetCurrentLocation();
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      country_code: country_code
        ? country_code
        : !country_code && phone
        ? formData.country_code
        : data?.country_code,
      phone: phone || "",
    }));
  }, [country_code, data?.country_code, formData.country_code, phone]);

  const handleSubmitPhone = async (e) => {
    e.preventDefault();
    setPhoneLoading(true);
    try {
      const res = await axiosInstance.post(
        `/${localStorage.getItem("userType")}/auth/change-phone`,
        formData
      );
      if (res.status === 200) {
        toast.success(res.data?.message);

        setFormType("otp");
      } else {
        toast.error(t("somethingWentWrong"));
        throw new Error();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || t("somethingWentWrong"));
    } finally {
      setPhoneLoading(false);
    }
  };

  const handleSubmitOTP = async (e) => {
    e.preventDefault();
    setOtpLoading(true);

    try {
      const res = await axiosInstance.post(
        `/${localStorage.getItem("userType")}/auth/confirm-change-phone`,
        { ...formData, token: otp }
      );
      if (res.status === 200) {
        toast.success(res.data?.message);
        setFormType("phone");
        setOtp("");
        setShowModal(false);
      } else {
        toast.error(t("somethingWentWrong"));
        throw new Error();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || t("somethingWentWrong"));
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={() => {
        setFormType("phone");
        setShowModal(false);
      }}
      centered
    >
      <Modal.Header className="pb-0" closeButton>
        <h5>{t(`profile.changePhone`)}</h5>
      </Modal.Header>
      <Modal.Body>
        <div className="container p-0">
          <div className="col-12">
            {(formType === "phone" || !formType) && (
              <form onSubmit={handleSubmitPhone} className="form">
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
                        setFormData((prev) => ({
                          ...prev,
                          country_code: code,
                        }));
                        setShow(false);
                      }}
                    />
                  </div>
                  <div className="col-12 py-2 px-0">
                    <div className="btns">
                      <SubmitButton
                        name={t("sendOTP")}
                        className="wizard_btn next"
                        loading={phoneLoading}
                      />
                    </div>
                  </div>
                </div>
              </form>
            )}
            {formType === "otp" && (
              <form className="form" onSubmit={handleSubmitOTP}>
                <div className="col-12 w-100">
                  <div className="col-12 py-2 px-0">
                    <h5>{t("auth.confirmOTPTitle")}</h5>
                    <span>{t("auth.confirmPhoneOTPSubtitle")}</span>
                  </div>
                  <div className="col-12 py-2 px-0">
                    <OtpContainer formData={otp} setFormData={setOtp} />
                  </div>
                  <div className="col-12 py-2 px-0">
                    <div className="btns">
                      <SubmitButton
                        name={t("verify")}
                        className="wizard_btn next"
                        loading={otpLoading}
                      />
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ChangePhoneModal;
