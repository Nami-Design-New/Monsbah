import { Modal } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";
import SubmitButton from "../form-elements/SubmitButton";
import { useTranslation } from "react-i18next";
import TextField from "../form-elements/TextField";

function CreateCountryAsk({
  showModal,
  setShowModal,
  country_id,
  city_id,
  title,
}) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");

  const queryClient = useQueryClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payLoad = {
      country_id: country_id,
      city_id: city_id,
      description: value,
    };

    try {
      const res = await axiosInstance.post("/client/store-question", payLoad);
      if (res.status === 200) {
        toast.success(res.data.message);
        setValue("");
        queryClient.invalidateQueries({
          queryKey: ["asks"],
        });
      }
      setShowModal(false);
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      centered
      show={showModal}
      onHide={() => setShowModal(false)}
      className="viewAskModal"
    >
      <Modal.Header className="pb-0" closeButton>
        <h5>{title}</h5>
      </Modal.Header>
      <Modal.Body>
        <form
          className="form addCommentForm flex-column"
          onSubmit={(e) => handleSubmit(e, value, setValue)}
        >
          <TextField
            required
            placeholder={t("writeHere")}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <SubmitButton
            loading={loading}
            name={t("send")}
            style={{
              padding: "8px 16px !important",
              minWidth: "140px",
              width: "100% !important",
            }}
          />
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default CreateCountryAsk;
