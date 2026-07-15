import { useEffect, useState } from "react";
import axios from "axios";
import API from "../api";


function ArchivePage() {

    const [tasks, setTasks] = useState([]);

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

                // Completed tasks act as archived tasks
                setTasks(
                    response.data.filter(task => task.completed)
                );

            } catch (error) {

                console.log(error);

            }

        };

        fetchTasks();

    }, []);

    return (

        <div className="page-content">

            {/* Hero */}

            <div className="archive-hero">

                <div>

                    <h1>🗂 Archive</h1>

                    <p>
                        View and manage your completed tasks.
                    </p>

                </div>

                <div className="archive-count">

                    <h2>{tasks.length}</h2>

                    <span>Archived Tasks</span>

                </div>

            </div>

            {/* Archive List */}

            {

                tasks.length === 0 ?

                    (

                        <div className="archive-empty">

                            <h2>🎉</h2>

                            <p>

                                No archived tasks yet.

                            </p>

                        </div>

                    )

                    :

                    (

                        <div className="archive-grid">

                            {

                                tasks.map(task => (

                                    <div
                                        key={task.id}
                                        className="archive-card"
                                    >

                                        <div className="archive-top">

                                            <h3>

                                                {task.title}

                                            </h3>

                                            <span className="archive-status">

                                                ✓ Completed

                                            </span>

                                        </div>

                                        <div className="archive-details">

                                            <p>

                                                <strong>Priority:</strong>

                                                {" "}

                                                {task.priority}

                                            </p>

                                            <p>

                                                <strong>Category:</strong>

                                                {" "}

                                                {task.category}

                                            </p>

                                            <p>

                                                <strong>Completed:</strong>

                                                {" "}

                                                {

                                                    task.completedDate ||

                                                    "Recently"

                                                }

                                            </p>

                                        </div>

                                        <div className="archive-actions">

                                            <button className="restore-btn">

                                                🔄 Restore

                                            </button>

                                            <button className="delete-forever-btn">

                                                🗑 Delete

                                            </button>

                                        </div>

                                    </div>

                                ))

                            }

                        </div>

                    )

            }

        </div>

    );

}

export default ArchivePage;