import { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { setClientData } from "../../redux/slices/clientData";
import { toast } from "react-toastify";
import MainInfoTab from "./MainInfoTab";
import MyAds from "./MyAds";
import QuestionsTab from "./QuestionsTab";
import FavoritesTab from "./FavoritesTab";
import SettingsTab from "./SettingsTab";
import VerificationTab from "./VerificationTab";
import axios from "../../utils/axiosInstance";
import AddAd from "../../routes/AddAd";
import ConfirmationModal from "../../ui/modals/ConfirmationModal";
import Notifcations from "./../../routes/Notifcations";

function ProfileTabs() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "main";

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const user = useSelector((state) => state.clientData.client);
  const lang = useSelector((state) => state.language.lang);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const [, , deleteCookie] = useCookies();
  const [cookies] = useCookies(["token"]);
  const token = cookies?.token;

  function handleTabChange(tab) {
    setSearchParams({ tab });
  }

  const performLogout = async () => {
    setLogoutLoading(true);
    try {
      const deleteToken = await axios.get("/client/auth/logout", {
        token: token,
      });

      if (deleteToken.data.status === 200) {
        deleteCookie("token");
        deleteCookie("id");
        delete axios.defaults.headers.common["Authorization"];
        dispatch(setClientData({}));
        navigate("/", { replace: true });
        queryClient.clear();
        sessionStorage.clear();
        toast.success(deleteToken.data.message);
        setShowLogoutModal(false);
      }
    } catch (error) {
      console.error("Error during logout:", error);
      throw new Error(error.message);
    } finally {
      setLogoutLoading(false);
    }
  };

  const handleChangeTab = (tab) => {
    searchParams.set("tab", tab);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (activeTab === "logout") {
      setShowLogoutModal(true);
      searchParams.set("tab", "main");
      setSearchParams(searchParams);
    }
  }, [activeTab, searchParams, setSearchParams]);

  return (
    <>
      {window.innerWidth < 768 && searchParams.get("tab") && (
        <div className="arrow_icon" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-right-long"></i>
        </div>
      )}
      <div className="tabs-section">
        {!searchParams.get("tab") && (
          <div className="profileResponsiveNav">
            <div className="nav-item" onClick={() => handleChangeTab("main")}>
              <button>
                <i className="fa-regular fa-user" />
                {t("profile.mainInfo")}
              </button>
            </div>
            <div className="nav-item" onClick={() => handleChangeTab("ads")}>
              <button>
                <i className="fa-regular fa-bullhorn"></i>
                {t("profile.myAds")}
              </button>
            </div>
            <div className="nav-item" onClick={() => handleChangeTab("addAd")}>
              <button>
                <i className="fa-regular fa-plus"></i>
                {t("profile.addAd")}
              </button>
            </div>
            <div
              className="nav-item"
              onClick={() => handleChangeTab("questions")}
            >
              <button>
                <i className="fa-regular fa-message-question"></i>
                {t("profile.myAsks")}
              </button>
            </div>
            <div
              className="nav-item"
              onClick={() => handleChangeTab("notifications")}
            >
              <button>
                <i className="fa-regular fa-bell"></i>
                {t("notifications")}
              </button>
            </div>
            <div
              className="nav-item"
              onClick={() => handleChangeTab("favorites")}
            >
              <button>
                <i className="fa-regular fa-heart" />
                {t("profile.favorites")}
              </button>
            </div>
            <div
              className="nav-item"
              onClick={() => handleChangeTab("settings")}
            >
              <button>
                <i className="fa-regular fa-gear" />
                {t("profile.settings")}
              </button>
            </div>
            <div
              className="nav-item"
              onClick={() => handleChangeTab("verification")}
            >
              <button>
                <i className="fa-regular fa-badge-check" />
                {t("profile.verification")}
              </button>
            </div>
            <div className="nav-item" onClick={() => handleChangeTab("logout")}>
              <button>
                <i className="fa-regular fa-arrow-right-from-bracket"></i>
                {t("profile.logout")}
              </button>
            </div>
          </div>
        )}
        {window.innerWidth > 768 || searchParams.get("tab") ? (
          <Tabs
            className="profileNavCol col-md-4 col-xl-3 p-2"
            activeKey={activeTab}
            onSelect={(tab) => handleTabChange(tab)}
            id="uncontrolled-tab-example"
          >
            {/* main info */}
            <Tab
              eventKey="main"
              title={
                <>
                  <i className="fa-regular fa-user" />
                  {t("profile.mainInfo")}
                </>
              }
              className="tab_item"
            >
              <MainInfoTab user={user} lang={lang} />
            </Tab>

            {/* ads */}
            <Tab
              eventKey="ads"
              title={
                <>
                  <i className="fa-regular fa-bullhorn"></i>
                  {t("profile.myAds")}
                </>
              }
              className="tab_item"
            >
              <MyAds
                user={user}
                lang={lang}
                className="my-ad"
                isActive={activeTab === "ads"}
              />
            </Tab>

            {/* addAd */}
            <Tab
              eventKey="addAd"
              title={
                <>
                  <i className="fa-regular fa-plus"></i>
                  {t("profile.addAd")}
                </>
              }
              className="tab_item"
            >
              <AddAd user={user} lang={lang} isActive={activeTab === "addAd"} />
            </Tab>

            {/* questions */}
            <Tab
              eventKey="questions"
              title={
                <>
                  <i className="fa-regular fa-message-question"></i>
                  {t("profile.myAsks")}
                </>
              }
              className="tab_item"
            >
              <QuestionsTab
                user={user}
                lang={lang}
                isActive={activeTab === "questions"}
              />
            </Tab>

            <Tab
              eventKey="notifications"
              title={
                <>
                  <i className="fa-regular fa-bell"></i>
                  {t("notifications")}
                </>
              }
              className="tab_item"
            >
              <Notifcations bgColor="bg-white" />
            </Tab>

            {/* favorites */}
            <Tab
              eventKey="favorites"
              title={
                <>
                  <i className="fa-regular fa-heart" />
                  {t("profile.favorites")}
                </>
              }
              className="tab_item"
            >
              <FavoritesTab
                user={user}
                lang={lang}
                isActive={activeTab === "favorites"}
              />
            </Tab>

            {/* settings */}
            <Tab
              eventKey="settings"
              title={
                <>
                  <i className="fa-regular fa-gear" />
                  {t("profile.settings")}
                </>
              }
              className="tab_item"
            >
              <SettingsTab
                user={user}
                lang={lang}
                isActive={activeTab === "settings"}
              />
            </Tab>

            {/* verification */}
            <Tab
              eventKey="verification"
              title={
                <>
                  <i className="fa-regular fa-badge-check" />
                  {t("profile.verification")}
                </>
              }
              className="tab_item"
            >
              <VerificationTab
                user={user}
                lang={lang}
                isActive={activeTab === "verification"}
              />
            </Tab>

            {/* logout */}
            <Tab
              eventKey="logout"
              title={
                <>
                  <i className="fa-regular fa-arrow-right-from-bracket"></i>
                  {t("profile.logout")}
                </>
              }
              className="tab_item"
            ></Tab>
          </Tabs>
        ) : null}

        <ConfirmationModal
          showModal={showLogoutModal}
          setShowModal={setShowLogoutModal}
          type="logout"
          eventFun={performLogout}
          loading={logoutLoading}
          buttonText={t("profile.logout")}
          text={t("auth.areYouSureYouWantToLogout")}
        />
      </div>
    </>
  );
}

export default ProfileTabs;
