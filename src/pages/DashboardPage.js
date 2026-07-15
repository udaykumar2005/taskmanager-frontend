import { useEffect, useState } from "react";
import axios from "axios";
import API from "../api";

function DashboardPage() {

    const [tasks, setTasks] = useState([]);

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

    const username = localStorage.getItem("username");

    const completedTasks =
        tasks.filter(task => task.completed);

    const pendingTasks =
        tasks.filter(task => !task.completed);

    const progress =
        tasks.length === 0
            ? 0
            : Math.round(
                (completedTasks.length / tasks.length) * 100
            );

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const todaysTasks = pendingTasks.filter(task => {

        if (!task.dueDate) return false;

        const due = new Date(task.dueDate);

        due.setHours(0, 0, 0, 0);

        return due.getTime() === today.getTime();

    });

    const overdueTasks = pendingTasks.filter(task => {

        if (!task.dueDate) return false;

        const due = new Date(task.dueDate);

        due.setHours(0, 0, 0, 0);

        return due < today;

    });

    const upcomingTasks = pendingTasks

        .filter(task => {

            if (!task.dueDate) return false;

            const due = new Date(task.dueDate);

            due.setHours(0, 0, 0, 0);

            return due > today;

        })

        .sort(

            (a, b) =>

                new Date(a.dueDate) -

                new Date(b.dueDate)

        );

    const completedToday = completedTasks.filter(task => {

        if (!task.completedDate)

            return false;

        const completed = new Date(task.completedDate);

        completed.setHours(0, 0, 0, 0);

        return completed.getTime() === today.getTime();

    });

    return (

        <div>

            {/* Welcome */}

            <div className="welcome-card">

                <div className="welcome-left">

                    <h1>👋 Welcome back, {username}!</h1>

                    <p>Stay productive and keep crushing your goals.</p>

                </div>

                <div className="welcome-right">

                    <div className="rocket">

                        🚀

                    </div>

                    <p>

                        📅 {today.toLocaleDateString("en-IN", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                        })}

                    </p>

                </div>

            </div>


            <h2 className="dashboard-section">

                Overview

            </h2>

            <div className="stats">

                <div className="stat-card">

                    <div className="stat-icon blue">
                        📋
                    </div>

                    <div className="stat-content">

                        <h2>{tasks.length}</h2>

                        <p>Total Tasks</p>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="stat-icon green">
                        ✅
                    </div>

                    <div className="stat-content">

                        <h2>{completedTasks.length}</h2>

                        <p>Completed</p>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="stat-icon orange">
                        ⏳
                    </div>

                    <div className="stat-content">

                        <h2>{pendingTasks.length}</h2>

                        <p>Pending</p>

                    </div>

                </div>

                <div className="stat-card">

                    <div className="stat-icon red">
                        🚨
                    </div>

                    <div className="stat-content">

                        <h2>{overdueTasks.length}</h2>

                        <p>Overdue</p>

                    </div>

                </div>

            </div>

            <div className="progress-section">

                <div className="progress-header">

                    <span>

                        📈 Productivity Score

                    </span>

                    <span>

                        {progress}%

                    </span>

                </div>

                <div className="progress-bar">

                    <div

                        className="progress-fill"

                        style={{

                            width: `${progress}%`

                        }}

                    />

                </div>

            </div>

            <div className="dashboard-grid">
                <DashboardCard
                    title="📅 Today's Tasks"
                    tasks={todaysTasks}
                />

                <DashboardCard
                    title="⚠ Overdue Tasks"
                    tasks={overdueTasks}
                />

                <DashboardCard
                    title="📌 Upcoming Tasks"
                    tasks={upcomingTasks.slice(0, 5)}
                />

                <DashboardCard
                    title="✅ Completed Today"
                    tasks={completedToday}
                    completed
                />

            </div>

        </div>

    );

}

function DashboardCard({

    title,

    tasks,

    completed = false

}) {

    return (

        <div className="dashboard-card">

            <h2>{title}</h2>

            {

                tasks.length === 0 ? (

                    <p>No tasks available.</p>

                ) : (

                    <div className="dashboard-task-list">

                        {

                            tasks.map(task => (

                                <div

                                    key={task.id}

                                    className="dashboard-task"

                                >

                                    <strong>

                                        {task.title}

                                    </strong>

                                    <br />

                                    {

                                        completed ? (

                                            <span>

                                                ✅ {task.completedDate}

                                            </span>

                                        ) : (

                                            <>

                                                <span>

                                                    📅 {task.dueDate}

                                                </span>

                                                <br />

                                                <span>

                                                    🔥 {task.priority}

                                                </span>

                                            </>

                                        )

                                    }

                                </div>

                            ))

                        }

                    </div>

                )

            }

        </div>

    );

}

export default DashboardPage;