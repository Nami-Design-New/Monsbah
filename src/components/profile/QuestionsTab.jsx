import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import AskCard from "../../ui/cards/AskCard";
import AskLoader from "../../ui/loaders/AskLoader";
import ViewAsk from "../../ui/modals/ViewAsk";
import useGetAllAsks from "../../hooks/search/useGetAllAsks";
import CreateCountryAsk from "../../ui/modals/CreateCountryAsk";
import EmptyData from "../../ui/EmptyData";

function QuestionsTab(isActive) {
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [targetAsk, setTargetAsk] = useState({});
  const sectionRef = useRef();

  const user = useSelector((state) => state.clientData.client);

  const { t } = useTranslation();
  const { data: asks, isLoading } = useGetAllAsks(user?.id, isActive);

  return (
    <section className="search_section  w-100 p-0" ref={sectionRef}>
      <div className="row">
        <div className="col-12 p-2 d-flex justify-content-end">
          {user && user?.country ? (
            <span
              className="customBtn d-flex align-items-center gap-2 justify-content-center m-0"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setShowCreateModal(true);
              }}
            >
              <i className="fa-regular fa-comment-plus"></i>
              <h6 className="m-0" style={{ lineHeight: 1 }}>{`${t("ask")} ${
                user?.country?.name
              }`}</h6>
            </span>
          ) : null}
        </div>
        {asks?.data?.data?.data?.map((ask, index) =>
          ask?.user_id === user?.id ? (
            <div className="col-lg-6 col-12 p-1" key={index}>
              <AskCard
                ask={ask}
                setShowModal={setShowModal}
                setTargetAsk={setTargetAsk}
                className="my-ask"
                reverseBg={true}
              />
            </div>
          ) : null
        )}
        {isLoading && (
          <>
            {Array(2)
              .fill(0)
              .map((_, index) => (
                <div className="col-lg-6 col-12 p-2" key={index}>
                  <AskLoader className="my-ask" />
                </div>
              ))}
          </>
        )}
      </div>

      {!isLoading && asks?.data?.data?.data?.length === 0 && (
        <EmptyData minHeight="200px">
          <p>{t("profile.noQuestionsForMe")}</p>
        </EmptyData>
      )}

      <ViewAsk
        showModal={showModal}
        setShowModal={setShowModal}
        ask={targetAsk}
      />

      <CreateCountryAsk
        showModal={showCreateModal}
        setShowModal={setShowCreateModal}
        country_id={user?.country?.id}
        city_id={user?.city?.id}
        title={`${t("ask")} ${user?.country?.name}`}
      />
    </section>
  );
}

export default QuestionsTab;
