import { useState } from "react";
import { useTodo } from "../context/TodoProvider";
import Model from "./Model";
import Delete from "./Delete";
import { Circle, SquarePen, Trash, CircleCheck } from "lucide-react";

function Todo({ _id, title, description, completed }) {
  const { handleToggle, EditStart, setEditTask } = useTodo();
  const [deleteModel, setDeleteModel] = useState(false);
  const ModelClose = () => setDeleteModel(false);
  const ModelOpen = () => setDeleteModel(true);
  const startEditingTask = () => {
    setEditTask({ id: _id, updateData: { title, description } });
    EditStart();
  };
  return (
    <>
      {deleteModel && (
        <Model ModelClose={ModelClose} w="md">
          <Delete ModelClose={ModelClose} id={_id} />
        </Model>
      )}
      <div className="bg-white mb-4 border border-neutral-200 text-neutral-800 font-manrope p-4 rounded-lg flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            className={completed ? "text-neutral-800" : "text-neutral-400"}
            onClick={() => handleToggle(_id)}
          >
            {completed ? <CircleCheck /> : <Circle />}
          </button>
          <div>
            <h3
              className={`text-lg font-bold line-clamp-1 ${completed && "line-through"}`}
            >
              {title}
            </h3>
            {description && (
              <p
                className={`text-sm font-medium text-neutral-500 line-clamp-2 ${completed && "line-through"}`}
              >
                {description}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 text-neutral-400">
          <button
            className="hover:text-neutral-800 transition-colors cursor-pointer"
            onClick={startEditingTask}
          >
            <SquarePen />
          </button>
          <button
            className="hover:text-neutral-800 transition-colors cursor-pointer"
            onClick={ModelOpen}
          >
            <Trash />
          </button>
        </div>
      </div>
    </>
  );
}

export default Todo;
