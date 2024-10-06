import { Tab, Tabs } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import MainInfoTab from "./MainInfoTab";
import AdsTab from "./AdsTab";
import QuestionsTab from "./QuestionsTab";
import FavoritesTab from "./FavoritesTab";

function ProfileTabs({ user, lang }) {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "main";

  function handleTabChange(tab) {
    setSearchParams({ tab });
  }

  return (
    <div className="tabs-section">
      <Tabs
        className="profileNavCol col-md-5 col-lg-4 col-xl-3 p-2"
        activeKey={activeTab}
        onSelect={(tab) => handleTabChange(tab)}
        id="uncontrolled-tab-example"
      >
        {/* main info */}
        <Tab eventKey="main" title={t("profile.mainInfo")} className="tab_item">
          <MainInfoTab user={user} lang={lang} />
        </Tab>

        {/* ads */}
        <Tab eventKey="ads" title={t("profile.ads")} className="tab_item">
          <AdsTab user={user} lang={lang} />
        </Tab>

        {/* questions */}
        <Tab
          eventKey="questions"
          title={t("profile.questions")}
          className="tab_item"
        >
          <QuestionsTab user={user} lang={lang} />
        </Tab>

        {/* favorites */}
        <Tab
          eventKey="favorites"
          title={t("profile.favorites")}
          className="tab_item"
        >
          <FavoritesTab user={user} lang={lang} />
        </Tab>
      </Tabs>
    </div>
  );
}

export default ProfileTabs;
