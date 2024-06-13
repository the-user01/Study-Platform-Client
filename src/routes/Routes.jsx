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
import UploadMaterial from "../pages/Dashboard/tutor/UploadMaterial/UploadMaterial";
import ViewMaterials from "../pages/Dashboard/tutor/ViewMaterials/ViewMaterials";
import StudentHome from "../pages/Dashboard/student/StudentHome/StudentHome";
import BookedSession from "../pages/Dashboard/student/BookedSession/BookedSession";
import CreateNote from "../pages/Dashboard/student/CreateNote/CreateNote";
import PersonalNotes from "../pages/Dashboard/student/PersonalNotes/PersonalNotes";
import StudyMaterials from "../pages/Dashboard/student/StudyMaterials/StudyMaterials";
import PrivateRoutes from "./PrivateRoutes";
import AdminRoute from "./AdminRoute";
import TutorRoute from "./TutorRoute";
import StudentRoute from "./StudentRoute";
import SessionDetail from "../pages/SessionDetail/SessionDetail";
import Payment from "../pages/Payment/Payment";

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
        path: "/session-detail/:id",
        element: <PrivateRoutes><SessionDetail></SessionDetail></PrivateRoutes>,
      },
      {
        path: "/payment/:id",
        element: <PrivateRoutes><Payment></Payment></PrivateRoutes>,
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

  // Dashboard Routes
  {
    path: 'dashboard',
    element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
    children: [
      /* Admin Route */
      {
        path: 'admin-home',
        element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
      },
      {
        path: 'all-users',
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
      },
      {
        path: 'all-sessions',
        element: <AdminRoute><StudySessions></StudySessions></AdminRoute>
      },
      {
        path: 'all-materials',
        element: <AdminRoute><AllMaterials></AllMaterials></AdminRoute>
      },


      // Tutor Routes

      {
        path: 'tutor-home',
        element: <TutorRoute><TutorHome></TutorHome></TutorRoute>
      },
      {
        path: 'create-session',
        element: <TutorRoute><CreateSession></CreateSession></TutorRoute>
      },
      {
        path: 'view-all-sessions',
        element: <TutorRoute><AllStudySession></AllStudySession></TutorRoute>
      },
      {
        path: 'upload-materials/:id',
        element: <TutorRoute><UploadMaterial></UploadMaterial></TutorRoute>
      },
      {
        path: 'view-materials',
        element: <TutorRoute><ViewMaterials></ViewMaterials></TutorRoute>
      },
      


      // Student Route

      {
        path: 'student-home',
        element: <StudentRoute><StudentHome></StudentHome></StudentRoute>
      },
      {
        path: 'booked-session',
        element: <StudentRoute><BookedSession></BookedSession></StudentRoute>
      },
      {
        path: 'create-note',
        element: <StudentRoute><CreateNote></CreateNote></StudentRoute>
      },
      {
        path: 'personal-notes',
        element: <StudentRoute><PersonalNotes></PersonalNotes></StudentRoute>
      },
      {
        path: 'view-study-materials',
        element: <StudentRoute><StudyMaterials></StudyMaterials></StudentRoute>
      },
    ]
  }
]);

export default router;