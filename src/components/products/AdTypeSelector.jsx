import { useTranslation } from "react-i18next";

export default function AdTypeSelector({
  formData,
  setFormData,
  showAdTypeOptionsId,
  disabled,
  handleChange,
}) {
  const { t } = useTranslation();

  return (
    <div className="input-field">
      <label htmlFor="type">{t("ads.type")}</label>
      <div className="radios">
        <label htmlFor="sale">
          <input
            type="radio"
            name="type"
            id="sale"
            value="sale"
            checked={
              formData?.type === "sale" ||
              +showAdTypeOptionsId === +formData?.category_id
            }
            onChange={(e) => handleChange(e, setFormData)}
            disabled={disabled}
          />
          <span>{t("ads.sell")}</span>
        </label>
        {+showAdTypeOptionsId === +formData?.category_id && (
          <label htmlFor="rent">
            <input
              type="radio"
              name="type"
              id="rent"
              value="rent"
              checked={formData?.type === "rent"}
              onChange={(e) => handleChange(e, setFormData)}
              disabled={disabled}
            />
            <span>{t("ads.tajeer")}</span>
          </label>
        )}
      </div>
    </div>
  );
}
