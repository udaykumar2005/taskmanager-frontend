import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import Toolbar from "../components/Toolbar";
import ProgressBar from "../components/ProgressBar";
import LoadingSpinner from "../LoadingSpinner";

import { exportTasksPDF } from "../utils/exportPDF";
import API from "../api";

import {
    DragDropContext,
    Droppable,
} from "@hello-pangea/dnd";

import {
    showNotification
} from "../utils/notificationService";

function TasksPage() {

    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [search, setSearch] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [category, setCategory] = useState("General");
    const [dueDate, setDueDate] = useState("");
    const [sortBy, setSortBy] = useState("none");
    const [filter, setFilter] = useState("all");

    const [showEditModal, setShowEditModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const [editTitle, setEditTitle] = useState("");
    const [editPriority, setEditPriority] = useState("Medium");
    const [editCategory, setEditCategory] = useState("General");
    const [editDueDate, setEditDueDate] = useState("");
    const [dueTime, setDueTime] = useState("");
    const [recurrenceType, setRecurrenceType] = useState("None");
    const [editRecurrenceType, setEditRecurrenceType] = useState("None");
    const [reminderTask, setReminderTask] = useState(null);
    const [recurring, setRecurring] = useState(false);
    const [editRecurring, setEditRecurring] = useState(false);


    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [editDueTime, setEditDueTime] = useState("");

    const token = localStorage.getItem("token");

    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState("");

    const [darkMode, setDarkMode] = useState(

        localStorage.getItem("theme") === "dark"

    );



    const notifiedTasks = useRef(new Set());

    useEffect(() => {

        if (darkMode) {

            document.body.classList.add("dark-mode");

            localStorage.setItem("theme", "dark");

        }

        else {

            document.body.classList.remove("dark-mode");

            localStorage.setItem("theme", "light");

        }

    }, [darkMode]);

    const fetchTasks = useCallback(async (showOverdueNotification = false) => {

        setLoading(true);

        try {


            console.log("Fetching Tasks...");
            const response = await axios.get(
                `${API}/tasks`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            setTasks(response.data);

            if (showOverdueNotification) {

                const today = new Date();
                today.setHours(0, 0, 0, 0);

                response.data.forEach(task => {

                    if (task.completed || !task.dueDate) return;

                    const due = new Date(task.dueDate);
                    due.setHours(0, 0, 0, 0);

                    if (due < today) {

                        toast.error(
                            `⚠️ ${task.title} is overdue!`,
                            {
                                toastId: `overdue-${task.id}`,
                                autoClose: 5000
                            }
                        );

                    }

                });

            }

            console.log(response.data);


        } catch (error) {

            console.log(error);

            if (error.response?.status === 401) {

                localStorage.clear();
                window.location.reload();

            }

        } finally {

            setLoading(false);

        }

    }, [token]);




    useEffect(() => {

        fetchTasks(true);

    }, [fetchTasks]);

    useEffect(() => {


        const checkReminder = () => {

            const now = new Date();

            tasks.forEach(task => {

                if (task.completed) return;

                if (!task.dueDate || !task.dueTime) return;

                // Skip reminder if task is snoozed
                if (task.snoozeUntil) {

                    const snoozeTime = new Date(task.snoozeUntil);

                    if (snoozeTime > new Date()) {
                        return;
                    }

                }

                const taskDateTime = new Date(
                    `${task.dueDate}T${task.dueTime}`
                );

                const diff =
                    taskDateTime.getTime() - now.getTime();

                const fiveMinutes = 5 * 60 * 1000;

                const notificationId =
                    `${task.id}-${task.dueDate}-${task.dueTime}`;

                if (
                    diff >= 0 &&
                    diff <= fiveMinutes &&
                    !notifiedTasks.current.has(notificationId)
                ) {

                    notifiedTasks.current.add(notificationId);

                    showNotification(
                        "📅 Upcoming Task",
                        `${task.title} starts in 5 minutes.`,
                        notificationId
                    );

                    setReminderTask(task);
                }

            });

        };

        checkReminder();

        const interval =
            setInterval(checkReminder, 30000);

        return () => clearInterval(interval);

    }, [tasks]);



    const addTask = async () => {

        if (title.trim() === "") {

            toast.warning("Task title cannot be empty");
            return;

        }

        try {

            await axios.post(
                `${API}/tasks`,
                {
                    title,
                    completed: false,
                    priority,
                    dueDate,
                    dueTime,
                    category,
                    notes,
                    recurring,
                    recurrenceType
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Task Added");

            showNotification(

                "✅ Task Added",

                `"${title}" has been added successfully.`,

                `add-${Date.now()}`

            );

            setTitle("");
            setPriority("Medium");
            setDueDate("");
            setDueTime("");
            setRecurring(false);
            setRecurrenceType("None");
            setRecurrenceType("None");
            setCategory("General");

            fetchTasks();

        } catch (error) {

            toast.error("Unable to add task");

        }

    };

    const deleteTask = (id) => {

        setTaskToDelete(id);
        setShowDeleteModal(true);

    };

    const confirmDelete = async () => {

        try {

            await axios.delete(

                `${API}/tasks/${taskToDelete}`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            toast.success("Task Deleted");

            setShowDeleteModal(false);
            setTaskToDelete(null);

            fetchTasks();

        } catch {

            toast.error("Delete Failed");

        }

    };

    const toggleTask = async (task) => {

        try {

            await axios.put(

                `${API}/tasks/${task.id}`,

                {
                    title: task.title,
                    completed: !task.completed,
                    priority: task.priority,
                    dueDate: task.dueDate,
                    dueTime: task.dueTime,
                    category: task.category,
                    recurring: task.recurring,
                    recurrenceType: task.recurrenceType,
                    notes: task.notes,
                    orderIndex: task.orderIndex
                },

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            if (!task.completed) {

                showNotification(

                    "🎉 Task Completed",

                    `"${task.title}" completed successfully.`,

                    `complete-${task.id}`

                );

            }

            fetchTasks();

        }

        catch {

            toast.error("Update Failed");

        }

    };

    const updateTask = (task) => {

        setEditingTask(task);

        setEditTitle(task.title);
        setEditPriority(task.priority || "Medium");
        setEditDueDate(task.dueDate || "");
        setEditCategory(task.category || "General");
        setEditDueTime(task.dueTime || "");
        setEditRecurrenceType(task.recurrenceType || "None");
        setEditRecurring(task.recurring || false);
        setEditRecurrenceType(task.recurrenceType || "None");

        setShowEditModal(true);

    };

    const saveTask = async () => {

        try {

            await axios.put(

                `${API}/tasks/${editingTask.id}`,

                {
                    title: editTitle,
                    completed: editingTask.completed,
                    priority: editPriority,
                    dueDate: editDueDate,
                    dueTime: editDueTime,
                    category: editCategory,
                    recurring: editRecurring,
                    recurrenceType: editRecurrenceType,
                    notes: editingTask.notes,
                    orderIndex: editingTask.orderIndex
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            toast.success("Task Updated");

            showNotification(
                "✏️ Task Updated",
                `"${editTitle}" updated successfully.`,
                `update-${editingTask.id}`
            );

            setShowEditModal(false);

            fetchTasks();

        } catch {

            toast.error("Update Failed");

        }

    };

    const snoozeTask = async (taskId) => {

        try {

            await axios.put(

                `${API}/tasks/${taskId}/snooze`,

                {},

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            toast.success("Reminder snoozed for 1 minute");

            fetchTasks();

        } catch {

            toast.error("Unable to snooze reminder");

        }

    };

    const handleDragEnd = (result) => {

        if (!result.destination) return;

        const items = Array.from(filteredTasks);

        const [reorderedItem] =
            items.splice(result.source.index, 1);

        items.splice(
            result.destination.index,
            0,
            reorderedItem
        );

        setTasks(items);

    };

    const exportToExcel = () => {

        const data = tasks.map(task => ({

            Title: task.title,

            Status: task.completed ? "Completed" : "Pending",

            Priority: task.priority,

            Category: task.category,

            DueDate: task.dueDate,

            DueTime: task.dueTime,

            CompletedDate: task.completedDate || "-"

        }));

        const worksheet = XLSX.utils.json_to_sheet(data);

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Tasks"
        );

        const excelBuffer =
            XLSX.write(workbook, {

                bookType: "xlsx",

                type: "array"

            });

        const blob = new Blob(

            [excelBuffer],

            {
                type:
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            }

        );

        saveAs(blob, "Tasks.xlsx");

    };

    const progress =
        tasks.length === 0
            ? 0
            : Math.round(
                (tasks.filter(task => task.completed).length / tasks.length) * 100
            );

    const getPriorityClass = (priority) => {

        if (priority === "High") return "priority-high";
        if (priority === "Medium") return "priority-medium";
        return "priority-low";

    };

    const getDueStatus = (date) => {

        if (!date) {

            return {
                text: "No Due Date",
                className: "due-none"
            };

        }

        const today = new Date();
        const due = new Date(date);

        today.setHours(0, 0, 0, 0);
        due.setHours(0, 0, 0, 0);

        const diff =
            Math.ceil(
                (due - today) /
                (1000 * 60 * 60 * 24)
            );

        if (diff < 0)
            return {
                text: "Overdue",
                className: "due-overdue"
            };

        if (diff === 0)
            return {
                text: "Today",
                className: "due-today"
            };

        if (diff === 1)
            return {
                text: "Tomorrow",
                className: "due-tomorrow"
            };

        return {
            text: `${diff} Days Left`,
            className: "due-upcoming"
        };

    };


    const filteredTasks = [...tasks]

        .filter(task => {

            const matchesSearch =
                task.title
                    .toLowerCase()
                    .includes(search.toLowerCase());

            if (!matchesSearch) return false;

            switch (filter) {

                case "completed":
                    return task.completed;

                case "pending":
                    return !task.completed;

                case "high":
                    return task.priority === "High";

                case "study":
                    return task.category === "Study";

                case "work":
                    return task.category === "Work";

                case "fitness":
                    return task.category === "Fitness";

                case "personal":
                    return task.category === "Personal";

                default:
                    return true;

            }

        })

        .sort((a, b) => {

            if (sortBy === "priority") {

                const order = {
                    High: 1,
                    Medium: 2,
                    Low: 3
                };

                return order[a.priority] - order[b.priority];

            }

            if (sortBy === "dueDate") {

                return new Date(`${a.dueDate}T${a.dueTime || "00:00"}`) -
                    new Date(`${b.dueDate}T${b.dueTime || "00:00"}`);
            }

            return 0;

        });


    return (
        <div className="page-content">

            <div className="tasks-hero">

                <div className="tasks-hero-left">

                    <h1>📋 My Tasks</h1>

                    <p>
                        Organize, prioritize and complete your daily work.
                    </p>

                </div>

                <div className="tasks-hero-right">

                    <div className="tasks-count-card">

                        <h2>Stay Focused 🚀</h2>

                        <span>
                            Every completed task gets you closer to your goals.
                        </span>

                    </div>

                </div>

            </div>
            <div className="container">

                <button

                    className="export-btn"

                    onClick={() => exportTasksPDF(filteredTasks)}

                >

                    📄 Export PDF

                </button>

                <button

                    className="theme-btn"

                    onClick={() => setDarkMode(!darkMode)}

                >

                    {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}

                </button>

                <button
                    className="export-btn"
                    onClick={exportToExcel}
                >
                    📥 Export Excel
                </button>

                <br /><br />

                <TaskForm
                    title={title}
                    setTitle={setTitle}

                    priority={priority}
                    setPriority={setPriority}

                    category={category}
                    setCategory={setCategory}

                    dueDate={dueDate}
                    setDueDate={setDueDate}

                    dueTime={dueTime}
                    setDueTime={setDueTime}

                    recurring={recurring}
                    setRecurring={setRecurring}

                    recurrenceType={recurrenceType}
                    setRecurrenceType={setRecurrenceType}

                    notes={notes}
                    setNotes={setNotes}

                    addTask={addTask}
                />

                <Toolbar

                    search={search}
                    setSearch={setSearch}

                    sortBy={sortBy}
                    setSortBy={setSortBy}

                    filter={filter}
                    setFilter={setFilter}

                />
                <h2 className="section-title">📌 Your Tasks</h2>

                {loading && <LoadingSpinner />}

                <DragDropContext onDragEnd={handleDragEnd}>

                    <Droppable droppableId="tasks">

                        {(provided) => (

                            <TaskList

                                provided={provided}

                                filteredTasks={filteredTasks}

                                getPriorityClass={getPriorityClass}

                                getDueStatus={getDueStatus}

                                toggleTask={toggleTask}

                                updateTask={updateTask}

                                deleteTask={deleteTask}

                            />
                        )}

                    </Droppable>

                </DragDropContext>



                <ProgressBar progress={progress} />


                {
                    filteredTasks.length === 0 && (

                        <div className="empty-state">

                            <h2>📝</h2>

                            <p>No Tasks Found</p>

                        </div>

                    )
                }



                {

                    showEditModal && (

                        <div className="modal-overlay">

                            <div className="modal">

                                <h2>Edit Task</h2>

                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                />

                                <select
                                    value={editPriority}
                                    onChange={(e) => setEditPriority(e.target.value)}
                                >
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>

                                <select
                                    value={editCategory}
                                    onChange={(e) => setEditCategory(e.target.value)}
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
                                    value={editDueDate}
                                    onChange={(e) => setEditDueDate(e.target.value)}
                                />

                                <input
                                    type="time"
                                    value={editDueTime}
                                    onChange={(e) => setEditDueTime(e.target.value)}
                                />

                                <label>
                                    <input
                                        type="checkbox"
                                        checked={editRecurring}
                                        onChange={(e) => setEditRecurring(e.target.checked)}
                                    />
                                    Recurring Task
                                </label>

                                {editRecurring && (
                                    <select
                                        value={editRecurrenceType}
                                        onChange={(e) => setEditRecurrenceType(e.target.value)}
                                    >
                                        <option value="Daily">Daily</option>
                                        <option value="Weekly">Weekly</option>
                                    </select>
                                )}

                                

                                <div className="modal-buttons">

                                    <button

                                        className="add-btn"

                                        onClick={saveTask}

                                    >

                                        Save

                                    </button>

                                    <button

                                        className="delete-btn"

                                        onClick={() =>
                                            setShowEditModal(false)
                                        }

                                    >

                                        Cancel

                                    </button>

                                </div>

                            </div>

                        </div>

                    )

                }

                {

                    showDeleteModal && (

                        <div className="modal-overlay">

                            <div className="modal">

                                <h2>Delete Task</h2>

                                <p>

                                    Are you sure you want to delete this task?

                                </p>

                                <div className="modal-buttons">

                                    <button

                                        className="delete-btn"

                                        onClick={confirmDelete}

                                    >

                                        Delete

                                    </button>

                                    <button

                                        className="edit-btn"

                                        onClick={() =>
                                            setShowDeleteModal(false)
                                        }

                                    >

                                        Cancel

                                    </button>

                                </div>

                            </div>

                        </div>

                    )

                }

            </div>

            {
                reminderTask && (

                    <div className="reminder-popup">

                        <h3>🔔 Upcoming Task</h3>

                        <p>{reminderTask.title}</p>

                        <button

                            onClick={() => {

                                snoozeTask(reminderTask.id);

                                setReminderTask(null);

                            }}

                        >

                            Snooze 1 min

                        </button>

                        <button

                            onClick={() => {

                                setReminderTask(null);

                            }}

                        >

                            Dismiss

                        </button>

                    </div>

                )
            }
        </div>
    );
}

export default TasksPage;