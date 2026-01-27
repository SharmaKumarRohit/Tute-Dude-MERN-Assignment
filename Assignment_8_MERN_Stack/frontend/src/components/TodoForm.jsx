import { useState } from "react";
import { addTodo, updateTodo } from "../utils/todoApi";
import { useTodo } from "../context/TodoProvider";
import { LoaderCircle, X } from "lucide-react";

function TodoForm({ ModelClose }) {
  const { dispatch, isEdit, editTask } = useTodo();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFromData] = useState({
    title: editTask?.updateData.title || "",
    description: editTask?.updateData.description || "",
  });
  const { title, description } = formData;
  const handleChange = (e) => {
    setFromData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isEdit) {
        await updateTodo(editTask.id, formData);
        dispatch({
          type: "UPDATE_TODO",
          payload: { id: editTask.id, updateData: formData },
        });
      } else {
        const todo = await addTodo(formData);
        dispatch({ type: "ADD_TODO", payload: todo.data });
      }
      setFromData({ title: "", description: "" });
    } catch (error) {
      console.dir(error);
    } finally {
      setIsLoading(false);
      ModelClose();
    }
  };
  return (
    <>
      <div className="rounded-2xl bg-white font-manrope border border-neutral-300 shadow-sm shadow-neutral-300">
        <div className="sm:px-6 px-4 py-4 flex items-center justify-between border-b border-neutral-200">
          <h2 className="text-lg font-bold text-neutral-800">
            {isEdit ? "Edit Task" : "Add New Task"}
          </h2>
          <button
            className="text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 p-1 rounded-md transition-colors"
            onClick={ModelClose}
          >
            <X size={20} />
          </button>
        </div>
        <form
          className="sm:px-6 px-4 py-5 flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <div>
            <p className="input_label">Task title</p>
            <input
              type="text"
              name="title"
              placeholder="Enter your title"
              className="form_input"
              value={title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <p className="input_label">Content</p>
            <textarea
              rows={8}
              name="description"
              placeholder="Enter your content (optional)"
              className="form_input"
              value={description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="flex justify-end gap-3 sm:gap-4">
            <button
              type="button"
              className="btn px-6 py-2.5 border border-neutral-200 bg-neutral-100"
              onClick={ModelClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn px-6 py-2.5 bg-neutral-800 text-white disabled:opacity-90 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <LoaderCircle size={20} className="animate-spin" />
              ) : isEdit ? (
                "Update"
              ) : (
                "Add"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default TodoForm;
