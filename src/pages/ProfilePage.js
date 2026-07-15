import { useEffect, useState } from "react";
import axios from "axios";
import API from "../api";


function ProfilePage() {

    const [tasks, setTasks] = useState([]);

    const username = localStorage.getItem("username");

    useEffect(() => {

        const fetchTasks = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await axios.get(
                    `${API}/tasks`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setTasks(response.data);

            } catch (error) {

                console.log(error);

            }

        };

        fetchTasks();

    }, []);

    const completed = tasks.filter(task => task.completed).length;

    const pending = tasks.filter(task => !task.completed).length;

    const completionRate =
        tasks.length === 0
            ? 0
            : Math.round((completed / tasks.length) * 100);

    return (

        <div className="page-content">

            <div className="profile-hero">

                <div className="profile-avatar">

                    👤

                </div>

                <div>

                    <h1>{username}</h1>

                    <p>Task Manager User</p>

                </div>

            </div>

            <div className="profile-grid">

                <div className="profile-card">

                    <h2>Total Tasks</h2>

                    <h1>{tasks.length}</h1>

                </div>

                <div className="profile-card">

                    <h2>Completed</h2>

                    <h1>{completed}</h1>

                </div>

                <div className="profile-card">

                    <h2>Pending</h2>

                    <h1>{pending}</h1>

                </div>

                <div className="profile-card">

                    <h2>Completion Rate</h2>

                    <h1>{completionRate}%</h1>

                </div>

            </div>

            <div className="profile-actions">

                <button className="edit-btn">

                    ✏ Edit Profile

                </button>

                <button className="status-btn">

                    🔒 Change Password

                </button>

            </div>

        </div>

    );

}

export default ProfilePage;