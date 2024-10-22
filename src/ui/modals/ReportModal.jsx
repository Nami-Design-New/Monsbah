import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import axiosInstance from "../../utils/axiosInstance";
import TextField from "../form-elements/TextField";
import { handleChange } from "../../utils/helpers";
import SubmitButton from "../form-elements/SubmitButton";

function ReportModal({ id, type, showModal, setShowModal }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    description: "",
    comment_type: "",
    comment_id: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData({
      ...formData,
      comment_id: +id || "",
      comment_type: type || "",
    });
  }, [id, type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post(`/client/report-comment`, formData);
      if (res.status === 201 || res.status === 200) {
        toast.success(t("successfullyReported"));
        setShowModal(false);
        setFormData({
          description: "",
          comment_type: "",
          comment_id: "",
        });
      } else {
        toast.error(t("someThingWentWrong"));
        throw new Error();
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
        <h5>{t(`createReport`)}</h5>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="form">
          <div className="col-12 py-2 px-0">
            <TextField
              required
              placeholder={t("writeHere")}
              name="description"
              id="description"
              value={formData?.description}
              onChange={(e) => {
                handleChange(e, setFormData);
              }}
            />
          </div>
          <div className="col-12 py-2 px-0">
            <div className="btns">
              <SubmitButton name={t("send")} loading={loading} />
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default ReportModal;
