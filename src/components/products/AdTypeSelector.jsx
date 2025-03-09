import { useTranslation } from "react-i18next";
import { CATEGORY_TYPES, DRESS_CATEGORY_ID } from "../../constants/categories";

export default function AdTypeSelector({
  formData,
  setFormData,
  disabled,
  handleChange,
}) {
  const { t } = useTranslation();
  const showRentOption = formData?.category_id === DRESS_CATEGORY_ID;

  return (
    <div className="input-field">
      <label htmlFor="type">{t("ads.type")}</label>
      <div className="radios">
        <label htmlFor="sale">
          <input
            type="radio"
            name="type"
            id="sale"
            value={CATEGORY_TYPES.SALE}
            checked={formData?.type === CATEGORY_TYPES.SALE}
            onChange={(e) => handleChange(e, setFormData)}
            disabled={disabled}
          />
          <span>{t("ads.sell")}</span>
        </label>
        {showRentOption && (
          <label htmlFor="rent">
            <input
              type="radio"
              name="type"
              id="rent"
              value={CATEGORY_TYPES.RENT}
              checked={formData?.type === CATEGORY_TYPES.RENT}
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
