import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import AuthModal from "../components/auth/AuthModal";

function ProtectionProvider({ children }) {
  const navigate = useNavigate();
  const { loading, isAuthed } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthed) {
      setShowAuth(true);
    }
  }, [isAuthed, loading, navigate]);

  if (loading) {
    return null;
  }

  console.log(isAuthed);

  return (
    <>
      {isAuthed ? children : null}
      <AuthModal
        type="login"
        show={showAuth}
        setShow={setShowAuth}
        protectedFlag={true}
      />
    </>
  );
}

export default ProtectionProvider;
