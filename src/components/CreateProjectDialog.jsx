import "../styles/components/CreateProjectDialog.css";

const CreateProjectDialog = (props) => {
    const {
        dialogRef,
        projectColor,
        onProjectColor,
        onCloseProjectDialog,
        projectName,
        onProjectName,
        onUpdateProject
    } = props;
    return (
        <dialog className="dialog" ref={dialogRef}>
            <div className="dialog-header">
                <h2>Создать проект</h2>
            </div>

            <div className="dialog-body">
                <label className="dialog-label">
                    Название проекта
                </label>

                <input
                    className="dialog-input"
                    type="text"
                    placeholder="Введите название..."

                    value={projectName}
                    onChange={(event) => {onProjectName(event.target.value)}}
                />

                <label className="dialog-label">
                    Цвет проекта
                </label>

                <div className="color-picker">
                    <button
                        className={`color-button ${projectColor === "#3B82F6" ? "active" : ""}`}
                        style={{ background: "#3B82F6" }}
                        onClick={() => onProjectColor("#3B82F6")}
                    />

                    <button
                        className={`color-button ${projectColor === "#10B981" ? "active" : ""}`}
                        style={{ background: "#10B981" }}
                        onClick={() => onProjectColor("#10B981")}
                    />

                    <button
                        className={`color-button ${projectColor === "#F59E0B" ? "active" : ""}`}
                        style={{ background: "#F59E0B" }}
                        onClick={() => onProjectColor("#F59E0B")}
                    />

                    <button
                        className={`color-button ${projectColor === "#EF4444" ? "active" : ""}`}
                        style={{ background: "#EF4444" }}
                        onClick={() => onProjectColor("#EF4444")}
                    />

                    <button
                        className={`color-button ${projectColor === "#8B5CF6" ? "active" : ""}`}
                        style={{ background: "#8B5CF6" }}
                        onClick={() => onProjectColor("#8B5CF6")}
                    />
                </div>
            </div>

            <div className="dialog-footer">
                <button className="cancel-button" onClick={onCloseProjectDialog}>
                    Отмена
                </button>

                <button className="create-button" onClick={onUpdateProject}>
                    Создать
                </button>
            </div>
        </dialog>
    );
};

export default CreateProjectDialog;