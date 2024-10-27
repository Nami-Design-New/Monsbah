import { useEffect, useRef, useState } from "react";
import useGetAsks from "../hooks/search/useGetAsks";
import useAuth from "../hooks/useAuth";
import { useSearchParams } from "react-router-dom";
import useGetCountries from "../hooks/settings/useGetCountries";
import { useTranslation } from "react-i18next";
import AskCard from "../ui/cards/AskCard";
import AskLoader from "../ui/loaders/AskLoader";
import ViewAsk from "../ui/modals/ViewAsk";
import CreateCountryAsk from "../ui/modals/CreateCountryAsk";
import AuthModal from "../components/auth/AuthModal";
import { useSelector } from "react-redux";

function CountryAsks() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCountryAskModal, setShowCountryAskModal] = useState(false);
  const [targetAsk, setTargetAsk] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const country = searchParams.get("country-id");
  const city = searchParams.get("city-id");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const { data: countries } = useGetCountries();

  const sectionRef = useRef(null);

  const { isAuthed } = useAuth();

  const user = useSelector((state) => state.clientData.client);

  const {
    data: aks,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAsks();

  useEffect(() => {
    if (!searchParams.get("country-id")) {
      searchParams.set("country-id", user?.country ? user?.country?.id : 6);
      setSearchParams(searchParams);
    } else {
      console.log(+searchParams.get("country-id") !== user?.country?.id);

      if (+searchParams.get("country-id") !== user?.country?.id) {
        searchParams.set("country-id", user?.country ? user?.country?.id : 6);
        setSearchParams(searchParams);
      }
    }
  }, [searchParams, setSearchParams, user?.country]);

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
    if (countries?.length > 0 && searchParams.get("country-id")) {
      setSelectedCountry(
        countries?.filter((c) => c?.id === +searchParams.get("country-id"))[0]
      );
    }
  }, [countries, searchParams]);

  return (
    <section className="search_section" ref={sectionRef}>
      <div className="container">
        <div className="row">
          <div className="col-12 p-2 d-flex justify-content-between align-items-center">
            <div className="div">
              <h6 className="title">{t("popularAsks")}</h6>
              <p className="desc">{t("popularAsksDesc")}</p>
            </div>
            {country && selectedCountry ? (
              <span
                className="customBtn d-flex align-items-center gap-2 justify-content-center m-0"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  isAuthed
                    ? setShowCountryAskModal(true)
                    : setShowAuthModal(true);
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
            country_id={country}
            city_id={city}
            title={`${t("ask")} ${selectedCountry?.name}`}
          />

          <AuthModal
            type={"login"}
            show={showAuthModal}
            setShow={setShowAuthModal}
          />
        </div>
      </div>
    </section>
  );
}

export default CountryAsks;