function TaskCard({
  task,
  onToggle,
  onEdit,
  onDelete
}) {

  return (
    <div className="task-card">

      <h2
        className={
          task.completed ? "completed" : ""
        }
      >
        {task.title}
      </h2>

      <p>
        Status:
        {" "}
        {task.completed
          ? "Completed"
          : "Pending"}
      </p>

      <button
        onClick={() => onToggle(task.id)}
      >
        Toggle
      </button>

      <button
        onClick={() => onEdit(task)}
      >
        Edit
      </button>

      <button
        className="delete-btn"
        onClick={() => onDelete(task.id)}
      >
        Delete
      </button>

    </div>
  );
}

export default TaskCard;