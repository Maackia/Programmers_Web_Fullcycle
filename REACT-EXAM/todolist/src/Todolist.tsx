import { useState } from "react";
import { Button } from "react-bootstrap";
import TodoModal from "./TodoModal";

type Todo = {
    id: number;
    text: string;
    isChecked: boolean;
};

const TodoList: React.FC = () => {
    const title: string = "오늘 할 일";

    // 구조분해할당
    const [todos, setTodos] = useState<Todo[]>([
        { id: 1, text: "공부하기", isChecked: false },
        { id: 2, text: "먹기", isChecked: false },
        { id: 3, text: "마시기", isChecked: false },
    ]);

    const [newTodo, setNewTodo] = useState<string>("");

    const [showDetail, setShowDetail] = useState<boolean>(false);
    const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

    const handleCheckedChange = (itemId: number) => {
        setTodos((prevItems) =>
            prevItems.map((item) => (item.id === itemId ? { ...item, isChecked: !item.isChecked } : item))
        );
    };

    const addTodo = () => {
        if (newTodo.trim() !== "") {
            setTodos([...todos, { id: Date.now(), text: newTodo, isChecked: false }]);
            setNewTodo("");
        }
    };

    const removeTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const handleTodoClick = (todo: Todo) => {
        setShowDetail(true);
        setSelectedTodo(todo);
    };

    const handleColseDetail = () => {
        setShowDetail(false);
        setSelectedTodo(null);
    };

    return (
        <div>
            <h1>{title}</h1>
            <p></p>
            <div style={{ margin: "10px" }}>
                <input
                    type="test"
                    placeholder="할 일 입력"
                    style={{ writingMode: "horizontal-tb" }}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <Button variant="warning" onClick={addTodo}>
                    추가
                </Button>
            </div>
            <p></p>
            <div className="board">
                <ul>
                    {todos.map((todo, index) => (
                        <li key={index}>
                            <input
                                type="checkbox"
                                onChange={() => {
                                    handleCheckedChange(todo.id);
                                }}
                            />
                            <span
                                onClick={() => {
                                    handleTodoClick(todo);
                                }}
                            >
                                {todo.isChecked ? <del>{todo.text}</del> : <span>{todo.text}</span>}
                            </span>
                            <button onClick={() => removeTodo(todo.id)} className="delbutton">
                                삭제
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <TodoModal show={showDetail} todo={selectedTodo} handleClose={handleColseDetail}></TodoModal>
        </div>
    );
};

export default TodoList;
