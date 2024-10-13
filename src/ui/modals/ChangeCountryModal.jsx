import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SubmitButton from "../form-elements/SubmitButton";
import { toast } from "react-toastify";

import { Modal } from "react-bootstrap";
import axiosInstance from "../../utils/axiosInstance";
import SelectField from "../form-elements/SelectField";

function ChangeCountryModal({
  country_id,
  countries,
  showModal,
  setShowModal,
  setGeneralFormData,
}) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    country_id: "",
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, country_id: country_id || "" }));
  }, [country_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post(
        `/client/auth/change-country`,
        formData
      );
      if (res.status === 200) {
        toast.success(t("profile.countrySuccessfullyChanged"));
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
        <h5>{t(`profile.changeCountry`)}</h5>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="col-12 p-2">
            <form onSubmit={handleSubmit} className="form">
              <div className="col-12 w-100">
                <div className="col-12 py-2 px-0">
                  <SelectField
                    label={t("auth.country")}
                    id="country_id"
                    name="country_id"
                    value={formData.country_id}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        country_id: e.target.value,
                        city_id: "",
                        state_id: "",
                      })
                    }
                    options={countries?.map((country) => ({
                      name: country?.name,
                      value: country?.id,
                    }))}
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

export default ChangeCountryModal;
