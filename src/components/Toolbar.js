function Toolbar({

    search,
    setSearch,

    sortBy,
    setSortBy,

    filter,
    setFilter

}) {

    return (

        <div className="toolbar-card">

            <div className="search-box">

                <span>🔍</span>

                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
            >

                <option value="none">
                    Sort By
                </option>

                <option value="priority">
                    Priority
                </option>

                <option value="dueDate">
                    Due Date
                </option>

            </select>

            <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            >

                <option value="all">
                    All Tasks
                </option>

                <option value="completed">
                    Completed
                </option>

                <option value="pending">
                    Pending
                </option>

                <option value="high">
                    High Priority
                </option>

                <option value="study">
                    Study
                </option>

                <option value="work">
                    Work
                </option>

                <option value="fitness">
                    Fitness
                </option>

                <option value="personal">
                    Personal
                </option>

            </select>

        </div>

    );

}

export default Toolbar;