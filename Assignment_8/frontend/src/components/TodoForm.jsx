import { useState } from "react";
import axios from "axios";
import { BASE_URI } from "../constant";
import { useTodo } from "../context/TodoProvider";

function TodoForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isError, setIsError] = useState(null);
  const { dispatch } = useTodo();
  const [isPending, setIsPending] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    setIsError(null);
    const data = { title, description };
    try {
      const todo = await axios.post(`${BASE_URI}/todos`, data);
      dispatch({ type: "ADD_TODO", payload: todo.data });
      setTitle("");
      setDescription("");
    } catch (error) {
      setIsError(error.response.data);
    } finally {
      setIsPending(false);
    }
  };
  return (
    <div className="form_container">
      <h2>Add a New Todo</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form_group">
          <label htmlFor="title">Todo Title</label>
          <input
            type="text"
            id="title"
            placeholder="title"
            className={`${isError && isError?.emptyFields.includes("title") && "border_red"}`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form_group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            placeholder="description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="form_btn">
          {isPending ? "Adding..." : "Add Todo"}
        </button>
      </form>
      {isError && <div className="error">{isError.error}</div>}
    </div>
  );
}

export default TodoForm;
