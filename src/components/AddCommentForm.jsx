import { useState } from "react";
import { useTranslation } from "react-i18next";
import InputField from "../ui/form-elements/InputField";
import SubmitButton from "../ui/form-elements/SubmitButton";

function AddCommentForm({ handleSubmit, loading }) {
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  return (
    <form
      className="form addCommentForm"
      onSubmit={(e) => handleSubmit(e, value, setValue)}
    >
      <InputField
        placeholder={t("addComment")}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <SubmitButton loading={loading} name={t("send")} />
    </form>
  );
}

export default AddCommentForm;
