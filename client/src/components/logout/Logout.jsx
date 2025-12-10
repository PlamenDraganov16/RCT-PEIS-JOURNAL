import { useContext } from "react";
import { useNavigate } from "react-router";
import UserContext from "../../contexts/UserContext.jsx";
import { useEffect } from "react";

export default function Logout() {
  const { logoutHandler } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await logoutHandler();
        navigate('/');
      } catch (err) {
        alert('Problem with logout');
        navigate('/');
      }
    };

    logout();
  }, [logoutHandler, navigate]);

  return null;
}