import { useTranslation } from "react-i18next";

export default function ProductImageGallery({
  productImages,
  handleImagesChange,
  handleRemoveImage,
  disabled,
}) {
  const { t } = useTranslation();

  return (
    <div className="form_group">
      <div className="input-field">
        <label htmlFor="certificate-image w-100" style={{ whiteSpace: "wrap !important" }}>
          <div style={{ whiteSpace: "nowrap" }}>{t("ads.images")}</div>
          <span style={{ width: "unset !important", flex: "1" }}>
            ({t("ads.imagesHint")})
          </span>
        </label>

        <div className="images_grid_upload">
          {productImages?.length < 6 && (
            <div className="file_upload">
              <label htmlFor="file_upload">
                <input
                  type="file"
                  id="file_upload"
                  accept="image/*,video/*"
                  name="images"
                  multiple
                  onChange={handleImagesChange}
                  disabled={disabled}
                />
                <img src="/images/icons/gallery.svg" alt="upload" />
              </label>
            </div>
          )}

          {productImages?.map((image, index) => (
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
  );
} 