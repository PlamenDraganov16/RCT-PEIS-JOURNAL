import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useUserContext } from "../../contexts/UserContext.jsx";

export default function Logout() {
  const { logoutHandler } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await logoutHandler();
        navigate('/');
      } catch (err) {
        alert('Problem with logout');
        // navigate('/');
      }
    };

    logout();
  }, [logoutHandler, navigate]);

  return null;
}