import { IconX, IconLoader2 } from "@tabler/icons-react";
import { useTodo } from "../context/TodoProvider";
import { useState } from "react";
import { deleteTodo } from "../utils/todoApiRequest";

function Delete({ ModelClose, id }) {
  const { dispatch } = useTodo();
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteTodo(id);
      dispatch({ type: "DELETE_TODO", payload: { id } });
    } catch (error) {
      console.dir(error);
    } finally {
      setIsLoading(false);
      ModelClose();
    }
  };
  return (
    <>
      <div className="flex flex-col p-4 rounded-2xl bg-white font-manrope border border-neutral-300 shadow-sm shadow-neutral-300">
        <div className="flex items-center justify-between mb-1.5">
          <h2 className="text-base leading-0 font-bold text-neutral-800 font-manrope">
            Delete Task
          </h2>
          <button
            className="text-neutral-800 hover:bg-neutral-100 font-medium p-1 rounded-md"
            onClick={ModelClose}
          >
            <IconX size={16} stroke={2.5} />
          </button>
        </div>
        <p className="text-sm text-neutral-500 font-medium mb-4">
          Are you sure you want to delete this tasks?
        </p>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="px-3 py-2 rounded-lg text-sm font-semibold border border-neutral-200 bg-neutral-100 cursor-pointer hover:scale-103 transition-transform"
            onClick={ModelClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-3 py-2 rounded-lg text-sm font-semibold bg-neutral-800 text-white cursor-pointer hover:scale-103 transition-transform disabled:opacity-85 disabled:cursor-not-allowed"
            disabled={isLoading}
            onClick={handleDelete}
          >
            {isLoading ? (
              <IconLoader2 size={19} className="animate-spin" />
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default Delete;
