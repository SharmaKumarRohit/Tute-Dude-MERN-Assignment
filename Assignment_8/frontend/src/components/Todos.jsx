import TodoDetails from "../components/TodoDetails";
import { useTodo } from "../context/TodoProvider";

function Todos({ isError }) {
  const {
    state: { todos },
  } = useTodo();
  if (todos.length === 0 || isError) {
    return <p className="no_found">{isError || "No todo found!"}</p>;
  }
  return (
    <>
      {todos.length !== 0 &&
        todos.map((todo) => <TodoDetails key={todo._id} {...todo} />)}
    </>
  );
}

export default Todos;
