import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Finished({ setShow }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  function handleClick() {
    navigate("/");
    setShow(false);
  }
  return (
    <>
      <div className="finish ">
        <img src="/images/check.png" />
        <p> {t("auth.thanks")} </p>
        <button onClick={handleClick}>{t("home")}</button>
      </div>
    </>
  );
}
