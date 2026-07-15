const getCategory = (category) => {

    switch (category) {

        case "Study":
            return {
                icon: "💻",
                className: "category-study"
            };

        case "Work":
            return {
                icon: "💼",
                className: "category-work"
            };

        case "Fitness":
            return {
                icon: "💪",
                className: "category-fitness"
            };

        case "Personal":
            return {
                icon: "🎮",
                className: "category-personal"
            };

        case "Shopping":
            return {
                icon: "🛒",
                className: "category-shopping"
            };

        default:
            return {
                icon: "📁",
                className: "category-general"
            };

    }

};

function TaskCard({

    task,

    getPriorityClass,

    getDueStatus,

    toggleTask,

    updateTask,

    deleteTask

}) {

    // Get category details only once
    const categoryInfo = getCategory(task.category);

    return (

        <li
            className={task.completed ? "completed-task" : ""}
        >

            <div className="task-info">

                <strong className="task-title">

                    {task.completed ? "✔ " : ""}

                    {task.title}

                </strong>

                <br />

                <span
                    className={`priority-badge ${getPriorityClass(task.priority)}`}
                >
                    {task.priority}
                </span>

                <br />

                {task.category && (

                    <span
                        className={`category-badge ${categoryInfo.className}`}
                    >
                        {categoryInfo.icon} {task.category}
                    </span>

                )}

                <br />

                <span
                    className={`due-badge ${getDueStatus(task.dueDate).className}`}
                >
                    📅 {getDueStatus(task.dueDate).text}
                </span>

                {task.completed && task.completedDate && (

                    <>
                        <br />

                        <span className="completed-date">

                            ✅ Completed: {task.completedDate}

                        </span>

                    </>

                )}

            </div>

            <div className="task-buttons">

                <button
                    className="status-btn"
                    onClick={() => toggleTask(task)}
                >
                    {task.completed
                        ? "✔ Completed"
                        : "⏳ Pending"}
                </button>

                <button
                    className="edit-btn"
                    onClick={() => updateTask(task)}
                >
                    ✏ Edit
                </button>

                <button
                    className="delete-btn"
                    onClick={() => deleteTask(task.id)}
                >
                    🗑 Delete
                </button>

            </div>

        </li>

    );

}

export default TaskCard;