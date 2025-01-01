import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import AskCard from "../../ui/cards/AskCard";
// import useGetAsks from "../../hooks/search/useGetAsks";
import AskLoader from "../../ui/loaders/AskLoader";
import ViewAsk from "../../ui/modals/ViewAsk";
import AuthModal from "../auth/AuthModal";
import useAuth from "../../hooks/useAuth";
import CreateCountryAsk from "../../ui/modals/CreateCountryAsk";
import useGetCountries from "../../hooks/settings/useGetCountries";

export default function Asks({ sectionRef }) {
  const { t } = useTranslation();
  const { isAuthed } = useAuth();
  const { client } = useSelector((state) => state.clientData);
  const { data: countries } = useGetCountries();
  const [showModal, setShowModal] = useState(false);
  const [targetAsk, setTargetAsk] = useState({});
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showCountryAskModal, setShowCountryAskModal] = useState(false);

  // const {
  //   data: aks,
  //   isLoading,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetchingNextPage,
  // } = useGetAsks(client?.country?.id || 6);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const sectionBottom = section.getBoundingClientRect().bottom;
      const viewportHeight = window.innerHeight;

      if (
        sectionBottom <= viewportHeight + 200 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, sectionRef]);

  useEffect(() => {
    if (client?.country) {
      setSelectedCountry(client?.country) || countries?.find((c) => c.id === 6);
    }
  }, [client?.country, countries]);

  return (
    <>
      <div className="col-12 p-2 d-flex justify-content-between align-items-center">
        <div className="div">
          <h6 className="title">{t("popularAsks")}</h6>
          <p className="desc">{t("popularAsksDesc")}</p>
        </div>
        {selectedCountry ? (
          <span
            className="customBtn d-flex align-items-center gap-2 justify-content-center m-0"
            style={{ cursor: "pointer" }}
            onClick={() => {
              isAuthed ? setShowCountryAskModal(true) : setShowAuthModal(true);
            }}
          >
            <i className="fa-regular fa-comment-plus"></i>

            <h6 className="m-0" style={{ lineHeight: 1 }}>{`${t("ask")} ${
              selectedCountry?.name
            }`}</h6>
          </span>
        ) : null}
      </div>

      {aks?.map((ask, index) => (
        <div className="col-lg-6 col-12 p-2" key={index}>
          <AskCard
            ask={ask}
            setShowModal={setShowModal}
            setTargetAsk={setTargetAsk}
          />
        </div>
      ))}

      {(isLoading || isFetchingNextPage) && (
        <>
          {Array(2)
            .fill(0)
            .map((_, index) => (
              <div className="col-lg-6 col-12 p-2" key={index}>
                <AskLoader />
              </div>
            ))}
        </>
      )}

      <ViewAsk
        showModal={showModal}
        setShowModal={setShowModal}
        ask={targetAsk}
      />

      <CreateCountryAsk
        showModal={showCountryAskModal}
        setShowModal={setShowCountryAskModal}
        country_id={selectedCountry?.id}
        title={`${t("ask")} ${selectedCountry?.name}`}
      />

      <AuthModal
        type={"login"}
        show={showAuthModal}
        setShow={setShowAuthModal}
      />
    </>
  );
}
