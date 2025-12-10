import { useContext } from "react";
import { useNavigate } from "react-router";
import UserContext, { useUserContext } from "../../contexts/UserContext.jsx";
import { useEffect } from "react";

export default function Logout() {
  const { logoutHandler } = useContext(UserContext);
  const navigate = useNavigate();
  const { isAuthenticated } = useUserContext();

  useEffect(() => {
    const performLogout = async () => {
      if (!isAuthenticated) {
        navigate('/welcome', { replace: true });
        return;
      }

      try {
        await logoutHandler();
        navigate('/welcome', { replace: true });
      } catch (err) {
        alert('Problem with logout');
        navigate('/welcome', { replace: true });
      }
    };

    performLogout();
  }, [isAuthenticated, logoutHandler, navigate]);

  return null;
}