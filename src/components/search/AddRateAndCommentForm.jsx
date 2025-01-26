import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import InputField from "../../ui/form-elements/InputField";
import SubmitButton from "../../ui/form-elements/SubmitButton";

function AddRateAndCommentForm({
  handleSubmitRate,
  loading,
  targetComment,
  setTargetComment,
}) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    comment: "",
    rate: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleRatingChange = (value) => {
    setFormData({ ...formData, rate: value });
  };

  return (
    <div>
      {targetComment && (
        <span className="replyTo">
          <button aria-label="Reply to" onClick={() => setTargetComment(null)}>
            <i className="fas fa-times"></i>
          </button>
          {t("replyTo")} <b>{targetComment?.user_name}</b>:{" "}
          {targetComment?.comment}
        </span>
      )}
      <form
        className="form "
        onSubmit={(e) => handleSubmitRate(e, formData, setFormData)}
      >
        <div className="stars d-flex justify-content-between">
          <label>{t("rateComment")}</label>
          <div className="star-rating-service">
            {[5, 4, 3, 2, 1].map((star) => (
              <React.Fragment key={star}>
                <input
                  type="radio"
                  id={`star${star}`}
                  name="rating"
                  value={star}
                  checked={formData?.rate === star}
                  onChange={() => handleRatingChange(star)}
                />
                <label
                  htmlFor={`star${star}`}
                  title={`${star} stars`}
                  className={formData?.rate >= star ? "active" : ""}
                >
                  <i className="fa-sharp fa-solid fa-star"></i>
                </label>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="addCommentForm">
          <InputField
            placeholder={t("addComment")}
            value={formData?.comment}
            name="comment"
            onChange={handleChange}
          />
          <SubmitButton loading={loading} name={t("send")} />
        </div>
      </form>
    </div>
  );
}

export default AddRateAndCommentForm;
