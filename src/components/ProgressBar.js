function ProgressBar({ progress }) {

    return (

        <div className="progress-section">

            <div className="progress-header">

                <span>Overall Progress</span>

                <span>{progress}%</span>

            </div>

            <div className="progress-bar">

                <div

                    className="progress-fill"

                    style={{
                        width: `${progress}%`
                    }}

                />

            </div>

        </div>

    );

}

export default ProgressBar;