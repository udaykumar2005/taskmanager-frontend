import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import API from "./api";

function Register() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const register = async () => {

        if (
            username.trim() === "" ||
            password.trim() === "" ||
            confirmPassword.trim() === ""
        ) {

            toast.error("Please fill all fields");
            return;
        }

        if (password !== confirmPassword) {

            toast.error("Passwords do not match");
            return;
        }

        try {

            await axios.post(
                `${API}/auth/register`,
                {
                    username,
                    password
                }
            );

            toast.success("Registration Successful");

            setTimeout(() => {

                navigate("/");

            }, 1200);

        } catch (error) {

            toast.error("Username already exists");

            console.log(error);

        }

    };

    return (

        <div className="login-page">

            <div className="login-left">

                <h1>Task Manager</h1>

                <p>
                    Organize your work.
                    Stay productive.
                    Never miss a task.
                </p>

            </div>

            <div className="login-right">

                <div className="login-card">

                    <h2>Create Account</h2>

                    <p>
                        Register to start managing your tasks.
                    </p>

                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                        onKeyDown={(e) => {

                            if (e.key === "Enter") {

                                register();

                            }

                        }}
                    />

                    <button
                        className="login-btn"
                        onClick={register}
                    >

                        Register

                    </button>

                    <div className="register-link">

                        Already have an account?

                        <Link to="/">

                            Login

                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Register;