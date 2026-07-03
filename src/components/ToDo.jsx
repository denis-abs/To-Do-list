import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

import { loadData, saveData } from "../DataBase/indexedDB";
import Sidebar from "./Sidebar";
import TaskPanel from "./TaskPanel";
import CreateProjectDialog from "./CreateProjectDialog"
import CreateTaskDialog from "./CreateTaskDialog"
import ConfirmModal from "./ConfirmModal" 


import projectsData from "../DataBase/projects";
import tasksData from "../DataBase/tasks";

import "../styles/App.css";

const ToDo = () => {
    const [projects, setProjects] = useState(projectsData);
    const [tasks, setTasks] = useState(tasksData);

    const [selectedProject, setSelectedProject] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [dateTask, setDateTask] = useState('');
    const [statusFilter, setStatusfilter] = useState('all');
    const [projectColor, setProjectColor] = useState('#3B82F6');
    const [projectName, setProjectName] = useState("");
    const [projectToDelete, setProjectToDelete] = useState(null);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDate, setTaskDate] = useState("");
    const [taskProject, setTaskProject] = useState(null);
    const [selectedTask,setSelectedTask]=useState(null);
    const [editingTask,setEditingTask]=useState(null);
    const [loaded, setLoaded] = useState(false);

    const dialogCreateProjectRef = useRef(null);
    const dialogDeleteRef = useRef(null);
    const dialogTaskRef = useRef(null);
    const dialogDeleteTaskRef = useRef(null);
    

    useEffect(() => {
        const loadAppData = async () => {
            const savedProjects = await loadData("projects");
            const savedTasks = await loadData("tasks");

            if (savedProjects != null) {
                setProjects(savedProjects);
            } else {
                await saveData("projects", projectsData);
            }

            if (savedTasks != null) {
                setTasks(savedTasks);
            } else {
                await saveData("tasks", tasksData);
            }

            setLoaded(true);
        };

        loadAppData();
    }, []);

    

    useEffect(() => {
        if (!loaded) return;

        saveData("projects", projects);
    }, [projects, loaded]);

    useEffect(() => {
        if (!loaded) return;

        saveData("tasks", tasks);
    }, [tasks, loaded]);



    const handleProjectColor = (color) =>{
        setProjectColor(color);
    }

    const handleOpenProjectDialog = () => {
        dialogCreateProjectRef.current.showModal();
    };

    const handleCloseProjectDialog = () => {
        dialogCreateProjectRef.current.close();
    };

    const handleProjectName = (name) =>{
        setProjectName(name);
    }

    const updateProject = () => {
        if(projectName.trim() === '') return;

        const isExist = projects.some(
            (project) => project.name.toLowerCase() === projectName.trim().toLowerCase()
        );

        if (isExist) {
            return;
        }

        const newProject={
            id: Math.max(...projects.map((project) => project.id)) + 1,
            name: projectName,
            color: projectColor
        };
        
        setProjects([
            ...projects,
            newProject
        ]);

        setProjectName("");
        setProjectColor("#3B82F6");
        handleCloseProjectDialog();
    
    };

    const handleCloseProjectDialogDelete = () => {
        dialogDeleteRef.current.close();
    };

    const handleOpenProjectDialogDelete = () => {
        dialogDeleteRef.current.showModal();
    };

    const handleDeleteProject = (id) => {
        setProjectToDelete(id);
    };

    const handleSelectProject = (projectId) => {
        setSelectedProject(projectId);
    };

    const hendleSearchText = (title) => {
        setSearchText(title);
    };

    const hendleDateTask = (date) => {
        setDateTask(date);
    };

    const hendleStatusFilter = (completed) => {
        setStatusfilter(completed);
    };

    const handleCloseTaskDialog = () => {
        dialogTaskRef.current.close();
    };

    const handleOpenDeleteTask = (id)=>{
        setSelectedTask(id);
        dialogDeleteTaskRef.current.showModal();
    }

    const handleOpenTaskDialog = () => {
        setEditingTask(null);
        setTaskTitle("");
        setTaskDate("");
        setTaskProject(null);

        dialogTaskRef.current.showModal();
    };

    const handleCloseDeleteTaskDialog = () => {
        dialogDeleteTaskRef.current.close();
    };

    const filteredTasks = tasks.filter((task) => {
        const matchProject =
            selectedProject === null ||
            task.projectId === selectedProject;

        const matchSearch =
            task.title.toLowerCase().includes(searchText.toLowerCase());

        const matchDate =
            dateTask === "" ||
            task.date === dateTask;

        const matchStatus =
            statusFilter === "all" ||
            (statusFilter === "completed" && task.completed) ||
            (statusFilter === "active" && !task.completed);

        return matchProject && matchSearch && matchStatus && matchDate;

    });

    const handleToggleTask = (id) => {
        const updateTasks = tasks.map((task) => {
            if (task.id === id){
                return {
                    ...task,
                    completed: !task.completed
                }
            }else{
                return task;
            }
        });
        setTasks(updateTasks);
    };

    const confirmDeleteProject = () => {
        setTasks(
            tasks.filter(task => task.projectId !== projectToDelete)
        );

        setProjects(
            projects.filter(project => project.id !== projectToDelete)
        );

        if (selectedProject === projectToDelete) {
            setSelectedProject(null);
        }

        setProjectToDelete(null);

        handleCloseProjectDialogDelete();
    };

    const createTask = () => {
        if (taskTitle.trim() === "") return;
        const newTask = {
            id: Math.max(...tasks.map(t => t.id), 0) + 1,
            title: taskTitle.trim(),
            projectId: taskProject ?? null,
            date: taskDate,
            completed: false,
        };

        setTasks([...tasks, newTask]);

        setTaskTitle("");
        setTaskDate("");
        setTaskProject(null);
        setEditingTask(null);

        handleCloseTaskDialog();
    };  


    const saveTask = () => {
        setTasks((prevTasks) =>
            prevTasks.map(task =>
                task.id === editingTask.id
                    ? {
                        ...task,
                        title: taskTitle,
                        projectId: taskProject,
                        date: taskDate,
                    }
                    : task
            )
        );

        setEditingTask(null);
        setTaskTitle("");
        setTaskDate("");
        setTaskProject(null);

        handleCloseTaskDialog();
    };

    const handleEditTask=(id)=>{
        const task = tasks.find(task=>task.id===id);
        
        if (!task) return;

        setEditingTask(task);

        setTaskTitle(task.title);
        setTaskDate(task.date);
        setTaskProject(task.projectId);

        dialogTaskRef.current.showModal();
    }

    const deleteTask = () => {
        setTasks(
            tasks.filter(task => task.id !== selectedTask)
        );

        handleCloseDeleteTaskDialog();
    };
    
    return (
        <div className="app">
            
            <Sidebar
                projects={projects}
                selectedProject={selectedProject}
                onSelectProject={handleSelectProject}
                onDelete={handleDeleteProject}

                onOpenProjectDialog={handleOpenProjectDialog}
                nOpenProjectDialogDelete={handleOpenProjectDialogDelete}
            />

            <TaskPanel
                tasks={filteredTasks}
                projects={projects}
                searchText={searchText}
                dateTask={dateTask}
                statusFilter={statusFilter}
                onSearchText={hendleSearchText}
                onDateTask={hendleDateTask}
                onStatusFilter={hendleStatusFilter}
                onToggleTask={handleToggleTask}

                onCreateTask={handleOpenTaskDialog}
                onDeleteTask={handleOpenDeleteTask}
                onEditTask={handleEditTask}
            />

            <CreateProjectDialog 
                dialogRef={dialogCreateProjectRef}
                projectColor={projectColor}
                onProjectColor={handleProjectColor}
                onCloseProjectDialog={handleCloseProjectDialog}
                projectName={projectName}
                onProjectName={handleProjectName}
                onUpdateProject={updateProject}
            />

            <ConfirmModal
                dialogRef={dialogDeleteRef}
                onCloseProjectDialog={handleCloseProjectDialogDelete}
                title="Удалить проект"
                message="Вы действительно хотите удалить проект? Все задачи этого проекта будут удалены."
                onConfirm={confirmDeleteProject}
            />

            <CreateTaskDialog 
                dialogRef={dialogTaskRef}

                projects={projects}

                taskTitle={taskTitle}
                taskDate={taskDate}
                taskProject={taskProject}

                onTaskTitle={setTaskTitle}
                onTaskDate={setTaskDate}
                onTaskProject={setTaskProject}

                onCloseTaskDialog={handleCloseTaskDialog}

                editingTask={editingTask}

                onCreateTask={createTask}
                onSaveTask={saveTask}
            />

            <ConfirmModal
                dialogRef={dialogDeleteTaskRef}
                onCloseProjectDialog={handleCloseDeleteTaskDialog}
                title="Удалить задачу"
                message="Вы действительно хотите удалить задачу?"
                onConfirm={deleteTask}
            />

        </div>

    );

};

export default ToDo;