import TaskCard from "./TaskCard";

function TaskList({
  tasks,
  onToggle,
  onEdit,
  onDelete
}) {

  return (
    <>
      {tasks.map((task) => (

        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />

      ))}
    </>
  );
}

export default TaskList;