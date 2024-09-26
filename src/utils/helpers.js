export const handlePhoneChange = (value, name, setFormData) => {
  setFormData((prev) => ({ ...prev, [name]: value }));
};

export const handleChange = (e, setFormData) => {
  setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
};
