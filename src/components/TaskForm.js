import { FaPlus } from "react-icons/fa";

function TaskForm({
    title,
    setTitle,

    priority,
    setPriority,

    category,
    setCategory,

    dueDate,
    setDueDate,

    dueTime,
    setDueTime,

    notes,
    setNotes,

    recurring,
    setRecurring,

    recurrenceType,
    setRecurrenceType,

    addTask
}) {

    return (

        <div className="task-form">

            <input
                type="text"
                placeholder="Enter Task..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
            >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>

            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="General">General</option>
                <option value="Study">Study</option>
                <option value="Work">Work</option>
                <option value="Fitness">Fitness</option>
                <option value="Personal">Personal</option>
                <option value="Shopping">Shopping</option>
            </select>

            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />

            <input
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
            />

            <textarea
                placeholder="Notes (Optional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
            />

            <div className="recurring-section">

                <label>

                    <input
                        type="checkbox"
                        checked={recurring}
                        onChange={(e) =>
                            setRecurring(e.target.checked)
                        }
                    />

                    Recurring Task

                </label>

                {recurring && (

                    <select
                        value={recurrenceType}
                        onChange={(e) =>
                            setRecurrenceType(e.target.value)
                        }
                    >
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                    </select>

                )}

            </div>

            <button
                className="add-btn"
                onClick={addTask}
            >
                <FaPlus />
                Add Task
            </button>

        </div>

    );
}

export default TaskForm;