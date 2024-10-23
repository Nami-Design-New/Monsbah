import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { handleChange } from "../utils/helpers";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import useGetCategories from "../hooks/settings/useGetCategories";
import SelectField from "../ui/form-elements/SelectField";
import SubmitButton from "../ui/form-elements/SubmitButton";
import useGetSubCategories from "../hooks/settings/useGetSubCategories";
import InputField from "../ui/form-elements/InputField";
import useGetCities from "../hooks/settings/useGetCities";
import useGetStates from "../hooks/settings/useGetStates";
import TextField from "../ui/form-elements/TextField";
import PhoneInput from "../ui/form-elements/PhoneInput";
import axiosInstance from "../utils/axiosInstance";
import useGetProduct from "../hooks/products/useGetProduct";

export default function AddAd() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.clientData.client);
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();
  const product_id = searchParams.get("product_id");

  const { data: product } = useGetProduct(+product_id);

  console.log(product);

  const [newPhoneNumber, setNewPhoneNumber] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    images: [],
    image: "",
    name_ar: "",
    name_en: "",
    category_id: "",
    sub_category_id: "",
    city_id: "",
    state_id: "",
    description_ar: "",
    description_en: "",
    type: "sale",
    active_chat: "inactive",
    active_whatsapp: "inactive",
    active_call: "inactive",
  });

  const { data: categories } = useGetCategories();
  const showAdTypeOptionsId = categories?.find(
    (category) => category?.name === "فساتين"
  )?.id;

  const { data: cities } = useGetCities(
    user?.country?.id,
    Boolean(user?.country?.id)
  );
  const { data: subcategories, isLoading: subcategoriesLoading } =
    useGetSubCategories(formData?.category_id, Boolean(formData?.category_id));
  const { data: areas, isLoading: areasLoading } = useGetStates(
    formData?.city_id,
    Boolean(formData?.city_id)
  );

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      image: formData?.images[0],
    }));
  }, [formData?.images]);

  useEffect(() => {
    if (user) {
      setFormData((prevState) => ({
        ...prevState,
        country_id: user?.country?.id,
        country_code: user?.country?.country_code,
        phone: user?.phone,
        currency_id: user?.country?.currency?.id,
      }));
    }
  }, [user]);

  useEffect(() => {
    if (product) {
      setFormData((prevState) => ({
        ...prevState,
        name_ar: product?.name,
        name_en: product?.name,
        category_id: product?.category?.id,
        sub_category_id: product?.sub_category?.id,
        city_id: product?.city?.id,
        state_id: product?.state?.id,
        description_ar: product?.description,
        description_en: product?.description,
        type: product?.type,
        price: product?.price,
        active_chat: product?.active_chat,
        active_whatsapp: product?.active_whatsapp,
        active_call: product?.active_call,
        images: product?.images?.map((image) =>
          image?.image ? image?.image : null
        ),
      }));
    }
  }, [product]);

  const handleImagesChange = (e) => {
    e.preventDefault();
    const newImages = Array.from(e.target.files);
    if (newImages.length > 6) {
      toast.warning(t("ads.maxImages"));
      return;
    }
    setFormData((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...newImages],
    }));
  };

  const handleRemoveImage = (e, index, image) => {
    e.preventDefault();
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
    const { value } = e.target;
    const wordCount = value.trim().split(/\s+/).length;
    if (wordCount <= 5) {
      setFormData((prevState) => ({
        ...prevState,
        name_ar: value,
        name_en: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const requestBody = {
      name_ar: formData?.name_ar,
      name_en: formData?.name_en,
      price: formData?.price,
      category_id: formData?.category_id,
      sub_category_id: formData?.sub_category_id,
      city_id: formData?.city_id,
      state_id: formData?.state_id,
      description_ar: formData?.description_ar,
      description_en: formData?.description_en,
      type: formData?.type,
      active_chat: formData?.active_chat,
      active_whatsapp: formData?.active_whatsapp,
      active_call: formData?.active_call,
      delete_images: formData?.delete_images,
      country_id: formData?.country_id,
      country_code: formData?.country_code,
      phone: formData?.phone,
      currency_id: formData?.currency_id,
    };

    if (formData?.images?.length < 1) {
      toast.error(t("ads.imagesRequired"));
      setLoading(false);
      return;
    } else {
      formData?.images.forEach((image) => {
        if (image?.type?.startsWith("image/")) {
          requestBody?.images?.push(image);
        }
      });
      requestBody.image = formData?.images?.[0];
    }

    if (product_id) {
      requestBody.id = product_id;
    }

    try {
      const res = await axiosInstance.post(
        `/client/${product_id ? "update-product" : "store-product"}`,
        requestBody,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        queryClient.invalidateQueries({ queryKey: ["user-products"] });
        navigate("/profile?tab=ads");
        setFormData({
          images: [],
          image: "",
          name_ar: "",
          name_en: "",
          category_id: "",
          sub_category_id: "",
          city_id: "",
          state_id: "",
          description_ar: "",
          description_en: "",
          type: "sale",
          active_chat: "inactive",
          active_whatsapp: "inactive",
          active_call: "inactive",
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
      throw new Error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form col-12 p-4 reverse-form" onSubmit={handleSubmit}>
      {/* gallery */}
      <div className="form_group">
        <div className="input-field">
          <label htmlFor="certificate-image">
            <div style={{ whiteSpace: "nowrap" }}>{t("ads.images")}</div>{" "}
            <span>({t("ads.imagesHint")})</span>
          </label>

          <div className="images_grid_upload">
            {/* image upload field */}
            {formData?.images?.length < 6 && (
              <div className="file_upload">
                <label htmlFor="file_upload">
                  <input
                    type="file"
                    id="file_upload"
                    accept="image/*,video/*"
                    name="images"
                    multiple
                    onChange={handleImagesChange}
                  />
                  <img src="/images/icons/gallery.svg" alt="upload" />
                </label>
              </div>
            )}

            {/* uploaded images */}
            {formData?.images?.map((image, index) => (
              <div className="uploaded_file" key={index}>
                {image?.type?.startsWith("video/") ? (
                  <video
                    src={
                      image?.type?.startsWith("video/")
                        ? URL.createObjectURL(image)
                        : image?.image
                    }
                    alt="file"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <img
                    src={
                      image?.type?.startsWith("image/")
                        ? URL.createObjectURL(image)
                        : image
                    }
                    alt="file"
                  />
                )}

                <button onClick={(e) => handleRemoveImage(e, index, image)}>
                  <i className="fa-light fa-xmark"></i>
                </button>
                {index === 0 && (
                  <span className="mainImg">{t("ads.mainImage")}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

    

      {/* name */}
      <div className="form_group">
        <InputField
          required
          label={t("ads.name")}
          placeholder={t("ads.nameNote")}
          id="name_ar"
          name="name_ar"
          value={formData.name_ar}
          onChange={handleNameChange}
        />
      </div>

      {/* category */}
      <div className="form_group">
        <SelectField
          label={`${t("ads.mainCategory")} *`}
          id="category_id"
          name="category_id"
          value={formData.category_id}
          onChange={(e) => {
            setFormData({
              ...formData,
              category_id: e.target.value,
              sub_category_id: "",
              type: "sale",
            });
          }}
          options={categories?.map((category) => ({
            name: category?.name,
            value: category?.id,
          }))}
        />

        <SelectField
          label={`${t("ads.subCategory")} *`}
          loading={subcategoriesLoading}
          loadingText={t("isLoading")}
          id="sub_category_id"
          name="sub_category_id"
          value={formData.sub_category_id}
          onChange={(e) =>
            setFormData({
              ...formData,
              sub_category_id: e.target.value,
            })
          }
          options={subcategories?.map((subcategory) => ({
            name: subcategory?.name,
            value: subcategory?.id,
          }))}
        />
      </div>

  {/*  price & type */}
  <div className="form_group">
        <InputField
          required
          label={t("ads.price")}
          placeholder={t("ads.priceNote")}
          name="price"
          id="price"
          type="number"
          value={formData?.price}
          onChange={(e) => {
            handleChange(e, setFormData);
          }}
        />
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
              />
              <span>{t("ads.sell")}</span>
            </label>
            {+showAdTypeOptionsId === +formData?.category_id ? (
              <label htmlFor="rent">
                <input
                  type="radio"
                  name="type"
                  id="rent"
                  value="rent"
                  checked={formData?.type === "rent"}
                  onChange={(e) => handleChange(e, setFormData)}
                />
                <span>{t("ads.tajeer")}</span>
              </label>
            ) : null}
          </div>
        </div>
      </div>
      
      {/* city, region */}
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
              state_id: "",
            })
          }
          options={cities?.map((city) => ({
            name: city?.name,
            value: city?.id,
          }))}
        />
        <SelectField
          label={`${t("ads.area")} *`}
          loading={areasLoading}
          loadingText={t("isLoading")}
          id="state_id"
          name="state_id"
          value={formData.state_id}
          onChange={(e) =>
            setFormData({
              ...formData,
              state_id: e.target.value,
            })
          }
          options={areas?.map((area) => ({
            name: area?.name,
            value: area?.id,
          }))}
        />
      </div>

      {/* description */}
      <div className="form_group">
        <TextField
          required
          label={t("ads.description")}
          placeholder={t("ads.descriptionPlaceholder")}
          name="description_ar"
          id="description_ar"
          value={formData?.description_ar}
          onChange={(e) => {
            setFormData({
              ...formData,
              description_ar: e.target.value,
              description_en: e.target.value,
            });
          }}
        />
      </div>

      {/* contact */}
      <div className="form_group">
        <div className="input-field">
          <label htmlFor="type">
            {t("ads.contact")} <span>( {t("ads.contactNote")} )</span>
          </label>{" "}
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
              />
              <span>{t("ads.chat")}</span>
            </label>
          </div>
        </div>
      </div>

      {/* new phone number */}
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
            onChange={(e) => handleChange(e, setFormData)}
          />
        </div>
      )}

      <div className="d-flex justify-content-end mt-2">
        <SubmitButton
          loading={loading}
          name={t(`${product_id ? "save" : "add"}`)}
        />
      </div>
    </form>
  );
}
