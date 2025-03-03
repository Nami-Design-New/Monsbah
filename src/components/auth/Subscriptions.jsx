import { useTranslation } from "react-i18next";
import SubmitButton from "../../ui/form-elements/SubmitButton";

export default function Subscriptions({ setFormType }) {
  const { t } = useTranslation();

  function handleSubmit(e) {
    e.preventDefault();
    setFormType("finished");
  }

  return (
    <>
      <div className="mb-4 mt-5">
        <h2 className="head text-center my-3">{t("subTitle")} </h2>
      </div>
      <form className="form otp-form" onSubmit={handleSubmit}>
        <div className="sub">
          <label>
            <div className="sub-input">
              <input type="radio" name="sub" />
              <h2>الباقة المجانيه</h2>
            </div>
            <ol className="info-sub">
              <li>يمكن نشر 5 اعلانات فقط</li>
            </ol>
            <p>المده : شهر واحد</p>
          </label>
        </div>
        <div className="sub">
          <label>
            <div className="sub-input">
              <input type="radio" name="sub" />
              <h2>الشهريه</h2>
            </div>
            <ol className="info-sub">
              <li>يمكنك نشر عدد لا محدود من الاعلانات</li>
              <li>
                تصميم كموقع خاص لمتجرك لمشاركته عبر وسائل التواصل الاجتماعي
              </li>
              <li>مكانيه اضافه او التعديل على الاعلان طوال مدة الاعلان</li>
              <li>احصائيه لعدد الزوار</li>
            </ol>
            <p>8 د.ك / شهريا</p>
          </label>
        </div>
        <div className="sub">
          <label>
            <div className="sub-input">
              <input type="radio" name="sub" />
              <h2>السنويه</h2>
            </div>
            <ol className="info-sub">
              <li>يمكنك نشر عدد لا محدود من الاعلانات</li>
              <li>
                تصميم كموقع خاص لمتجرك لمشاركته عبر وسائل التواصل الاجتماعي
              </li>
              <li>مكانيه اضافه او التعديل على الاعلان طوال مدة الاعلان</li>
              <li>احصائيه لعدد الزوار</li>
            </ol>
            <p className="price">
              <span>100 د.ك / سنويا</span>
              <span className="discount">120 د.ك / سنويا</span>
            </p>
            <div className="offer">
              <span>20 % OFF</span>
            </div>
          </label>
        </div>
        <div className=" w-75 d-flex align-items-center gap-2">
          <button
            aria-label="Back"
            className="back_btn"
            onClick={(e) => {
              e.preventDefault();
              setFormType("optCompany");
            }}
          >
            <i className="fal fa-arrow-right"></i>
          </button>

          <SubmitButton name={t("auth.verify")} />
        </div>
      </form>
    </>
  );
}
