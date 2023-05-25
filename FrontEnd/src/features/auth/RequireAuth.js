import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const { roles } = useAuth();

  const content = roles.some((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : (
    /*state={{ from: location }} : pass additional data to the target location during navigation, specifically capturing the current 
    location as the "from" location.*/
    /* replace: This prop indicates that the navigation should replace the current entry in the history stack instead of adding
     a new entry. When replace is set to true, the current page in the browser's history will be replaced with the new page, making it not
      possible to go back to the previous page using the browser's back button. */
    <Navigate to="/login" state={{ from: location }} replace />
  );

  return content;
};
export default RequireAuth;
