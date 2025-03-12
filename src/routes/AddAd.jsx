import { useTranslation } from "react-i18next";
import { CATEGORY_TYPES } from "../constants/categories";
import { useSearchParams } from "react-router-dom";
import { handleChange } from "../utils/helpers";
import AdModal from "../ui/modals/AdModal";
import useGetProduct from "../hooks/products/useGetProduct";
import useGetCategories from "../hooks/settings/useGetCategories";
import useGetCities from "../hooks/settings/useGetCities";
import useGetStates from "../hooks/settings/useGetStates";
import useGetSubCategories from "../hooks/settings/useGetSubCategories";
import InputField from "../ui/form-elements/InputField";
import SelectField from "../ui/form-elements/SelectField";
import SubmitButton from "../ui/form-elements/SubmitButton";
import TextField from "../ui/form-elements/TextField";
import useAdForm from "../hooks/products/useAdForm";
import ProductImageGallery from "../components/products/ProductImageGallery";
import ProductContactOptions from "../components/products/ProductContactOptions";
import AdTypeSelector from "../components/products/AdTypeSelector";
import PageLoader from "../ui/loaders/PageLoader";

export default function AddAd() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const product_id = searchParams.get("product_id");
  const { data: categories } = useGetCategories();
  const { isLoading: productLoading } = useGetProduct(+product_id);

  const {
    formData,
    setFormData,
    productImages,
    newPhoneNumber,
    setNewPhoneNumber,
    loading,
    showModal,
    setShowModal,
    productId,
    handleImagesChange,
    handleRemoveImage,
    handleNameChange,
    handleSubmit,
  } = useAdForm(product_id);

  const { data: cities } = useGetCities(
    formData?.country_id,
    Boolean(formData?.country_id)
  );

  const { data: subcategories, isLoading: subcategoriesLoading } =
    useGetSubCategories(
      formData?.category_id || 1,
      Boolean(formData?.category_id)
    );

  const { data: areas, isLoading: areasLoading } = useGetStates(
    formData?.city_id,
    Boolean(formData?.city_id)
  );

  const handleCategoryChange = (e) => {
    setFormData({
      ...formData,
      category_id: e.target.value,
      sub_category_id: "",
      type: CATEGORY_TYPES.SALE,
    });
  };

  return productLoading ? (
    <PageLoader />
  ) : (
    <>
      <form
        className="form col-12 p-2 p-md-3 reverse-form"
        onSubmit={handleSubmit}
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
            id="name_ar"
            name="name_ar"
            value={formData.name_ar}
            onChange={handleNameChange}
            disabled={productLoading}
          />
        </div>

        <div className="form_group">
          <SelectField
            label={`${t("ads.mainCategory")} *`}
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={handleCategoryChange}
            options={categories?.map((category) => ({
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
            disabled={productLoading}
          />
        </div>

        <div className="form_group">
          <InputField
            required
            label={t("ads.price")}
            placeholder={t("ads.priceNote")}
            name="price"
            id="price"
            type="number"
            value={formData?.price}
            onChange={(e) => handleChange(e, setFormData)}
            disabled={productLoading}
          />

          <AdTypeSelector
            formData={formData}
            setFormData={setFormData}
            disabled={productLoading}
            handleChange={handleChange}
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
            disabled={productLoading}
            name={t(`${product_id ? "save" : "add"}`)}
          />
        </div>
      </form>

      <AdModal show={showModal} setShow={setShowModal} productId={productId} />
    </>
  );
}
