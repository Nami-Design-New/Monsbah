import { Modal } from "react-bootstrap";
import SubmitButton from "../../ui/form-elements/SubmitButton";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export default function AdModal({
  show,
  setShow,
  formData,
  setFormData,
  productImages,
  product_id,
}) {
  const [loading, setLoading] = useState();

  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = useSelector((state) => state.clientData.client);
  const { lang } = useSelector((state) => state.language);

  const handleClose = () => setShow(false);

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
        if (product_id) {
          queryClient.invalidateQueries(["product", lang, product_id]);
        }
        queryClient.invalidateQueries({ queryKey: ["products"] });
        queryClient.invalidateQueries({ queryKey: ["allProducts"] });
        queryClient.invalidateQueries({ queryKey: ["user-products"] });
        queryClient.invalidateQueries({ queryKey: ["user-favorites"] });
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
    <Modal
      centered
      show={show}
      className="authModal"
      backdrop="static"
      size="lg"
    >
      <Modal.Body>
        <button
          aria-label="Close modal"
          className="closeModal"
          onClick={handleClose}
        >
          <i className="fa-regular fa-x"></i>
        </button>
        <p className="ad-modal-header">{t("adPost")}</p>
        <div className="my-5">
          <div className="mb-4 mt-5">
            <h2 className="head fs-5 text-center  my-3">{t("subTitle")} </h2>
          </div>

          <form className="form otp-form mt-4" onSubmit={handleSubmit}>
            <div className="sub">
              <label>
                <div className="sub-input">
                  <input type="radio" name="sub" />
                  <h2>اعلان مجاني</h2>
                </div>

                <p>مدة الاعلان اسبوع</p>
              </label>
            </div>
            <div className="sub">
              <label>
                <div className="sub-input">
                  <input type="radio" name="sub" />
                  <h2>اعلان مميز</h2>
                </div>
                <p>اعلان مميز ومثبت في اعلى الصفحة للحصول على مشاهدات عاليه</p>
                <p>8 د.ك / شهريا</p>
              </label>
            </div>
            <div className=" w-75 d-flex align-items-center gap-2">
              <SubmitButton name={t("completePay")} />
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
