import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
// import useGetAsks from "../hooks/search/useGetAsks";
import useAuth from "../hooks/useAuth";
import useGetCountries from "../hooks/settings/useGetCountries";
import AskCard from "../ui/cards/AskCard";
import AskLoader from "../ui/loaders/AskLoader";
import ViewAsk from "../ui/modals/ViewAsk";
import AuthModal from "../components/auth/AuthModal";
import InputField from "../ui/form-elements/InputField";
import SubmitButton from "../ui/form-elements/SubmitButton";
import axiosInstance from "../utils/axiosInstance";

function CountryAsks() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [targetAsk, setTargetAsk] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ask, setAsk] = useState("");

  const { data: countries } = useGetCountries();
  const { isAuthed } = useAuth();
  const sectionRef = useRef(null);
  const queryClient = useQueryClient();
  const user = useSelector((state) => state.clientData.client);
  const country = searchParams.get("country-id");

  // const {
  //   data: aks,
  //   isLoading,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetchingNextPage,
  // } = useGetAsks(selectedCountry?.id || 6);

  useEffect(() => {
    if (!searchParams.get("country-id")) {
      searchParams.set("country-id", user?.country ? user?.country?.id : 6);
      setSearchParams(searchParams);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isAuthed) {
      setShowAuthModal(true);
      return;
    }

    const payLoad = {
      country_id: selectedCountry?.id,
      description: ask,
    };

    try {
      const res = await axiosInstance.post("/client/store-question", payLoad);
      if (res.status === 200) {
        toast.success(res.data.message);
        setAsk("");
        queryClient.invalidateQueries({
          queryKey: ["asks"],
        });
        queryClient.invalidateQueries({
          queryKey: ["allQuestions"],
        });
      }
      setShowModal(false);
    } catch (error) {
      toast.error(error.response.data.message);
      throw new Error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="search_section" ref={sectionRef}>
      <div className="container">
        <div className="row">
          <div className="col-12 p-2">
            {country && selectedCountry ? (
              <form
                onSubmit={handleSubmit}
                className="form"
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                }}
              >
                <InputField
                  label={t("ask") + " " + selectedCountry?.name}
                  placeholder={t("addYouQuestionHere")}
                  value={ask}
                  onChange={(e) => setAsk(e.target.value)}
                />
                <SubmitButton
                  name={t("send")}
                  className="fit_content"
                  loading={loading}
                />
              </form>
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
