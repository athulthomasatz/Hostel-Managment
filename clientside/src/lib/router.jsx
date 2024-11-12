import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
// 
import Dashboard from "../pages/user/Dashboard";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
// admin below
import AdminDashboard from "../pages/admin/AdminDashboard";
import Roomstatus from "../pages/user/Roomstatus";
import AdminLogin from "../pages/admin/AdminLogin";
import RoomManagement from "../pages/admin/RoomManagement";
import AddRoom from "../pages/admin/AddRoom";
import UpdateRoom from "../pages/admin/UpdateRoom";
import Notifications from "../pages/admin/Notification";
import AddNotification from "../pages/admin/AddNotification";
import UpdateNotification from "../pages/admin/UpdateNotification";
import AdminBookings from "../pages/admin/AdminBookings";

// users page
import NoticePage from "../pages/user/NoticesPage";
import BookRoom from "../pages/user/Bookroom";
import Profile from "../pages/user/Profile";
import EditProfile from "../pages/user/EditProfile";
import Payment from "../pages/user/Payment";
const router = createBrowserRouter([
    {
        path: '',
        element: (
            <Dashboard />
        ),
        // errorElement: <NotFound />,
    },
    {
        path: 'roomstatus',
        element: (
            <ProtectedRoute>
                <Roomstatus />
            </ProtectedRoute>
        )
    },
    {
        path: 'login', // Add the login route
        element: <Login />
    },
    {
        path: 'register',
        element: <Register />,

    },
    {
        path: 'admin/login',
        element: (
            <AdminLogin />
        )
    },
    {
        path: 'admin/dashboard',
        element: (
            <ProtectedRoute>
                <AdminDashboard />
            </ProtectedRoute>

        )
    },
    {
        path: '/room-management',
        element: (
            <RoomManagement />
        )

    },
    {
        path: '/add-room',
        element: (

            <AddRoom />
        )
    },
    {
        path: '/update-room/:id',
        element: (
            <UpdateRoom />
        )
    },
    {
        path: '/admin/notices',
        element: (
            <Notifications />
        )
    },
    {
        path: '/admin/add-notice',
        element: (
            <AddNotification />
        )
    },
    {
        path: '/admin/update-notifi/:id',
        element: (
            <UpdateNotification />
        )
    },
    {
        path: '/notices',
        element: (
            <ProtectedRoute>
                <NoticePage />
            </ProtectedRoute>

        )
    },
    {
        path: '/book/:roomId',
        element: (
            <ProtectedRoute>
                <BookRoom />
            </ProtectedRoute>

        )
    }, 
    {
        path: '/profile',
        element: (
            <ProtectedRoute>
                <Profile />
            </ProtectedRoute>
        )
    },
    {
        path: '/edit-profile',
        element: (
            <ProtectedRoute>
                <EditProfile />
            </ProtectedRoute>
        )
    },
    {
        path: '/admin/bookings',
        element:(
            <ProtectedRoute>
                <AdminBookings />
            </ProtectedRoute>
        )
    },
    {
        path: '/payment',
        element: (
            <ProtectedRoute>
                <Payment />
            </ProtectedRoute>
        )
    }

]);
export default router