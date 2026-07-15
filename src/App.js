import { useEffect } from "react";
import "./App.css";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Layout from "./components/Layout/Layout";

import DashboardPage from "./pages/DashboardPage";
import TasksPage from "./pages/TasksPage";
import CalendarPage from "./pages/CalendarPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ArchivePage from "./pages/ArchivePage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";

import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./Login";
import Register from "./Register";

import { requestNotificationPermission } from "./utils/notificationService";

function App() {

    useEffect(() => {
        requestNotificationPermission();
    }, []);

    return (

        <BrowserRouter>

            <Routes>

                {/* Public Routes */}

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* Protected Routes */}

                <Route
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                >

                    <Route
                        path="/dashboard"
                        element={<DashboardPage />}
                    />

                    <Route
                        path="/tasks"
                        element={<TasksPage />}
                    />

                    <Route
                        path="/calendar"
                        element={<CalendarPage />}
                    />

                    <Route
                        path="/analytics"
                        element={<AnalyticsPage />}
                    />

                    <Route
                        path="/archive"
                        element={<ArchivePage />}
                    />

                    <Route
                        path="/profile"
                        element={<ProfilePage />}
                    />

                    <Route
                        path="/settings"
                        element={<SettingsPage />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>

    );
}

export default App;