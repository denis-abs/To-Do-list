import ProjectItem from "./ProjectItem";

import "../styles/components/Sidebar.css";

const Sidebar = (props) => {

    const {
        projects = [],
        selectedProject = null,
        onSelectProject,
        onDelete,
        onOpenProjectDialog,
        nOpenProjectDialogDelete
    } = props;

    return (
        <aside className="sidebar">

            <h1 className="logo">
                Дневник задач
            </h1>

            <h2 className="projects-title">
                Проекты
            </h2>

            <div className="sidebar-content">

                <ProjectItem
                    id={null}
                    name="Все задачи"
                    color="#3B82F6"
                    selected={selectedProject === null}
                    canDelete={false}
                    onClick={onSelectProject}
                    onDelete={() => {}}
                />

                <div className="projects-divider"></div>

                <div className="projects-list">

                    {projects.map((project) => (

                        <ProjectItem
                            key={project.id}
                            id={project.id}
                            name={project.name}
                            color={project.color}
                            selected={selectedProject === project.id}
                            canDelete={project.id !== null}
                            onClick={onSelectProject}
                            onDelete={onDelete}
                            nOpenProjectDialogDelete={nOpenProjectDialogDelete}
                        />

                    ))}

                </div>

            </div>

            <button className="add-project-button" onClick={onOpenProjectDialog}>
                + Добавить проект
            </button>

        </aside>
    );
};

export default Sidebar;
