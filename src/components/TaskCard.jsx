
import "../styles/components/TaskCard.css";

const TaskCard = (props) => {
    const {
        id,
        title = "",
        project = "",
        date = "",
        completed = false,
        onToggleTask,
        onEditTask,
        onDeleteTask,
    } = props;

    return (
        <article className={`task-card ${completed ? "completed" : ""}`}>
            <input
                className="checkbox"
                type="checkbox"
                checked={completed}
                onChange={() => onToggleTask(id)}
            />

            <div className="task-info">
                <h3 className="task-title">
                    {title}
                </h3>

                <p className="task-project">
                    Проект: {project}
                </p>

                <p className="task-date">
                    Дата: {date}
                </p>
            </div>

            <div className="task-actions">
                <button className="edit-button" onClick={() => onEditTask(id)}>
                    ✏️
                </button>

                <button className="delete-button" onClick={()=>onDeleteTask(id)}>
                    🗑️
                </button>
            </div>
        </article>
    );
};

export default TaskCard;