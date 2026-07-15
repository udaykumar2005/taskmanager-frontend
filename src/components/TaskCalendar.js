import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function TaskCalendar({

    tasks,

    selectedDate,

    setSelectedDate

}) {

    return (

        <div className="calendar-section">

            <h2>📅 Task Calendar</h2>

            <Calendar

                onChange={setSelectedDate}

                value={selectedDate}

                tileContent={({ date, view }) => {

                    if (view !== "month") return null;

                    const hasTask = tasks.some(task => {

                        if (!task.dueDate) return false;

                        const taskDate = new Date(task.dueDate);

                        return (
                            taskDate.getFullYear() === date.getFullYear() &&
                            taskDate.getMonth() === date.getMonth() &&
                            taskDate.getDate() === date.getDate()
                        );

                    });

                    return hasTask ? (

                        <div className="calendar-dot"></div>

                    ) : null;

                }}

            />

            <div className="calendar-task-list">

                <h3>Tasks on Selected Date</h3>

                {

                    tasks.filter(task => {

                        if (!task.dueDate) return false;

                        const taskDate = new Date(task.dueDate);

                        return (

                            taskDate.toDateString() ===
                            selectedDate.toDateString()

                        );

                    }).length === 0

                        ?

                        (

                            <p>No tasks</p>

                        )

                        :

                        (

                            tasks

                                .filter(task => {

                                    if (!task.dueDate) return false;

                                    const taskDate = new Date(task.dueDate);

                                    return (

                                        taskDate.toDateString() ===
                                        selectedDate.toDateString()

                                    );

                                })

                                .map(task => (

                                    <div
                                        key={task.id}
                                        className="calendar-task"
                                    >

                                        <strong>

                                            {task.title}

                                        </strong>

                                        <br />

                                        {task.priority}

                                    </div>

                                ))

                        )

                }

            </div>
        </div>

    );

}

export default TaskCalendar;