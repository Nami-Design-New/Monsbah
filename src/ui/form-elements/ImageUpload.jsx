import { useEffect, useRef, useState } from "react";

const ImageUpload = ({ formData, setFormData, image, cover }) => {
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
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleCoverUpload = (e) => {
    coverView.current.src = URL.createObjectURL(e.target.files[0]);
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  return (
    <div className="w-100 p-2 image-change-wrapper d-flex justify-content-end align-items-start">
      <div className="img-wrap" onClick={() => inputRef.current.click()}>
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

      <div className="cover-wrap" onClick={() => coverRef.current.click()}>
        <img
          ref={coverView}
          src={coverError ? "/images/banner.png" : "/images/banner.png"}
          alt="cover"
          onError={() => {
            setCoverError(true);
            coverView.current.src = "/images/banner.png";
          }}
        />
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
