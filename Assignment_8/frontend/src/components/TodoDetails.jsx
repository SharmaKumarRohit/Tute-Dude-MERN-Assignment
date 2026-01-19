import { useState } from "react";
import { useTodo } from "../context/TodoProvider";
import { formatDistanceToNowStrict } from "date-fns/formatDistanceToNowStrict";

function TodoDetails({ _id, title, description, completed, createdAt }) {
  const { handleDelete, handleUpdate, handleToggle } = useTodo();
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editId, setEditId] = useState(null);
  const handleEdit = () => {
    setEditId(_id);
    setEditTitle(title);
    setEditDescription(description);
  };
  const handleEditSave = () => {
    if (editTitle.trim().length === 0) return;
    handleUpdate(_id, { title: editTitle, description: editDescription });
    setEditTitle("");
    setEditDescription("");
    setEditId(null);
  };
  return (
    <div className="todo_details">
      {editId && editId === _id ? (
        <div className="edit_form">
          <input
            type="text"
            placeholder="title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="description"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
          <div className="edit_btn_group">
            <button onClick={() => setEditId(null)} className="edit_btn">
              Cancel
            </button>
            <button onClick={handleEditSave} className="edit_btn">
              Save
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="todo_header">
            <input
              type="checkbox"
              className="checkbox_input"
              checked={completed}
              onChange={() => handleToggle(_id)}
            />
            <p>
              {formatDistanceToNowStrict(new Date(createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
          <h3 className={completed ? "line_through" : null}>{title}</h3>
          {description && (
            <p className={completed ? "line_through" : null}>{description}</p>
          )}
          <div className="edit_btn_group">
            <button onClick={() => handleDelete(_id)} className="edit_btn">
              Delete
            </button>
            <button onClick={handleEdit} className="edit_btn">
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoDetails;
