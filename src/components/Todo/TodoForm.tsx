import { FC } from "react";

interface TodoFormProps {
    task: string;
    setTask: React.Dispatch<React.SetStateAction<string>>;
    handleTask: (e: React.FormEvent) => void;
}

const TodoForm: FC<TodoFormProps> = ({ task, setTask, handleTask }) => {
    return (
        <div className="todo-form-container">
            <form className="todo-form" onSubmit={handleTask}>
                <input
                    type="text"
                    className="todo-input"
                    placeholder="Введите задачу..."
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <button type="submit" className="todo-submit">Добавить</button>
            </form>
        </div>
    );
};

export default TodoForm;
