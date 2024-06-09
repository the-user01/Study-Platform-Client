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
import ViewNotes from "../pages/Dashboard/tutor/ViewNotes/ViewNotes";
import StudentHome from "../pages/Dashboard/student/StudentHome/StudentHome";
import BookedSession from "../pages/Dashboard/student/BookedSession/BookedSession";
import CreateNote from "../pages/Dashboard/student/CreateNote/CreateNote";
import PersonalNotes from "../pages/Dashboard/student/PersonalNotes/PersonalNotes";
import StudyMaterials from "../pages/Dashboard/student/StudyMaterials/StudyMaterials";
import PrivateRoutes from "./PrivateRoutes";
import AdminRoute from "./AdminRoute";


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
      {
        path: 'upload-materials',
        element: <UploadMaterial></UploadMaterial>
      },
      {
        path: 'view-materials',
        element: <ViewMaterials></ViewMaterials>
      },
      {
        path: 'view-notes',
        element: <ViewNotes></ViewNotes>
      },


      // Student Route

      {
        path: 'student-home',
        element: <StudentHome></StudentHome>
      },
      {
        path: 'booked-session',
        element: <BookedSession></BookedSession>
      },
      {
        path: 'create-note',
        element: <CreateNote></CreateNote>
      },
      {
        path: 'personal-notes',
        element: <PersonalNotes></PersonalNotes>
      },
      {
        path: 'view-study-materials',
        element: <StudyMaterials></StudyMaterials>
      },
    ]
  }
]);

export default router;