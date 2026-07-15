import { useState, useEffect } from "react";

function SettingsPage() {

    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    const [desktopNotification, setDesktopNotification] = useState(
        localStorage.getItem("desktopNotification") !== "false"
    );

    const [defaultPriority, setDefaultPriority] = useState(
        localStorage.getItem("defaultPriority") || "Medium"
    );

    const [defaultCategory, setDefaultCategory] = useState(
        localStorage.getItem("defaultCategory") || "General"
    );

    useEffect(() => {

        if (darkMode) {

            document.body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");

        } else {

            document.body.classList.remove("dark-mode");
            localStorage.setItem("theme", "light");

        }

    }, [darkMode]);

    useEffect(() => {

        localStorage.setItem(
            "desktopNotification",
            desktopNotification
        );

    }, [desktopNotification]);

    useEffect(() => {

        localStorage.setItem(
            "defaultPriority",
            defaultPriority
        );

    }, [defaultPriority]);

    useEffect(() => {

        localStorage.setItem(
            "defaultCategory",
            defaultCategory
        );

    }, [defaultCategory]);

    return (

        <div className="page-content">

            <div className="page-header">

                <h1>⚙️ Settings</h1>

                <p>
                    Customize your Task Manager experience.
                </p>

            </div>

            <div className="settings-grid">

                {/* Appearance */}

                <div className="settings-card">

                    <h2>🎨 Appearance</h2>

                    <label className="switch-row">

                        <span>Dark Mode</span>

                        <input
                            type="checkbox"
                            checked={darkMode}
                            onChange={() =>
                                setDarkMode(!darkMode)
                            }
                        />

                    </label>

                </div>

                {/* Notifications */}

                <div className="settings-card">

                    <h2>🔔 Notifications</h2>

                    <label className="switch-row">

                        <span>Desktop Notifications</span>

                        <input
                            type="checkbox"
                            checked={desktopNotification}
                            onChange={() =>
                                setDesktopNotification(
                                    !desktopNotification
                                )
                            }
                        />

                    </label>

                </div>

                {/* Default Task */}

                <div className="settings-card">

                    <h2>📌 Default Task Settings</h2>

                    <p>Default Priority</p>

                    <select
                        value={defaultPriority}
                        onChange={(e) =>
                            setDefaultPriority(e.target.value)
                        }
                    >
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                    </select>

                    <p style={{ marginTop: "20px" }}>
                        Default Category
                    </p>

                    <select
                        value={defaultCategory}
                        onChange={(e) =>
                            setDefaultCategory(e.target.value)
                        }
                    >
                        <option>General</option>
                        <option>Study</option>
                        <option>Work</option>
                        <option>Fitness</option>
                        <option>Personal</option>
                        <option>Shopping</option>
                    </select>

                </div>

                {/* About */}

                <div className="settings-card">

                    <h2>ℹ️ About</h2>

                    <p><strong>Application:</strong> Task Manager</p>

                    <p><strong>Version:</strong> 1.0.0</p>

                    <p><strong>Developer:</strong> Uday Kumar</p>

                    <p style={{ marginTop: "15px" }}>
                        Manage your daily tasks, organize deadlines,
                        track productivity, and stay focused with an
                        easy-to-use task management application.
                    </p>

                </div>

            </div>

        </div>

    );

}

export default SettingsPage;