import { useTranslation } from "react-i18next";
import useGetComments from "../../hooks/products/useGetComments";
import AddCommentForm from "../AddCommentForm";

export default function Comments() {
  const { t } = useTranslation();
  const { data: comments } = useGetComments();
  return (
    <div className="comments_container">
      <div className="header">
        <h5>
          {t("comments")} <span>( 0 )</span>
        </h5>
      </div>

      <div className="comments_wrapper">
        <h6 className="noComments">{t("noComments")}</h6>
      </div>

      <AddCommentForm />
    </div>
  );
}
