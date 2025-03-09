import { useTranslation } from "react-i18next";
import { Form } from "react-bootstrap";
import PhoneInput from "../../ui/form-elements/PhoneInput";

export default function ProductContactOptions({
  formData,
  setFormData,
  newPhoneNumber,
  setNewPhoneNumber,
  disabled,
}) {
  const { t } = useTranslation();

  return (
    <>
      <div className="form_group">
        <div className="input-field">
          <label htmlFor="type">
            {t("ads.contact")} <span>( {t("ads.contactNote")} )</span>
          </label>
          <div className="radios">
            <label htmlFor="active_call">
              <input
                type="checkbox"
                name="active_call"
                id="active_call"
                checked={formData?.active_call === "active"}
                onChange={() =>
                  setFormData({
                    ...formData,
                    active_call:
                      formData.active_call === "active" ? "inactive" : "active",
                  })
                }
                disabled={disabled}
              />
              <span>{t("ads.call")}</span>
            </label>
            <label htmlFor="active_whatsapp">
              <input
                type="checkbox"
                name="active_whatsapp"
                id="active_whatsapp"
                checked={formData?.active_whatsapp === "active"}
                onChange={() =>
                  setFormData({
                    ...formData,
                    active_whatsapp:
                      formData.active_whatsapp === "active"
                        ? "inactive"
                        : "active",
                  })
                }
                disabled={disabled}
              />
              <span>{t("ads.whatsapp")}</span>
            </label>
            <label htmlFor="active_chat">
              <input
                type="checkbox"
                name="active_chat"
                id="active_chat"
                checked={formData?.active_chat === "active"}
                onChange={() =>
                  setFormData({
                    ...formData,
                    active_chat:
                      formData.active_chat === "active" ? "inactive" : "active",
                  })
                }
                disabled={disabled}
              />
              <span>{t("ads.chat")}</span>
            </label>
          </div>
        </div>
      </div>

      <div className="form_group">
        <div className="question p-0 pt-2">
          <label htmlFor="newPhoneNumber" className="quest">
            {t("ads.doYouWantToAddNewPhoneNumber")}
          </label>
          <Form.Switch
            id="newPhoneNumber"
            name="newPhoneNumber"
            checked={newPhoneNumber}
            onChange={() => {
              setNewPhoneNumber(!newPhoneNumber);
              setFormData({ ...formData, phone: "" });
            }}
            disabled={disabled}
          />
        </div>
      </div>

      {newPhoneNumber && (
        <div className="form_group">
          <PhoneInput
            label={`${t("verification.phone")} *`}
            type="number"
            id="phone"
            name="phone"
            required
            disableSelect={true}
            placeholder={t("verification.phone")}
            value={formData.phone}
            countryCode={formData?.country_code}
            onChange={(e) => {
              const { name, value } = e.target;
              setFormData((prev) => ({ ...prev, [name]: value }));
            }}
            disabled={disabled}
          />
        </div>
      )}
    </>
  );
} 