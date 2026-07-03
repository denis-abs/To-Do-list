import "../styles/components/CreateTaskDialog.css";

const CreateTaskDialog = (props) => {
    const {
        dialogRef,

        projects,

        taskTitle,
        taskDate,
        taskProject,

        onTaskTitle,
        onTaskDate,
        onTaskProject,

        onCloseTaskDialog,

        editingTask,

        onCreateTask,
        onSaveTask,
    } = props;

    const handleProjectChange = (event) => {
        const value = event.target.value;

        onTaskProject(value === "" ? null : Number(value));
    };
 
    return (
        <dialog className="dialog" ref={dialogRef}>
            <div className="dialog-header">
                <h2>
                    {editingTask ? "Редактировать задачу" : "Создать задачу"}
                </h2>
            </div>

            <div className="dialog-body">
                <div className="dialog-group">
                    <label className="dialog-label">
                        Название задачи
                    </label>

                    <input
                        className="dialog-input"
                        type="text"
                        placeholder="Введите название задачи"

                        value={taskTitle}
                        onChange={(event) => onTaskTitle(event.target.value)}
                    />
                </div>

                <div className="dialog-group">
                    <label className="dialog-label">
                        Проект
                    </label>
                    
                    <select
                        className="dialog-select"
                        value={taskProject ?? ""}
                        onChange={handleProjectChange}
                    >
                        <option value="">Без проекта</option>

                        {projects
                            .filter(project => project.id !== null)
                            .map(project => (
                                <option
                                    key={project.id}
                                    value={project.id}
                                >
                                    {project.name}
                                </option>
                        ))}
                    </select>
                </div>

                <div className="dialog-group">
                    <label className="dialog-label">
                        Дата выполнения
                    </label>

                    <input
                        className="dialog-input"
                        type="date"

                        value={taskDate}
                        onChange={(event)=>onTaskDate(event.target.value)}
                    />
                </div>

            </div>

            <div className="dialog-footer">
               <button
                    type="button"
                    className="cancel-button"
                    onClick={onCloseTaskDialog}
                >
                    Отмена
                </button>

                <button
                    type="button"
                    className="create-button"
                    onClick={editingTask ? onSaveTask : onCreateTask}
                >
                    {editingTask ? "Сохранить" : "Создать"}
                </button>
            </div>

        </dialog>
    );
};

export default CreateTaskDialog;