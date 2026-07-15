import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import API from "./api";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = async () => {

        if (!username.trim() || !password.trim()) {

            toast.error("Please enter username and password");
            return;

        }

        setLoading(true);

        try {

            const response =
                await axios.post(
                    `${API}/auth/login`,
                    {
                        username,
                        password
                    }
                );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "username",
                username
            );

            if (rememberMe) {

                localStorage.setItem(
                    "rememberMe",
                    "true"
                );

            }

            toast.success("Login Successful");

            setTimeout(() => {

                window.location.replace("/dashboard");

            }, 800);

        }

        catch (error) {

            toast.error("Invalid Username or Password");
            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="login-page">

            {/* Left Section */}

            <div className="login-left">

                <h1>
                    📝 Task Manager
                </h1>

                <h2>
                    Organize your life.<br />
                    Achieve more.
                </h2>

                <div className="feature">

                    ✅ Smart Reminders

                </div>

                <div className="feature">

                    🔁 Recurring Tasks

                </div>

                <div className="feature">

                    📊 Productivity Analytics

                </div>

                <div className="feature">

                    📅 Calendar View

                </div>

            </div>

            {/* Right Section */}

            <div className="login-right">

                <div className="login-card">

                    <h2>

                        Welcome Back 👋

                    </h2>

                    <p>

                        Login to continue

                    </p>

                    <div className="input-group">

                        <FaUser className="input-icon" />

                        <input

                            type="text"

                            placeholder="Username"

                            value={username}

                            onChange={(e) =>
                                setUsername(e.target.value)
                            }

                        />

                    </div>

                    <div className="input-group">

                        <FaLock className="input-icon" />

                        <input

                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }

                            placeholder="Password"

                            value={password}

                            onChange={(e) =>
                                setPassword(e.target.value)
                            }

                            onKeyDown={(e) => {

                                if (e.key === "Enter") {

                                    handleLogin();

                                }

                            }}

                        />

                        <span

                            className="eye"

                            onClick={() =>
                                setShowPassword(!showPassword)
                            }

                        >

                            {

                                showPassword
                                    ? <FaEyeSlash />
                                    : <FaEye />

                            }

                        </span>

                    </div>

                    <div className="login-options">

                        <label>

                            <input

                                type="checkbox"

                                checked={rememberMe}

                                onChange={(e) =>
                                    setRememberMe(
                                        e.target.checked
                                    )
                                }

                            />

                            Remember Me

                        </label>

                    </div>

                    <button

                        className="login-btn"

                        onClick={handleLogin}

                        disabled={loading}

                    >

                        {

                            loading
                                ? "Signing In..."
                                : "Sign In"

                        }

                    </button>

                    <div className="register-text">

                        Don't have an account?

                        <span

                            onClick={() =>
                                navigate("/register")
                            }

                        >

                            Create Account

                        </span>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;