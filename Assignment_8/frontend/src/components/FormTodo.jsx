import { useState } from "react";
import axios from "axios";
import { BASE_URI } from "../constant";
import { useTodo } from "../context/TodoProvider";

function FormTodo() {
  const { dispatch } = useTodo();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isError, setIsError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(null);
    const formData = { title, description: desc };
    try {
      const todo = await axios.post(`${BASE_URI}/todos`, formData);
      dispatch({ type: "ADD_TODO", payload: todo.data });
      setTitle("");
      setDesc("");
    } catch (error) {
      setIsError(error.response.data);
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
          <label htmlFor="desc">Description</label>
          <input
            type="text"
            id="desc"
            placeholder="description (optional)"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <button type="submit" className="form_btn">
          Add Todo
        </button>
      </form>
      {isError && <div className="error">{isError.error}</div>}
    </div>
  );
}

export default FormTodo;
