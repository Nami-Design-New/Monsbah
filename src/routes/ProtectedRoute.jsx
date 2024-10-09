import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { loading, isAuthed } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthed) {
      const currentSearchParams = new URLSearchParams(location.search);

      if (!currentSearchParams.has("redirect")) {
        navigate("/?redirect=true", {
          replace: true,
          state: { showLoginModal: true },
        });
      }
    }
  }, [isAuthed, loading, navigate]);

  if (loading) {
    return null;
  }

  return isAuthed ? children : null;
}

export default ProtectedRoute;
