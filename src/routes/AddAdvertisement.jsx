import { useState } from "react";
import { useTranslation } from "react-i18next";
import { handleChange } from "../utils/helpers";
import useGetCategories from "../hooks/useGetCategories";
import SelectField from "../ui/form-elements/SelectField";
import SubmitButton from "../ui/form-elements/SubmitButton";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAddAd from "../hooks/ads/useAddAd";
import useGetSubCategories from "../hooks/useGetSubCategories";
import InputField from "../ui/form-elements/InputField";
import useGetCities from "../hooks/settings/useGetCities";
import useGetStates from "../hooks/settings/useGetStates";
import TextField from "../ui/form-elements/TextField";
import SectionHeader from "../components/layout/SectionHeader";
import { Form } from "react-bootstrap";
import PhoneInput from "../ui/form-elements/PhoneInput";

function AddAdvertisement() {
  const { t } = useTranslation();
  const { data: cities } = useGetCities(null, true);
  const { data: areas } = useGetStates(null, true);
  const { data: categories } = useGetCategories();
  const { addAd } = useAddAd();
  const [newPhoneNumber, setNewPhoneNumber] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    images: [],
    name: "",
    type: "sell",
    city_id: "",
    region_id: "",
    descr: "",
    phone: "",
    country_code: "966",
    cat_id: 1,
    sub_cat_id: 1,
    document_type: "",
    file: "",
  });
  const { data: subcategories } = useGetSubCategories(formData?.cat_id);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleImagesChange = (e) => {
    e.preventDefault();
    const newImages = Array.from(e.target.files);
    setFormData((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...newImages],
    }));
  };

  const handleRemoveImage = (index, image) => {
    if (image.id) {
      setFormData((prevState) => ({
        ...prevState,
        images: prevState.images.filter((_, i) => i !== index),
        delete_images: [...prevState.delete_images, image.id],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        images: prevState.images.filter((_, i) => i !== index),
      }));
    }
  };

  const handleNameChange = (e) => {
    const newValue = e.target.value;
    const wordCount = newValue.trim().split(/\s+/).length;

    if (wordCount <= 5) {
      setFormData((prevState) => ({
        ...prevState,
        name: newValue,
      }));
    } else {
      toast.error(t("maxFiveWords"));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      !formData.images ||
      !formData.name ||
      !formData.file ||
      !formData.city_id ||
      !formData.region_id ||
      !formData.phone ||
      !formData.cat_id ||
      !formData.sub_cat_id ||
      !formData.document_type ||
      !formData.type ||
      !formData.country_code ||
      !formData.descr
    ) {
      toast.error(t("allFieldsRequired"));
      setLoading(false);
      return;
    }
    try {
      addAd(formData, {
        onSuccess: () => {
          toast.success(t("ads.successfullyAdded"));
          setFormData({
            type: "sell",
            name: "",
            city_id: "",
            region_id: "",
            descr: "",
            phone: "",
            country_code: "966",
            cat_id: "",
            document_type: "",
            file: "",
          });
          queryClient.invalidateQueries(["ads"]);
          navigate("/ads");
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
    <div className="add-ad-page">
      <SectionHeader />
      <div className="container mt-4">
        <div className="row m-0">
          <div className="col-12 p-2">
            <form className="form" onSubmit={handleSubmit}>
              <div className="form_group">
                <div className="input-field">
                  <label htmlFor="certificate-image">
                    {t("ads.images")} * <span>({t("ads.imagesHint")})</span>
                  </label>
                  <div className="images_grid_upload">
                    {formData?.images?.length < 6 && (
                      <div className="file_upload">
                        <label htmlFor="file_upload">
                          <input
                            type="file"
                            id="file_upload"
                            accept="image/*"
                            name="images"
                            multiple
                            onChange={handleImagesChange}
                          />
                          <img src="/images/gallery.svg" alt="upload" />
                          <div className="file_upload_dimensions"></div>
                        </label>
                      </div>
                    )}
                    {formData?.images && (
                      <>
                        {formData?.images?.map((image, index) => (
                          <div className="uploaded_file" key={index}>
                            <img
                              src={
                                image?.type?.startsWith("image/")
                                  ? URL.createObjectURL(image)
                                  : image?.image
                              }
                              alt="file"
                            />
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleRemoveImage(index, image);
                              }}
                            >
                              <i className="fa-light fa-xmark"></i>
                            </button>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="form_group">
                <InputField
                  required
                  label={t("ads.name")}
                  placeholder={t("ads.nameNote")}
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleNameChange}
                />
              </div>
              <div className="form_group">
                <SelectField
                  label={`${t("ads.mainCategory")} *`}
                  id="cat_id"
                  name="cat_id"
                  value={formData.cat_id}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cat_id: e.target.value,
                    })
                  }
                  options={categories?.map((category) => ({
                    name: category?.name,
                    value: category?.id,
                  }))}
                />

                <SelectField
                  label={`${t("ads.subCategory")} *`}
                  id="sub_cat_id"
                  name="sub_cat_id"
                  value={formData.sub_cat_id}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sub_cat_id: e.target.value,
                    })
                  }
                  options={subcategories?.map((subcategory) => ({
                    name: subcategory?.name,
                    value: subcategory?.id,
                  }))}
                />
              </div>
              <div className="form_group">
                <SelectField
                  label={`${t("ads.city")} *`}
                  id="city_id"
                  name="city_id"
                  value={formData.city_id}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      city_id: e.target.value,
                    })
                  }
                  options={cities?.map((city) => ({
                    name: city?.name,
                    value: city?.id,
                  }))}
                />
                <SelectField
                  label={`${t("ads.area")} *`}
                  id="region_id"
                  name="region_id"
                  value={formData.region_id}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      region_id: e.target.value,
                    })
                  }
                  options={areas?.map((area) => ({
                    name: area?.name,
                    value: area?.id,
                  }))}
                />
              </div>
              <div className="form_group">
                <TextField
                  required
                  label={t("ads.description")}
                  placeholder={t("ads.descriptionPlaceholder")}
                  name="descr"
                  id="description"
                  value={formData?.descr}
                  onChange={(e) => {
                    handleChange(e, setFormData);
                  }}
                />
              </div>
              <div className="form_group">
                <InputField
                  required
                  label={t("ads.price")}
                  placeholder="00"
                  name="price"
                  id="price"
                  type="number"
                  value={formData?.price}
                  onChange={(e) => {
                    handleChange(e, setFormData);
                  }}
                />
                <div className="input-field">
                  <label htmlFor="type">{t("ads.type")} *</label>
                  <div className="radios">
                    <label htmlFor="sell">
                      <input
                        type="radio"
                        name="type"
                        id="sell"
                        value="sell"
                        checked={formData?.type === "sell"}
                        onChange={(e) => handleChange(e, setFormData)}
                      />
                      <span>{t("ads.sell")}</span>
                    </label>
                    <label htmlFor="tajeer">
                      <input
                        type="radio"
                        name="type"
                        id="tajeer"
                        value="tajeer"
                        checked={formData?.type === "tajeer"}
                        onChange={(e) => handleChange(e, setFormData)}
                      />
                      <span>{t("ads.tajeer")}</span>
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
                    onChange={() => setNewPhoneNumber(!newPhoneNumber)}
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
                </div>
              )}
              <div className="mt-4">
                <SubmitButton loading={loading} name={t("add")} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAdvertisement;
