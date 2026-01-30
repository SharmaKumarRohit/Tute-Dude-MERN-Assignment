import { useTodo } from "../context/TodoProvider";
import Todo from "./Todo";
import { IconLoader2 } from "@tabler/icons-react";

function TodoList() {
  const {
    state: { todos, loading, error },
  } = useTodo();
  if (error) {
    return (
      <div className="py-10 text-center">
        <p className="font-semibold text-xl text-neutral-800">{error}</p>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="py-10 flex justify-center">
        <IconLoader2 size={45} className="text-neutral-800 animate-spin" />
      </div>
    );
  }
  return (
    <>
      {todos &&
        (todos.length === 0 ? (
          <div className="py-10 text-center">
            <p className="font-semibold text-xl text-neutral-800">
              No todo found!
            </p>
          </div>
        ) : (
          <div className="py-10 flex flex-col gap-5">
            {todos.map((todo) => (
              <Todo key={todo._id} {...todo} />
            ))}
          </div>
        ))}
    </>
  );
}

export default TodoList;
