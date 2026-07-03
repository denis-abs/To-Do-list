import "../styles/components/ProjectItem.css";

const ProjectItem = (props) => {
    
    const {
        id,
        name = "",
        color = "#000000",
        canDelete = true,
        selected = false,
        onClick,
        onDelete,
        nOpenProjectDialogDelete
    } = props;

    return (
        <button
            className={`project-item ${selected ? "active" : ""}`}
            onClick={() => onClick(id)}
        >
            <span
                className="project-dot"
                style={{ backgroundColor: color }}
            ></span>

            <span className="project-name">
                {name}
            </span>
            {canDelete && (
                <span
                    className="delete-project-button"
                    onClick={(event) => {
                        event.stopPropagation();
                        onDelete(id);
                        nOpenProjectDialogDelete();
                    }}
                >
                    🗑️
                </span>
            )}
        </button>
    );
};

export default ProjectItem;