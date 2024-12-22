import { detectMobileTypeAndAppLink } from "../../utils/helpers";

export default function DownloadApp({ setShowDownloadApp }) {
  const handleAppDownload = () => {
    localStorage.setItem("appDownloaded", "true");
    setShowDownloadApp(false);
  };

  return (
    <div className="download_app">
      <button
        aria-label="Close download"
        className="d-flex closeDownload"
        onClick={handleAppDownload}
      >
        <i className="fa-solid fa-times"></i>
      </button>
      <div className="inner">
        <div className="d-flex align-items-center gap-2">
          <div className="icon">
            <img src="/images/branding/storeicon.svg" alt="store" />
          </div>
          <div className="text">
            <h6>Monasbah.com App</h6>
            <p>Get it on</p>
          </div>
        </div>
        <a
          href={detectMobileTypeAndAppLink}
          className="get_app"
          onClick={handleAppDownload}
        >
          Get
        </a>
      </div>
    </div>
  );
}
