export const handlePhoneChange = (value, name, setFormData) => {
  setFormData((prev) => ({ ...prev, [name]: value }));
};

export const handleChange = (e, setFormData) => {
  setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
};

export function extractPhoneFromCode(phone, code) {
  const fullNumber = phone?.toString();
  const fullCode = code?.toString().slice(1);

  if (fullNumber?.startsWith(fullCode)) {
    return Number(fullNumber.slice(fullCode?.length));
  } else {
    return Number(fullNumber);
  }
}

export function isValidVideoExtension(source) {
  const validExtensions = [
    "mp4",
    "avi",
    "mkv",
    "mov",
    "wmv",
    "flv",
    "webm",
    "m4v",
    "3gp",
    "ts",
  ];
  const extension = source.split(".").pop().toLowerCase();
  return validExtensions.includes(extension);
}

export const calculateDate = (createdAt) => {
  const createdDate = new Date(createdAt);
  const dd = String(createdDate.getDate()).padStart(2, "0");
  const mm = String(createdDate.getMonth() + 1).padStart(2, "0");
  const yyyy = createdDate.getFullYear();
  return `${dd} / ${mm} / ${yyyy}`;
};

export const detectMobileTypeAndAppLink = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "https://apps.apple.com/eg/app/%D9%85%D9%86%D8%A7%D8%B3%D8%A8%D8%A9/id1589937521";
  } else if (/android/i.test(userAgent)) {
    return "https://play.google.com/store/apps/details?id=com.app.monasba&pcampaignid=web_share";
  }
};

export const handleChangeUserName = (e, setFormData) => {
  const { value } = e.target;
  const validInput = /^[a-zA-Z]*$/;
  if (validInput.test(value)) {
    setFormData((prev) => ({
      ...prev,
      username: value,
    }));
  }
};
