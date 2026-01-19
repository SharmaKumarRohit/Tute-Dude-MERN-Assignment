import { createContext, useContext, useReducer } from "react";
import { BASE_URI } from "../constant";
import axios from "axios";

const TodosContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "SET_TODOS":
      return { todos: action.payload };
    case "ADD_TODO":
      return { todos: [action.payload, ...state.todos] };
    case "TOGGLE_TODO":
      return {
        todos: state.todos.map((todo) =>
          todo._id === action.payload._id ? action.payload : todo,
        ),
      };
    case "DELETE_TODO":
      return {
        todos: state.todos.filter((todo) => todo._id !== action.payload._id),
      };
    case "UPDATE_TODO":
      return {
        todos: state.todos.map((todo) =>
          todo._id === action.payload._id
            ? { ...todo, ...action.payload }
            : todo,
        ),
      };
    default:
      return state;
  }
}

function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { todos: [] });
  const handleDelete = async (id) => {
    try {
      const todo = await axios.delete(`${BASE_URI}/todos/${id}`);
      dispatch({ type: "DELETE_TODO", payload: todo.data });
    } catch (error) {
      console.dir(error);
    }
  };
  const handleUpdate = async (id, data) => {
    try {
      const todo = await axios.patch(`${BASE_URI}/todos/${id}`, data);
      dispatch({ type: "UPDATE_TODO", payload: todo.data });
    } catch (error) {
      console.dir(error);
    }
  };
  const handleToggle = async (id) => {
    try {
      const todo = await axios.patch(`${BASE_URI}/todos/toggle/${id}`);
      dispatch({ type: "TOGGLE_TODO", payload: todo.data });
    } catch (error) {
      console.dir(error);
    }
  };
  return (
    <TodosContext.Provider
      value={{ state, dispatch, handleDelete, handleUpdate, handleToggle }}
    >
      {children}
    </TodosContext.Provider>
  );
}

export function useTodo() {
  return useContext(TodosContext);
}

export default TodoProvider;
