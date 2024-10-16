import InputField from "../../ui/form-elements/InputField";
import SubmitButton from "../../ui/form-elements/SubmitButton";
import { useTranslation } from "react-i18next";

const ChangePassword = () => {
  const { t } = useTranslation();

  return (
    <section className="changePassword_section">
      <div className="row m-0">
        <div className="col-lg-10 col-10 p-2">
          <form>
            <InputField
              label={t("currentPassword")}
              placeholder={t("currentPassword")}
            />
            <InputField
              label={t("NewPassword")}
              placeholder={t("NewPassword")}
            />
            <InputField
              label={t("ConfirmPassword")}
              placeholder={t("ConfirmPassword")}
            />

            <SubmitButton name={t("confirm")} />
          </form>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;
