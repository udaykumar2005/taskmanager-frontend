import { Draggable } from "@hello-pangea/dnd";

function TaskList({
    provided,
    filteredTasks,
    getPriorityClass,
    getDueStatus,
    toggleTask,
    updateTask,
    deleteTask
}) {

    const formatTime = (time) => {

        if (!time) return "";

        const [hour, minute] = time.split(":");

        const h = parseInt(hour);

        const ampm = h >= 12 ? "PM" : "AM";

        const displayHour = h % 12 || 12;

        return `${displayHour}:${minute} ${ampm}`;
    };

    return (

        <div
            ref={provided.innerRef}
            {...provided.droppableProps}
        >

            {filteredTasks.map((task, index) => {

                const category = task.category || "General";
                const priority = task.priority || "Low";
                const due = getDueStatus(task.dueDate);

                return (

                    <Draggable
                        key={task.id}
                        draggableId={String(task.id)}
                        index={index}
                    >

                        {(provided) => (

                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`task-card ${task.completed ? "completed-task" : ""}`}
                            >

                                <div className="task-header">

                                    <div>

                                        <h3 className="task-title">
                                            {task.title}
                                        </h3>

                                        <div className="task-tags">

                                            <span
                                                className={`category-badge category-${category.toLowerCase()}`}
                                            >
                                                {category}
                                            </span>

                                            <span
                                                className={`priority-badge ${getPriorityClass(priority)}`}
                                            >
                                                {priority}
                                            </span>

                                            <span
                                                className={`due-badge ${due.className}`}
                                            >
                                                {due.text}
                                            </span>

                                            {task.dueTime && (
                                                <span className="time-badge">
                                                    🕒 {task.dueTime}
                                                </span>
                                            )}

                                        </div>
                                        <div
                                            style={{
                                                marginTop: "10px",
                                                fontSize: "14px",
                                                color: "#94a3b8"
                                            }}
                                        >

                                            {task.dueDate && (
                                                <div>
                                                    📅 {task.dueDate}
                                                </div>
                                            )}

                                            {task.dueTime && (
                                                <div>
                                                    🕒 {formatTime(task.dueTime)}
                                                </div>
                                            )}

                                        </div>

                                    </div>

                                </div>

                                <div className="task-actions">

                                    <button
                                        className="status-btn"
                                        onClick={() => toggleTask(task)}
                                    >
                                        {task.completed ? "↩ Undo" : "✔ Complete"}
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

                            </div>

                        )}

                    </Draggable>

                );

            })}

            {provided.placeholder}

        </div>

    );

}

export default TaskList;