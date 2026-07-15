import { FaBell, FaSearch, FaMoon } from "react-icons/fa";

function Navbar() {

    const username = localStorage.getItem("username");

    return (

        <div className="navbar">

            <div className="navbar-search">

                <FaSearch className="search-icon" />

                <input
                    type="text"
                    placeholder="Search tasks..."
                />

            </div>

            <div className="navbar-right">

                <button className="icon-btn">

                    <FaMoon />

                </button>

                <button className="icon-btn">

                    <FaBell />

                </button>

                <div className="profile-chip">

                    👤 {username}

                </div>

            </div>

        </div>

    );

}

export default Navbar;