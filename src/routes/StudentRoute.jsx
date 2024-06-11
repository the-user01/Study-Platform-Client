import { useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useStudent from "../hooks/useStudent";

const StudentRoute = ({children}) => {
    const { user, logOut, loader } = useAuth()
    const [isStudent, isStudentLoading] = useStudent()

    const location = useLocation();

    if (loader || isStudentLoading) {
        <span className="loading loading-dots loading-lg flex justify-center items-center min-h-screen"></span>
    } else if (user && isStudent) {
        return children;
    }
    else {
        logOut()
        return <Navigate state={location.pathname} to='/login'></Navigate>
    }

};

export default StudentRoute;