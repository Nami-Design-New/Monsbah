import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CommentCard({ comment, deleteComment }) {
  const { t } = useTranslation();
  const authedUser = useSelector((state) => state.clientData.client);

  return (
    <div className="CommentWrapper">
      <div className="CommentCard">
        <Link to={`/profile/${comment?.user_id}`} className="img">
          <img
            src={comment?.user_image}
            alt={comment?.user_name}
            onError={(e) => (e.target.src = "/images/icons/user_default.png")}
          />
        </Link>
        <div className="content">
          <h6>{comment?.user_name}</h6>
          <div className="comment">
            <p>{comment?.comment}</p>
          </div>
          <div className="actions">
            <span>{comment?.date}</span>
            <button>{t("reply")}</button>
            {comment?.user_id === authedUser?.id && (
              <button onClick={() => deleteComment(comment?.id)}>
                {t("delete")}
              </button>
            )}
            <button>{t("report")}</button>
          </div>
        </div>
      </div>
      <div className="replies">
        <div className="CommentWrapper">
          <div className="CommentCard">
            <Link to={`/profile/${comment?.user_id}`} className="img">
              <img
                src={comment?.user_image}
                alt={comment?.user_name}
                onError={(e) =>
                  (e.target.src = "/images/icons/user_default.png")
                }
              />
            </Link>
            <div className="content">
              <h6>{comment?.user_name}</h6>
              <div className="comment">
                <p>{comment?.comment}</p>
              </div>
              <div className="actions">
                <span>{comment?.date}</span>
                <button>{t("reply")}</button>
                {comment?.user_id === authedUser?.id && (
                  <button onClick={() => deleteComment(comment?.id)}>
                    {t("delete")}
                  </button>
                )}
                <button>{t("report")}</button>
              </div>
            </div>
          </div>
          <div className="replies">
            <div className="CommentWrapper">
              <div className="CommentCard">
                <Link to={`/profile/${comment?.user_id}`} className="img">
                  <img
                    src={comment?.user_image}
                    alt={comment?.user_name}
                    onError={(e) =>
                      (e.target.src = "/images/icons/user_default.png")
                    }
                  />
                </Link>
                <div className="content">
                  <h6>{comment?.user_name}</h6>
                  <div className="comment">
                    <p>{comment?.comment}</p>
                  </div>
                  <div className="actions">
                    <span>{comment?.date}</span>
                    <button>{t("reply")}</button>
                    {comment?.user_id === authedUser?.id && (
                      <button onClick={() => deleteComment(comment?.id)}>
                        {t("delete")}
                      </button>
                    )}
                    <button>{t("report")}</button>
                  </div>
                </div>
              </div>
              <div className="replies"></div>
            </div>
            <div className="CommentWrapper">
              <div className="CommentCard">
                <Link to={`/profile/${comment?.user_id}`} className="img">
                  <img
                    src={comment?.user_image}
                    alt={comment?.user_name}
                    onError={(e) =>
                      (e.target.src = "/images/icons/user_default.png")
                    }
                  />
                </Link>
                <div className="content">
                  <h6>{comment?.user_name}</h6>
                  <div className="comment">
                    <p>{comment?.comment}</p>
                  </div>
                  <div className="actions">
                    <span>{comment?.date}</span>
                    <button>{t("reply")}</button>
                    {comment?.user_id === authedUser?.id && (
                      <button onClick={() => deleteComment(comment?.id)}>
                        {t("delete")}
                      </button>
                    )}
                    <button>{t("report")}</button>
                  </div>
                </div>
              </div>
              <div className="replies"></div>
            </div>
            <div className="CommentWrapper">
              <div className="CommentCard">
                <Link to={`/profile/${comment?.user_id}`} className="img">
                  <img
                    src={comment?.user_image}
                    alt={comment?.user_name}
                    onError={(e) =>
                      (e.target.src = "/images/icons/user_default.png")
                    }
                  />
                </Link>
                <div className="content">
                  <h6>{comment?.user_name}</h6>
                  <div className="comment">
                    <p>{comment?.comment}</p>
                  </div>
                  <div className="actions">
                    <span>{comment?.date}</span>
                    <button>{t("reply")}</button>
                    {comment?.user_id === authedUser?.id && (
                      <button onClick={() => deleteComment(comment?.id)}>
                        {t("delete")}
                      </button>
                    )}
                    <button>{t("report")}</button>
                  </div>
                </div>
              </div>
              <div className="replies">
                <div className="CommentWrapper">
                  <div className="CommentCard">
                    <Link to={`/profile/${comment?.user_id}`} className="img">
                      <img
                        src={comment?.user_image}
                        alt={comment?.user_name}
                        onError={(e) =>
                          (e.target.src = "/images/icons/user_default.png")
                        }
                      />
                    </Link>
                    <div className="content">
                      <h6>{comment?.user_name}</h6>
                      <div className="comment">
                        <p>{comment?.comment}</p>
                      </div>
                      <div className="actions">
                        <span>{comment?.date}</span>
                        <button>{t("reply")}</button>
                        {comment?.user_id === authedUser?.id && (
                          <button onClick={() => deleteComment(comment?.id)}>
                            {t("delete")}
                          </button>
                        )}
                        <button>{t("report")}</button>
                      </div>
                    </div>
                  </div>
                  <div className="replies"></div>
                </div>
                <div className="CommentWrapper">
                  <div className="CommentCard">
                    <Link to={`/profile/${comment?.user_id}`} className="img">
                      <img
                        src={comment?.user_image}
                        alt={comment?.user_name}
                        onError={(e) =>
                          (e.target.src = "/images/icons/user_default.png")
                        }
                      />
                    </Link>
                    <div className="content">
                      <h6>{comment?.user_name}</h6>
                      <div className="comment">
                        <p>{comment?.comment}</p>
                      </div>
                      <div className="actions">
                        <span>{comment?.date}</span>
                        <button>{t("reply")}</button>
                        {comment?.user_id === authedUser?.id && (
                          <button onClick={() => deleteComment(comment?.id)}>
                            {t("delete")}
                          </button>
                        )}
                        <button>{t("report")}</button>
                      </div>
                    </div>
                  </div>
                  <div className="replies"></div>
                </div>
                <div className="CommentWrapper">
                  <div className="CommentCard">
                    <Link to={`/profile/${comment?.user_id}`} className="img">
                      <img
                        src={comment?.user_image}
                        alt={comment?.user_name}
                        onError={(e) =>
                          (e.target.src = "/images/icons/user_default.png")
                        }
                      />
                    </Link>
                    <div className="content">
                      <h6>{comment?.user_name}</h6>
                      <div className="comment">
                        <p>{comment?.comment}</p>
                      </div>
                      <div className="actions">
                        <span>{comment?.date}</span>
                        <button>{t("reply")}</button>
                        {comment?.user_id === authedUser?.id && (
                          <button onClick={() => deleteComment(comment?.id)}>
                            {t("delete")}
                          </button>
                        )}
                        <button>{t("report")}</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="CommentWrapper">
          <div className="CommentCard">
            <Link to={`/profile/${comment?.user_id}`} className="img">
              <img
                src={comment?.user_image}
                alt={comment?.user_name}
                onError={(e) =>
                  (e.target.src = "/images/icons/user_default.png")
                }
              />
            </Link>
            <div className="content">
              <h6>{comment?.user_name}</h6>
              <div className="comment">
                <p>{comment?.comment}</p>
              </div>
              <div className="actions">
                <span>{comment?.date}</span>
                <button>{t("reply")}</button>
                {comment?.user_id === authedUser?.id && (
                  <button onClick={() => deleteComment(comment?.id)}>
                    {t("delete")}
                  </button>
                )}
                <button>{t("report")}</button>
              </div>
            </div>
          </div>
          <div className="replies"></div>
        </div>
        <div className="CommentWrapper">
          <div className="CommentCard">
            <Link to={`/profile/${comment?.user_id}`} className="img">
              <img
                src={comment?.user_image}
                alt={comment?.user_name}
                onError={(e) =>
                  (e.target.src = "/images/icons/user_default.png")
                }
              />
            </Link>
            <div className="content">
              <h6>{comment?.user_name}</h6>
              <div className="comment">
                <p>{comment?.comment}</p>
              </div>
              <div className="actions">
                <span>{comment?.date}</span>
                <button>{t("reply")}</button>
                {comment?.user_id === authedUser?.id && (
                  <button onClick={() => deleteComment(comment?.id)}>
                    {t("delete")}
                  </button>
                )}
                <button>{t("report")}</button>
              </div>
            </div>
          </div>
          <div className="replies"></div>
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
