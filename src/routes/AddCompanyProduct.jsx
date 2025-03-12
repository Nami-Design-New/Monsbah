import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setShowModal } from "../redux/slices/companySubscribe";
import InputField from "../ui/form-elements/InputField";
import SelectField from "../ui/form-elements/SelectField";
import SubmitButton from "../ui/form-elements/SubmitButton";
import TextField from "../ui/form-elements/TextField";
import useGetStates from "../hooks/settings/useGetStates";
import useGetCities from "../hooks/settings/useGetCities";
import useGetProduct from "../hooks/products/useGetProduct";
import useGetSubCategories from "../hooks/settings/useGetSubCategories";
import useCompanyProductForm from "../hooks/products/useCompanyProductForm";
import ProductImageGallery from "../components/products/ProductImageGallery";
import ProductContactOptions from "../components/products/ProductContactOptions";
import PageLoader from "../ui/loaders/PageLoader";

export default function AddCompanyProduct() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id: product_id } = useParams();
  const user = useSelector((state) => state.clientData.client);
  const { isLoading: productLoading } = useGetProduct(+product_id);

  const {
    formData,
    setFormData,
    productImages,
    newPhoneNumber,
    setNewPhoneNumber,
    loading,
    handleImagesChange,
    handleRemoveImage,
    handleSubmit,
  } = useCompanyProductForm(product_id);

  const { data: cities } = useGetCities(
    user?.country?.id,
    Boolean(user?.country?.id)
  );

  const { data: subcategories, isLoading: subcategoriesLoading } =
    useGetSubCategories(user?.category?.id, Boolean(user?.category?.id));

  const { data: areas, isLoading: areasLoading } = useGetStates(
    user?.city?.id,
    Boolean(user?.city?.id)
  );

  const onSubmit = (e) => {
    e.preventDefault();

    if (!user?.is_subscribed) {
      dispatch(setShowModal(true));
      return;
    }

    handleSubmit(e);
  };

  return productLoading ? (
    <PageLoader />
  ) : (
    <div className="container my-5">
      <div className="row justify-content-center">
        <form
          className="col-lg-10 col-12 p-2 p-md-3 reverse-form form"
          onSubmit={onSubmit}
        >
          <ProductImageGallery
            productImages={productImages}
            handleImagesChange={handleImagesChange}
            handleRemoveImage={handleRemoveImage}
            disabled={productLoading}
          />

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

          <div className="form_group">
            <SelectField
              label={`${t("category")} *`}
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
            <InputField
              required
              label={t("ads.price")}
              placeholder={t("ads.priceNote")}
              name="price"
              id="price"
              type="number"
              value={formData?.price}
              onChange={(e) => {
                const { name, value } = e.target;
                setFormData((prev) => ({ ...prev, [name]: value }));
              }}
              disabled={productLoading}
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

          <div className="form_group">
            <TextField
              required
              label={t("ads.description")}
              placeholder={t("ads.descriptionPlaceholder")}
              name="description"
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

          <ProductContactOptions
            formData={formData}
            setFormData={setFormData}
            newPhoneNumber={newPhoneNumber}
            setNewPhoneNumber={setNewPhoneNumber}
            disabled={productLoading}
          />

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
