import { toast } from "react-toastify";
import SubmitButton from "../../ui/form-elements/SubmitButton";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useGetCountries from "../../hooks/settings/useGetCountries";

import useVerification from "../../hooks/verification/useVerification";
import { useState } from "react";
import { handleChange } from "../../utils/helpers";
import SelectField from "../../ui/form-elements/SelectField";
import PhoneInput from "../../ui/form-elements/PhoneInput";
import useGetCategories from "../../hooks/settings/useGetCategories";

function VerificationTab() {
  const { t } = useTranslation();
  const { data: countries } = useGetCountries();
  const { data: categories } = useGetCategories();
  const { verify } = useVerification();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "person",
    country_id: "",
    phone: "",
    country_code: "966",
    category_id: "",
    document_type: "",
    file: "",
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      !formData.file ||
      !formData.country_id ||
      !formData.phone ||
      !formData.category_id ||
      !formData.document_type ||
      !formData.type ||
      !formData.country_code
    ) {
      toast.error(t("allFieldsRequired"));
      setLoading(false);
      return;
    }
    try {
      verify(formData, {
        onSuccess: () => {
          toast.success(t("subscripedSuccessfully"));
          setFormData({
            type: "person",
            country_id: "",
            phone: "",
            country_code: "966",
            category_id: "",
            document_type: "",
            file: "",
          });
          queryClient.invalidateQueries(["profile"]);
          navigate("/profile");
        },
      });
    } catch (error) {
      toast.error(t("someThingWentWrong"));
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form col-12 p-4 reverse-form" onSubmit={handleSubmit}>
      <div className="form_group">
        <div className="input-field">
          <label htmlFor="type">{t("verification.type")} *</label>
          <div className="radios">
            <label htmlFor="person">
              <input
                type="radio"
                name="type"
                id="person"
                value="person"
                checked={formData?.type === "person"}
                onChange={(e) => handleChange(e, setFormData)}
              />
              <span>{t("verification.person")}</span>
            </label>
            <label htmlFor="company">
              <input
                type="radio"
                name="type"
                id="company"
                value="company"
                checked={formData?.type === "company"}
                onChange={(e) => handleChange(e, setFormData)}
              />
              <span>{t("verification.company")}</span>
            </label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-12 d-flex flex-column gap-3 mb-3">
          <div className="form_group">
            <SelectField
              label={`${t("verification.country")} *`}
              id="country_id"
              name="country_id"
              value={formData.country_id}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  country_id: e.target.value,
                })
              }
              options={countries?.map((country) => ({
                name: country?.name,
                value: country?.id,
              }))}
            />
          </div>
          <PhoneInput
            label={`${t("verification.phone")} *`}
            type="number"
            id="phone"
            name="phone"
            placeholder={t("verification.phone")}
            value={formData.phone}
            countryCode={formData.country_code}
            onChange={(e) => handleChange(e, setFormData)}
            onSelect={(code, setShow) => {
              setFormData((prev) => ({
                ...prev,
                country_code: code,
              }));
              setShow(false);
            }}
          />

          <SelectField
            label={`${t("verification.category")} *`}
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={(e) =>
              setFormData({
                ...formData,
                category_id: e.target.value,
              })
            }
            options={categories?.map((category) => ({
              name: category?.name,
              value: category?.id,
            }))}
          />
        </div>
        <div className="col-lg-6 col-12 d-flex flex-column gap-3 mb-3">
          <div className="col-12 field-header">
            <h6 className="title">
              {t("verification.verificationConfirmationTitle")}:
            </h6>
            <span className="subTitle">
              {t("verification.verificationConfirmationSubtitle")}
            </span>
          </div>
          <div className="form_group">
            <SelectField
              label={`${t("verification.docoumentType")} *`}
              id="document_type"
              name="document_type"
              value={formData.document_type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  document_type: e.target.value,
                })
              }
              options={[
                { name: `${t("verification.id")}`, value: "id" },
                {
                  name: `${t("verification.passport")}`,
                  value: "passport",
                },
                {
                  name: `${t("verification.license")}`,
                  value: "license",
                },
              ]}
            />
          </div>
          <div className="input-field">
            <label htmlFor="certificate-image">
              {t("verification.uploadDocument")} *
            </label>
            <label className="image_upload">
              <input
                type="file"
                id="file"
                accept="image/*"
                name="file"
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    file: e.target.files[0],
                  }))
                }
              />
              {formData?.file ? (
                <>
                  <img
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      height: "100%",
                    }}
                    src={
                      formData?.file?.type?.startsWith("image")
                        ? URL.createObjectURL(formData?.file)
                        : formData?.file
                    }
                    alt="upload"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setFormData({
                        ...formData,
                        file: "",
                      });
                    }}
                  >
                    <i className="fa-light fa-xmark"></i>
                  </button>
                </>
              ) : (
                <img src="/images/gallery.svg" alt="upload" />
              )}
            </label>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <SubmitButton loading={loading} name={t("verification.verify")} />
      </div>
    </form>
  );
}

export default VerificationTab;
