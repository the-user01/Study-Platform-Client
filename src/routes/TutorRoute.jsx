import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useTutor from "../hooks/useTutor";

const TutorRoute = ({children}) => {
    const { user, logOut, loader } = useAuth();
    const [isTutor, isTutorLoading] = useTutor();

    const location = useLocation();

    if (loader || isTutorLoading) {
        <span className="loading loading-dots loading-lg flex justify-center items-center min-h-screen"></span>
    } else if (user && isTutor) {
        return children;
    }
    else {
        logOut()
        return <Navigate state={location.pathname} to='/login'></Navigate>
    }
};

export default TutorRoute;