function StatsCards({

    total,

    completed,

    pending,

    highPriority,

    dueToday

}) {

    return (

        <div className="stats">

            <div className="stat-card">

                <h3>📋 Total</h3>

                <p>{total}</p>

            </div>

            <div className="stat-card">

                <h3>✅ Completed</h3>

                <p>{completed}</p>

            </div>

            <div className="stat-card">

                <h3>⏳ Pending</h3>

                <p>{pending}</p>

            </div>

            <div className="stat-card">

                <h3>🔥 High Priority</h3>

                <p>{highPriority}</p>

            </div>

            <div className="stat-card">

                <h3>📅 Due Today</h3>

                <p>{dueToday}</p>

            </div>

        </div>

    );

}

export default StatsCards;