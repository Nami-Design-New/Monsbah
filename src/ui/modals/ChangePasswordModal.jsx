import { useState } from "react";
import { useTranslation } from "react-i18next";
import { handleChange } from "../../utils/helpers";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import SubmitButton from "../form-elements/SubmitButton";
import PasswordField from "../form-elements/PasswordField";
import axiosInstance from "../../utils/axiosInstance";

function ChangePasswordModal({ showModal, setShowModal }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    old_password: "",
    password: "",
    password_confirmation: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post(
        `/${localStorage.getItem("userType")}/auth/change-password`,
        formData
      );
      if (res.status === 200) {
        toast.success(t("profile.passwordSuccessfullyUpdated"));
        setShowModal(false);
        setFormData({
          old_password: "",
          password: "",
          password_confirmation: "",
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
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header className="pb-0" closeButton>
        <h5>{t(`profile.changePassword`)}</h5>
      </Modal.Header>
      <Modal.Body>
        <div className="container p-0">
          <div className="col-12">
            <form onSubmit={handleSubmit} className="form">
              <div className="col-12 w-100">
                <div className="col-12 py-2 px-0">
                  <PasswordField
                    label={t("auth.oldPassword")}
                    placeholder={t("auth.oldPassword")}
                    required
                    id="old_password"
                    name="old_password"
                    value={formData.old_password}
                    onChange={(e) => handleChange(e, setFormData)}
                  />
                </div>
                <div className="col-12 py-2 px-0">
                  <PasswordField
                    label={t("auth.password")}
                    placeholder={t("auth.password")}
                    required
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={(e) => handleChange(e, setFormData)}
                  />
                </div>
                <div className="col-12 py-2 px-0">
                  <PasswordField
                    label={t("auth.passwordConfirmation")}
                    placeholder={t("auth.passwordConfirmation")}
                    required
                    id="password_confirmation"
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={(e) => handleChange(e, setFormData)}
                  />
                </div>
                <div className="col-12 py-2 px-0 mt-3">
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

export default ChangePasswordModal;
