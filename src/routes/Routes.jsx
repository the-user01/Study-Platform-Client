import {
  createBrowserRouter,
} from "react-router-dom";
import Root from "../layout/Root";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Dashboard from "../layout/Dashboard";
import AllUsers from "../pages/Dashboard/admin/AllUsers/AllUsers";
import AdminHome from "../pages/Dashboard/admin/AdminHome/AdminHome";
import StudySessions from "../pages/Dashboard/admin/StudySessions/StudySessions";
import AllMaterials from "../pages/Dashboard/admin/AllMaterials/AllMaterials";
import TutorHome from "../pages/Dashboard/tutor/TutorHome/TutorHome";
import CreateSession from "../pages/Dashboard/tutor/CreateSession/CreateSession";
import AllStudySession from "../pages/Dashboard/tutor/AllStudySession/AllStudySession";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ]
  },
  {
    path: 'dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      /* Admin Route */
      {
        path: 'admin-home',
        element: <AdminHome></AdminHome>
      },
      {
        path: 'all-users',
        element: <AllUsers></AllUsers>
      },
      {
        path: 'all-sessions',
        element: <StudySessions></StudySessions>
      },
      {
        path: 'all-materials',
        element: <AllMaterials></AllMaterials>
      },

      // Tutor Routes

      {
        path: 'tutor-home',
        element: <TutorHome></TutorHome>
      },
      {
        path: 'create-session',
        element: <CreateSession></CreateSession>
      },
      {
        path: 'view-all-sessions',
        element: <AllStudySession></AllStudySession>
      },
    ]
  }
]);

export default router;