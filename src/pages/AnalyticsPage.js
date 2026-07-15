import { useEffect, useState } from "react";
import axios from "axios";
import API from "../api";


import {

    Chart as ChartJS,

    ArcElement,

    BarElement,

    CategoryScale,

    LinearScale,

    Tooltip,

    Legend

} from "chart.js";

import {

    Pie,

    Bar

} from "react-chartjs-2";

ChartJS.register(

    ArcElement,

    BarElement,

    CategoryScale,

    LinearScale,

    Tooltip,

    Legend

);

function AnalyticsPage() {

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

            }

            catch (error) {

                console.log(error);

            }

        };

        fetchTasks();

    }, []);

    const chartData = {

        labels: [

            "Completed",

            "Pending"

        ],

        datasets: [

            {

                data: [

                    tasks.filter(task => task.completed).length,

                    tasks.filter(task => !task.completed).length

                ],

                backgroundColor: [

                    "#22c55e",

                    "#ef4444"

                ]

            }

        ]

    };

    const priorityData = {

        labels: [

            "High",

            "Medium",

            "Low"

        ],

        datasets: [

            {

                label: "Tasks",

                data: [

                    tasks.filter(task => task.priority === "High").length,

                    tasks.filter(task => task.priority === "Medium").length,

                    tasks.filter(task => task.priority === "Low").length

                ],

                backgroundColor: [

                    "#ef4444",

                    "#f59e0b",

                    "#22c55e"

                ]

            }

        ]

    };

    const categoryData = {

        labels: [

            "Study",

            "Work",

            "Fitness",

            "Personal",

            "Shopping",

            "General"

        ],

        datasets: [

            {

                label: "Tasks",

                data: [

                    tasks.filter(task => task.category === "Study").length,

                    tasks.filter(task => task.category === "Work").length,

                    tasks.filter(task => task.category === "Fitness").length,

                    tasks.filter(task => task.category === "Personal").length,

                    tasks.filter(task => task.category === "Shopping").length,

                    tasks.filter(task => task.category === "General").length

                ],

                backgroundColor: [

                    "#3b82f6",

                    "#6366f1",

                    "#22c55e",

                    "#f59e0b",

                    "#ef4444",

                    "#64748b"

                ]

            }

        ]

    };

    const completionRate =

        tasks.length === 0

            ? 0

            : Math.round(

                (tasks.filter(task => task.completed).length /

                    tasks.length) * 100

            );

    return (
    <div className="analytics-page">

        <div className="page-header">
            <div>
                <div className="analytics-hero">
    <div className="analytics-hero-left">
        <h1>📊 Analytics</h1>
        <p>
            Track your productivity, monitor task completion,
            and gain insights into your work.
        </p>
    </div>

    <div className="analytics-hero-right">
        <h2>📈 Stay Consistent</h2>
        <p>
            Small progress every day leads to big achievements.
        </p>
    </div>
</div>
            </div>
        </div>

        {/* Top Cards */}

        <div className="analytics-stats">

            <div className="analytics-card">
                <span>📈</span>
                <h2>{completionRate}%</h2>
                <p>Completion Rate</p>
            </div>

            <div className="analytics-card">
                <span>🔥</span>
                <h2>
                    {tasks.filter(task => task.priority === "High").length}
                </h2>
                <p>High Priority</p>
            </div>

            <div className="analytics-card">
                <span>✅</span>
                <h2>
                    {tasks.filter(task => task.completed).length}
                </h2>
                <p>Completed Tasks</p>
            </div>

        </div>

        {/* Charts */}

        <div className="analytics-grid">

            <div className="chart-card">

                <h2>🥧 Task Completion</h2>

                <div
                    style={{
                        width: "280px",
                        height: "280px",
                        margin: "20px auto"
                    }}
                >
                    <Pie
                        data={chartData}
                        options={{
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    position: "top"
                                }
                            }
                        }}
                    />
                </div>

            </div>

            <div className="chart-card">

                <h2>📊 Priority Distribution</h2>

                <div
                    style={{
                        height: "320px"
                    }}
                >
                    <Bar
                        data={priorityData}
                        options={{
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: false
                                }
                            }
                        }}
                    />
                </div>

            </div>

            <div
                className="chart-card"
                style={{
                    gridColumn: "1 / span 2"
                }}
            >

                <h2>📚 Category Distribution</h2>

                <div
                    style={{
                        height: "330px"
                    }}
                >
                    <Bar
                        data={categoryData}
                        options={{
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: false
                                }
                            }
                        }}
                    />
                </div>

            </div>

        </div>

    </div>
);

}

export default AnalyticsPage;