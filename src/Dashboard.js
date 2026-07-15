import {
    Chart as ChartJS,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
);

function Dashboard({ tasks }) {

    const high =
        tasks.filter(task => task.priority === "High").length;

    const medium =
        tasks.filter(task => task.priority === "Medium").length;

    const low =
        tasks.filter(task => task.priority === "Low").length;

    const study =
        tasks.filter(task => task.category === "Study").length;

    const work =
        tasks.filter(task => task.category === "Work").length;

    const fitness =
        tasks.filter(task => task.category === "Fitness").length;

    const personal =
        tasks.filter(task => task.category === "Personal").length;

    const general =
        tasks.filter(
            task =>
                !task.category ||
                task.category === "General"
        ).length;

    const barData = {
        labels: ["High", "Medium", "Low"],

        datasets: [
            {
                label: "Number of Tasks",

                data: [high, medium, low],

                backgroundColor: [
                    "#ef4444",
                    "#f59e0b",
                    "#22c55e"
                ],

                borderRadius: 10,

                borderSkipped: false,

                barThickness: 45
            }
        ]
    };

    const categoryData = {

        labels: [

            "Study",
            "Work",
            "Fitness",
            "Personal",
            "General"

        ],

        datasets: [

            {

                label: "Tasks",

                data: [

                    study,
                    work,
                    fitness,
                    personal,
                    general

                ],

                backgroundColor: [

                    "#2563eb",
                    "#7c3aed",
                    "#16a34a",
                    "#f97316",
                    "#6b7280"

                ]

            }

        ]

    };

    const options = {

        responsive: true,

        plugins: {

            legend: {

                display: false

            }

        },

        scales: {

            y: {

                beginAtZero: true,

                grid: {

                    color: "#334155"

                },

                ticks: {

                    color: "white",

                    stepSize: 1

                }

            },

            x: {

                grid: {

                    display: false

                },

                ticks: {

                    color: "white",

                    font: {

                        size: 14,

                        weight: "bold"

                    }

                }

            }

        }

    };
    return (

        <div className="dashboard">

            <div className="chart-card">

                <h3>Priority Distribution</h3>

                <Bar
                    data={barData}
                    options={{ options }} />

            </div>

            <div className="chart-card">

                <h3>Tasks by Category</h3>

                <Bar
                    data={categoryData}
                    options={options}
                />

            </div>

        </div>

    );

}

export default Dashboard;