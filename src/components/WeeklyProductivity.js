import {

    Bar

} from "react-chartjs-2";

function WeeklyProductivity({ tasks }) {

    const days = [

        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"

    ];

    const counts = [

        0,0,0,0,0,0,0

    ];

    tasks.forEach(task => {

        if (

            task.completed &&

            task.completedDate

        ) {

            const d = new Date(task.completedDate);

            counts[d.getDay()]++;

        }

    });

    const data = {

        labels: days,

        datasets: [

            {

                label: "Completed Tasks",

                data: counts,

                backgroundColor: "#2563eb"

            }

        ]

    };

    return (

        <div className="chart-card">

            <h2>

                📈 Weekly Productivity

            </h2>

            <Bar data={data} />

        </div>

    );

}

export default WeeklyProductivity;