import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import TaskList from "./TaskList";

import "../styles/components/TaskPanel.css";

const TaskPanel = (props) => {

    const {
        tasks = [],
        projects = [],
        onSearchText,
        onDateTask,
        onStatusFilter,
        onToggleTask,
        searchText = '',
        dateTask = '',
        statusFilter = 'all',
        onCreateTask,
        onEditTask,
        onDeleteTask,
    } = props;

    return (
        <main className="task-panel">
            <div className="task-panel-header">
                <h1>
                    Список задач
                </h1>
                <button className="create-task-button" onClick={onCreateTask}>
                    + Создать задачу
                </button>
            </div>

            <div className="task-toolbar">
                <SearchBar
                    searchText={searchText}
                    onSearchText={onSearchText} 
                />
                
                <FilterBar 
                    dateTask={dateTask}
                    statusFilter={statusFilter}
                    onDateTask={onDateTask}
                    onStatusFilter={onStatusFilter}
                />
            </div>

            <TaskList
                tasks={tasks}
                projects={projects}
                onToggleTask={onToggleTask}

                onEditTask={onEditTask}
                onDeleteTask={onDeleteTask}
            />
        </main>
    );
};

export default TaskPanel;