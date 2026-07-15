import { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import API from "../api";


function CalendarPage() {

    const [tasks, setTasks] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

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

    const selectedTasks = tasks.filter(task => {

        if (!task.dueDate) return false;

        return (
            new Date(task.dueDate).toDateString() ===
            selectedDate.toDateString()
        );

    });

    const upcomingTasks = tasks
        .filter(task => {

            if (task.completed || !task.dueDate)
                return false;

            return new Date(task.dueDate) >= new Date();

        })
        .sort(
            (a, b) =>
                new Date(a.dueDate) -
                new Date(b.dueDate)
        )
        .slice(0, 5);

    return (

        <div className="calendar-page">

            <div className="calendar-hero">

                <div>

                    <h1>📅 Calendar</h1>

                    <p>
                        Manage your schedule and upcoming deadlines.
                    </p>

                </div>

                <div className="calendar-badge">

                    <h2>
                        {selectedTasks.length}
                    </h2>

                    <span>Tasks Today</span>

                </div>

            </div>

            <div className="calendar-grid">

                <div className="calendar-card">

                    <Calendar

                        value={selectedDate}

                        onChange={setSelectedDate}

                        tileContent={({ date, view }) => {

                            if (view !== "month") return null;

                            const task = tasks.find(t => {

                                if (!t.dueDate) return false;

                                return (
                                    new Date(t.dueDate).toDateString() ===
                                    date.toDateString()
                                );

                            });

                            if (!task) return null;

                            let dotClass = "calendar-dot-blue";

                            if (task.completed) {

                                dotClass = "calendar-dot-green";

                            }

                            else {

                                const today = new Date();

                                today.setHours(0, 0, 0, 0);

                                const due = new Date(task.dueDate);

                                due.setHours(0, 0, 0, 0);

                                if (due < today)

                                    dotClass = "calendar-dot-red";

                                else if (due.getTime() === today.getTime())

                                    dotClass = "calendar-dot-orange";

                            }

                            return <div className={dotClass}></div>;

                        }}

                    />

                    <div className="calendar-legend">

                        <div>

                            <span className="calendar-dot-green"></span>

                            Completed

                        </div>

                        <div>

                            <span className="calendar-dot-orange"></span>

                            Today

                        </div>

                        <div>

                            <span className="calendar-dot-red"></span>

                            Overdue

                        </div>

                        <div>

                            <span className="calendar-dot-blue"></span>

                            Upcoming

                        </div>

                    </div>
                </div>

                <div>

                    <div className="calendar-task-card">

                        <h2>

                            📅 Tasks on

                            {" "}

                            {selectedDate.toDateString()}

                        </h2>

                        {

                            selectedTasks.length === 0 ?

                                (

                                    <div className="empty-day">

                                        🎉 No tasks scheduled.

                                    </div>

                                )

                                :

                                (

                                    selectedTasks.map(task => (

                                        <div

                                            key={task.id}

                                            className="calendar-task"

                                        >

                                            <h3>

                                                {task.title}

                                            </h3>

                                            <span>

                                                {task.priority}

                                            </span>

                                        </div>

                                    ))

                                )

                        }

                    </div>

                    <div className="upcoming-card">

                        <h2>

                            ⏰ Upcoming Deadlines

                        </h2>

                        {

                            upcomingTasks.length === 0 ?

                                (

                                    <p>

                                        No upcoming tasks.

                                    </p>

                                )

                                :

                                (

                                    upcomingTasks.map(task => (

                                        <div

                                            key={task.id}

                                            className="upcoming-task"

                                        >

                                            <strong>

                                                {task.title}

                                            </strong>

                                            <br />

                                            <small>

                                                📅 {task.dueDate}

                                            </small>

                                        </div>

                                    ))

                                )

                        }

                    </div>

                </div>

            </div>

        </div>

    );

}

export default CalendarPage;