import { useEffect, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const ImageUpload = ({ formData, setFormData, image, cover }) => {
  const { t } = useTranslation();
  const imgView = useRef(null);
  const coverView = useRef(null);
  const inputRef = useRef(null);
  const coverRef = useRef(null);
  const [coverError, setCoverError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  useEffect(() => {
    if (image) {
      imgView.current.src = image;
    }
    if (cover) {
      coverView.current.src = cover;
    }
  }, [image, cover]);

  const handleImageUpload = (e) => {
    imgView.current.src = URL.createObjectURL(e.target.files[0]);

    if (String(e.target.files[0]?.type)?.startsWith("image")) {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    }
  };

  const handleCoverUpload = (e) => {
    coverView.current.src = URL.createObjectURL(e.target.files[0]);
    if (String(e.target.files[0]?.type)?.startsWith("image")) {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    }
  };

  return (
    <div className="w-100 p-2 image-change-wrapper d-flex justify-content-end align-items-start">
      <div
        className="img-wrap"
        onClick={(e) => {
          e.stopPropagation();
          inputRef.current.click();
        }}
      >
        <div className="img-box">
          <img
            ref={imgView}
            src={
              avatarError ? "/images/icons/user.svg" : "/images/icons/user.svg"
            }
            alt="avatar"
            onError={() => {
              setAvatarError(true);
              imgView.current.src = "/images/icons/user.svg";
            }}
          />
        </div>
        <Dropdown onClick={(e) => e.stopPropagation()}>
          <Dropdown.Toggle id="dropdown-basic" className="upload-btn">
            <i className="fa-regular fa-ellipsis-vertical"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={(e) => {
                e.stopPropagation();
                imgView.current.click();
              }}
            >
              <i className="fa-regular fa-cloud-arrow-up"></i>
              {t("change_avatar")}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={(e) => {
                e.stopPropagation();
                imgView.current.src = "";
                setFormData({
                  ...formData,
                  image: null,
                });
              }}
            >
              <i className="fa-regular fa-trash"></i>
              {t("remove_avatar")}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div
        className="cover-wrap"
        onClick={(e) => {
          e.stopPropagation();
          coverRef.current.click();
        }}
      >
        <img
          ref={coverView}
          src={coverError ? "/images/banner.png" : "/images/banner.png"}
          alt="cover"
          onError={() => {
            setCoverError(true);
            coverView.current.src = "/images/banner.png";
          }}
        />
        <Dropdown onClick={(e) => e.stopPropagation()}>
          <Dropdown.Toggle id="dropdown-basic" className="upload-btn">
            <i className="fa-regular fa-ellipsis-vertical"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={(e) => {
                e.stopPropagation();
                coverRef.current.click();
              }}
            >
              <i className="fa-regular fa-cloud-arrow-up"></i>
              {t("change_cover")}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={(e) => {
                e.stopPropagation();
                coverView.current.src = "";
                setFormData({
                  ...formData,
                  cover: null,
                });
              }}
            >
              <i className="fa-regular fa-trash"></i>
              {t("remove_cover")}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <input
        type="file"
        name="image"
        id="img-upload"
        accept="image/*"
        onChange={handleImageUpload}
        ref={inputRef}
        style={{ display: "none" }}
      />

      <input
        type="file"
        name="cover"
        id="cover-upload"
        accept="image/*"
        onChange={handleCoverUpload}
        ref={coverRef}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default ImageUpload;
