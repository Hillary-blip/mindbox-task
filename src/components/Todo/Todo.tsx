import { FC, useState } from "react";
import TodoForm from "./TodoForm";

interface Task {
    id: number;
    todo: string;
    completed: boolean;
}

const Todo: FC = () => {
    const [task, setTask] = useState<string>('');
    const [taskList, setTaskList] = useState<Task[]>([]);
    const [filter, setFilter] = useState<string>('all');

    const handleTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (task.trim() === '') return;

        setTaskList((prevTasks) => [
            ...prevTasks,
            { id: prevTasks.length + 1, todo: task, completed: false }
        ]);
        setTask('');
    };

    const toggleCompletion = (id: number) => {
        setTaskList((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const filteredTasks = taskList.filter((task) => {
        if (filter === 'completed') return task.completed;
        if (filter === 'active') return !task.completed;
        return true;
    });

    return (
        <div className="todo-container">
            <TodoForm task={task} setTask={setTask} handleTask={handleTask} />
            <ul className="todo-list">
                {filteredTasks.map((task) => (
                    <li key={task.id} className={`todo-item ${task.completed ? 'completed' : ''}`}>
                        <span>{task.todo}</span>
                        <p onClick={() => toggleCompletion(task.id)}>❌</p>
                    </li>
                ))}
            </ul>
            <ul className="info-list">
                <li onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</li>
                <li onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>Completed</li>
                <li onClick={() => setFilter('active')} className={filter === 'active' ? 'active' : ''}>Active</li>
            </ul>
        </div>
    );
};

export default Todo;
