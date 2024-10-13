function AskLoader() {
  return (
    <div className="AskCard skeleton">
      <div className="user_info ">
        <div className="img skeleton-img"></div>
        <div className="info">
          <h6 className="skeleton-text"></h6>
          <span className="skeleton-text"></span>
        </div>
      </div>
      <div className="content">
        <p className="skeleton-text skeleton-description"></p>
        <button className="skeleton-text"></button>
      </div>
    </div>
  );
}

export default AskLoader;
