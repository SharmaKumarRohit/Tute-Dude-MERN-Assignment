import { useState } from "react";
import { useTodo } from "../context/TodoProvider";
import Model from "./Model";
import Delete from "./Delete";
import {
  IconCircle,
  IconCircleCheckFilled,
  IconLoader2,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import { toggleTodo } from "../utils/todoApiRequest";
import { AnimatePresence } from "motion/react";

function Todo({ _id, title, description, completed }) {
  const { dispatch, EditStart, setEditTask } = useTodo();
  const [deleteModel, setDeleteModel] = useState(false);
  const ModelClose = () => setDeleteModel(false);
  const ModelOpen = () => setDeleteModel(true);
  const startEditingTask = () => {
    setEditTask({ id: _id, updateData: { title, description } });
    EditStart();
  };
  const [isLoading, setIsLoading] = useState(false);
  const handleToggle = async (id) => {
    setIsLoading(true);
    try {
      await toggleTodo(id);
      dispatch({ type: "TOGGLE_TODO", payload: { id } });
    } catch (error) {
      console.dir(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <AnimatePresence mode="wait">
        {deleteModel && (
          <Model ModelClose={ModelClose} w="md">
            <Delete ModelClose={ModelClose} id={_id} />
          </Model>
        )}
      </AnimatePresence>
      <div className="bg-white border border-neutral-200 text-neutral-800 font-manrope p-4 rounded-lg flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            className={completed ? "text-neutral-800" : "text-neutral-400"}
            onClick={() => handleToggle(_id)}
          >
            {isLoading ? (
              <IconLoader2 size={25} className="animate-spin" />
            ) : completed ? (
              <IconCircleCheckFilled size={25} />
            ) : (
              <IconCircle size={25} />
            )}
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
            <IconEdit size={28} />
          </button>
          <button
            className="hover:text-neutral-800 transition-colors cursor-pointer"
            onClick={ModelOpen}
          >
            <IconTrash size={25} />
          </button>
        </div>
      </div>
    </>
  );
}

export default Todo;
