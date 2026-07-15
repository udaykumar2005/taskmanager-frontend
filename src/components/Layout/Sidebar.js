import {
    FaHome,
    FaTasks,
    FaCalendarAlt,
    FaChartPie,
    FaArchive,
    FaUser,
    FaCog,
    FaSignOutAlt
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {

    const navigate = useNavigate();

    const username = localStorage.getItem("username") || " ";

    const logout = () => {

    localStorage.clear();

    navigate("/", { replace: true });

};

    return (

        <div className="sidebar">

            <div>

                <h2 className="logo">

                    📝 Task Manager

                </h2>

                <div className="sidebar-profile">

                    <div className="avatar">

                        👤

                    </div>

                    <h3>{username}</h3>

                    <p>Software Developer</p>

                </div>

                <nav>

                    <NavLink to="/dashboard">

                        <FaHome />

                        Dashboard

                    </NavLink>

                    <NavLink to="/tasks">

                        <FaTasks />

                        My Tasks

                    </NavLink>

                    <NavLink to="/calendar">

                        <FaCalendarAlt />

                        Calendar

                    </NavLink>

                    <NavLink to="/analytics">

                        <FaChartPie />

                        Analytics

                    </NavLink>

                    <NavLink to="/archive">

                        <FaArchive />

                        Archive

                    </NavLink>

                    <NavLink to="/profile">

                        <FaUser />

                        Profile

                    </NavLink>

                    <NavLink to="/settings">

                        <FaCog />

                        Settings

                    </NavLink>

                </nav>

            </div>

            <button

                className="logout-btn"

                onClick={logout}

            >

                <FaSignOutAlt />

                Logout

            </button>

        </div>

    );

}

export default Sidebar;