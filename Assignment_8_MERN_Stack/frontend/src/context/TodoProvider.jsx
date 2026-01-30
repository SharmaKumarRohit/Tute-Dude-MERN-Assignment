import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { getTodos } from "../utils/todoApiRequest";

const TodoContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "SET_TODOS":
      return { ...state, todos: action.payload, loading: false };
    case "SHOW_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "SHOW_LOADING":
      return { ...state, loading: true, error: null };
    case "ADD_TODO":
      return { ...state, todos: [action.payload, ...state.todos], error: null };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo._id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== action.payload.id),
      };
    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo._id === action.payload.id
            ? { ...todo, ...action.payload.updateData }
            : todo,
        ),
      };
    default:
      return state;
  }
}

const initialState = { todos: [], loading: true, error: null };

function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [search, setSearch] = useState("");
  const [editTask, setEditTask] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const EditStart = () => setIsEdit(true);
  const EditClose = () => {
    setEditTask(null);
    setIsEdit(false);
  };
  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: "SHOW_LOADING" });
      try {
        const todos = await getTodos(search);
        dispatch({ type: "SET_TODOS", payload: todos.data });
      } catch (error) {
        const errorMsg =
          error?.response?.data?.error ||
          error.message ||
          "Failed to fetch todo.";
        dispatch({ type: "SHOW_ERROR", payload: errorMsg });
      }
    };

    const intervalId = setTimeout(() => {
      fetchTodos();
    }, 300);

    return () => clearInterval(intervalId);
  }, [search]);
  return (
    <TodoContext.Provider
      value={{
        state,
        dispatch,
        isEdit,
        EditStart,
        EditClose,
        editTask,
        setEditTask,
        search,
        setSearch,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  return useContext(TodoContext);
}

export default TodoProvider;
