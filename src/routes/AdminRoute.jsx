import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({children}) => {
    const { user,logOut, loader } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();

    const location = useLocation();

    if (loader || isAdminLoading) {
        <span className="loading loading-dots loading-lg flex justify-center items-center min-h-screen"></span>
    } else if (user && isAdmin) {
        return children;
    }
    else {
        logOut()
        return <Navigate state={location.pathname} to='/login'></Navigate>
    }
};

export default AdminRoute;