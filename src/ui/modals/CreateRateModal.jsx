import { Modal } from "react-bootstrap";

import { useTranslation } from "react-i18next";
import { useState } from "react";
import { toast } from "react-toastify";

import { useQueryClient } from "@tanstack/react-query";
import RateScale from "../form-elements/RateScale";
import axiosInstance from "../../utils/axiosInstance";
import TextField from "../form-elements/TextField";
import { handleChange } from "../../utils/helpers";
import SubmitButton from "../form-elements/SubmitButton";

function CreateRateModal({ showModal, setShowModal, id }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    profile_id: +id,
    comment: "",
    rate: "",
  });
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const handleRatingChange = (rate) => {
    setFormData({
      ...formData,
      rate,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!formData?.rate) {
      return;
    }

    try {
      const res = await axiosInstance.post(`/client/store-rate`, formData);
      if (res.status === 200) {
        toast.success(t("successfullyRated"));

        queryClient.invalidateQueries(["rates", id]);
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
        <h5>{t(`createRate`)}</h5>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="col-12 p-2">
            <form onSubmit={handleSubmit} className="form">
              <div className="col-12 p-0">
                <TextField
                  required
                  placeholder={t("writeHere")}
                  name="comment"
                  id="comment"
                  value={formData?.comment}
                  onChange={(e) => {
                    handleChange(e, setFormData);
                  }}
                />
              </div>
              <div className="col-12 p-0">
                <RateScale
                  rate={formData?.rate}
                  handleRatingChange={handleRatingChange}
                />
              </div>
              <div className="col-12 p-0">
                <div className="btns">
                  <SubmitButton
                    name={t("addBtn")}
                    className="wizard_btn next"
                    loading={loading}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default CreateRateModal;
