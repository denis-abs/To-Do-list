import TaskCard from "./TaskCard";

import "../styles/components/TaskList.css";

const TaskList = (props) => {
    const {
        tasks = [],
        projects = [],
        onToggleTask,
        onEditTask,
        onDeleteTask,
    } = props;

    return (
        <section className="task-list">
            {tasks.map((task) => {
                const project = projects.find(
                    (item) => item.id === task.projectId
                );

                return (
                    <TaskCard
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        project={project?.name ?? "Без проекта"}
                        date={task.date}
                        completed={task.completed}
                        onToggleTask={onToggleTask}
                        onEditTask={onEditTask}
                        onDeleteTask={onDeleteTask}
                    />
                );
            })}
        </section>
    );
};

export default TaskList;