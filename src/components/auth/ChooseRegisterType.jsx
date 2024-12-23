import { useTranslation } from "react-i18next";

export default function ChooseRegisterType({ setFormType }) {
  const { t } = useTranslation();
  return (
    <>
      <div className="mb-4">
        <h2 className="head">{t("auth.registerNewAccount")} </h2>
        <p className="sub-head">{t("auth.ChooseAcountType")}</p>
      </div>
      <div className="form">
        <h6>{t("auth.accountType")}</h6>
        <div className="d-flex gap-2">
          <button onClick={() => setFormType("register")}>
            <i className="fa-sharp fa-solid fa-user"></i>
            {t("auth.personal")}
          </button>
          <button onClick={() => setFormType("register-company")}>
            <i className="fa-sharp fa-solid fa-building"></i>
            {t("auth.company")}
          </button>
        </div>

        <span className="noAccount">
          {t("auth.haveAccount")}{" "}
          <span onClick={() => setFormType("login")}>{t("auth.login")}</span>
        </span>
      </div>
    </>
  );
}
