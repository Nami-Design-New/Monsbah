import { useEffect, useMemo, useState } from "react";
import { handleChange } from "../utils/helpers";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../ui/form-elements/InputField";
import PhoneInput from "../ui/form-elements/PhoneInput";
import SelectField from "../ui/form-elements/SelectField";
import SubmitButton from "../ui/form-elements/SubmitButton";
import TextField from "../ui/form-elements/TextField";
import axiosInstance from "../utils/axiosInstance";
import useGetStates from "../hooks/settings/useGetStates";
import useGetCities from "../hooks/settings/useGetCities";
import useGetCategories from "../hooks/settings/useGetCategories";
import useGetProduct from "../hooks/products/useGetProduct";
import useGetCompanyCategories from "../hooks/settings/useGetCompanyCategories";
import useGetSubCategories from "../hooks/settings/useGetSubCategories";
import { setShowModal } from "../redux/slices/companySubscribe";

export default function AddCompanyProduct() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.clientData.client);
  const { id: product_id } = useParams();
  const { lang } = useSelector((state) => state.language);
  const { data: categories } = useGetCategories();
  const { data: companyCategories } = useGetCompanyCategories();
  const { data: product, isLoading: productLoading } = useGetProduct(
    +product_id
  );

  const [productImages, setProductImages] = useState([]);
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
    user?.city?.id,
    Boolean(user?.city?.id)
  );

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      image: formData?.images[0],
    }));
  }, [formData?.images]);

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      country_id: user?.country?.id,
      city_id: user?.city?.id,
      state_id: user?.state?.id,
      phone: user?.phone,
      country_code: user?.country?.country_code,
      currency_id: user?.country?.currency?.id,
    }));
  }, [user]);

  useEffect(() => {
    if (product && product_id) {
      setFormData((prevState) => ({
        ...prevState,
        name_ar: product?.name,
        name_en: product?.name,
        category_id: product?.category_id,
        sub_category_id: product?.sub_category_id,
        city_id: product?.city?.id,
        state_id: product?.state?.id,
        description_ar: product?.description,
        description_en: product?.description,
        type: product?.type,
        price: product?.price,
        active_chat: product?.active_chat,
        active_whatsapp: product?.active_whatsapp,
        active_call: product?.active_call,
        image: product?.image,
        images: product?.images?.map((image) =>
          image?.image ? image?.image : null
        ),
      }));
      const srcs = product?.images?.map((image) => image?.image);
      if (srcs) {
        setProductImages([product?.image, ...srcs]);
      }
    }
  }, [product, product_id]);

  const handleImagesChange = (e) => {
    e.preventDefault();

    const newImages = Array.from(e.target.files);
    if (newImages.length > 6) {
      toast.warning(t("ads.maxImages"));
      return;
    }
    setProductImages((prevState) => [...prevState, ...newImages]);

    setFormData((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...newImages],
    }));
  };

  const handleRemoveImage = (e, index, image) => {
    e.preventDefault();
    console.log("index", index);
    console.log("image", image);

    if (image.id) {
      setFormData((prevState) => ({
        ...prevState,
        images: prevState.images.filter((_, i) => i !== index),
        delete_images: [...prevState.delete_images, image.id],
      }));
    } else {
      if (formData?.delete_images) {
        setFormData((prevState) => ({
          ...prevState,
          images: prevState.images.filter((img) => img !== image),
          delete_images: [...prevState.delete_images, image],
        }));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          images: prevState.images.filter((img) => img !== image),
          delete_images: [image],
        }));
      }
    }
    setProductImages((prevState) => prevState.filter((_, i) => i !== index));
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
      country_id: user?.country?.id,
      country_code: formData?.country_code,
      phone: formData?.phone,
      currency_id: formData?.currency_id,
    };

    if (!user?.isSubscribed) {
      dispatch(setShowModal(true));
      setLoading(false);
      return;
    }

    if (productImages?.length < 1) {
      toast.error(t("ads.imagesRequired"));
      setLoading(false);
      return;
    } else {
      if (productImages[0]?.type?.startsWith("image/")) {
        requestBody.image = productImages[0];
      }
      productImages?.slice(1).forEach((image) => {
        if (image?.type?.startsWith("image/")) {
          if (requestBody?.images) {
            requestBody.images = [...requestBody.images, image];
          } else {
            requestBody.images = [image];
          }
        }
      });
    }

    if (formData?.delete_images) {
      requestBody.delete_images = formData?.delete_images;
    }

    if (product_id) {
      requestBody.id = product_id;
    }

    try {
      const res = await axiosInstance.post(
        `/company/${product_id ? "update-product" : "store-product"}`,
        requestBody,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        navigate("/company-profile");
        if (product_id) {
          queryClient.invalidateQueries(["product", lang, product_id]);
        }
        queryClient.invalidateQueries({ queryKey: ["products"] });
        queryClient.invalidateQueries({ queryKey: ["allProducts"] });
        queryClient.invalidateQueries({ queryKey: ["company-products"] });
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
      throw new Error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const categoryList = useMemo(
    () =>
      (localStorage.getItem("userType") === "client"
        ? categories
        : companyCategories) || [],
    [categories, companyCategories]
  );

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <form
          className="col-lg-10 col-12 p-2 p-md-3 reverse-form form"
          onSubmit={handleSubmit}
        >
          {/* gallery */}
          <div className="form_group">
            <div className="input-field">
              <label
                htmlFor="certificate-image w-100"
                style={{ whiteSpace: "wrap !important" }}
              >
                <div style={{ whiteSpace: "nowrap" }}>{t("ads.images")}</div>{" "}
                <span style={{ width: "unset !important", flex: "1" }}>
                  ({t("ads.imagesHint")})
                </span>
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
                        disabled={productLoading}
                      />
                      <img src="/images/icons/gallery.svg" alt="upload" />
                    </label>
                  </div>
                )}

                {/* uploaded images */}
                {productImages &&
                  productImages?.map((image, index) => (
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

                      <button
                        aria-label="Remove"
                        onClick={(e) => handleRemoveImage(e, index, image)}
                      >
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
              id="name"
              name="name"
              value={formData.name_ar}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  name_ar: e.target.value,
                  name_en: e.target.value,
                });
              }}
              disabled={productLoading}
            />
          </div>

          {/* category */}
          <div className="form_group">
            <SelectField
              label={`${t("ads.mainCategory")} *`}
              id="category_id"
              name="category_id"
              value={formData?.category_id}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  category_id: e.target.value,
                  sub_category_id: "",
                  type: "sale",
                });
              }}
              options={categoryList?.map((category) => ({
                name: category?.name,
                value: category?.id,
              }))}
              disabled={productLoading}
            />

            <SelectField
              label={`${t("ads.subCategory")} *`}
              loading={subcategoriesLoading}
              loadingText={t("isLoading")}
              id="sub_category_id"
              name="sub_category_id"
              value={formData?.sub_category_id}
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
              disabled={productLoading}
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
              disabled={productLoading}
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
                    disabled={productLoading}
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
                      disabled={productLoading}
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
              disabled={productLoading}
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
              disabled={productLoading}
            />
          </div>

          {/* description */}
          <div className="form_group">
            <TextField
              required
              label={t("ads.description")}
              placeholder={t("ads.descriptionPlaceholder")}
              name="descriptio"
              id="description"
              value={formData?.description_ar}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  description_ar: e.target.value,
                  description_en: e.target.value,
                });
              }}
              disabled={productLoading}
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
                          formData.active_call === "active"
                            ? "inactive"
                            : "active",
                      })
                    }
                    disabled={productLoading}
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
                    disabled={productLoading}
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
                          formData.active_chat === "active"
                            ? "inactive"
                            : "active",
                      })
                    }
                    disabled={productLoading}
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
                disabled={productLoading}
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
                disabled={productLoading}
              />
            </div>
          )}

          <div className="d-flex justify-content-end mt-2">
            <SubmitButton
              loading={loading}
              name={t(`${product_id ? "save" : "add"}`)}
              disabled={productLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
