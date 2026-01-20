import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URI } from "../constant";
import FormTodo from "../components/FormTodo";
import { useTodo } from "../context/TodoProvider";
import Todos from "../components/Todos";

function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [isError, setIsError] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const { dispatch } = useTodo();
  useEffect(() => {
    setIsError(null);
    async function fetchTodos() {
      try {
        const todos = await axios.get(
          `${BASE_URI}/todos?search=${searchInput}`,
        );
        dispatch({ type: "SET_TODOS", payload: todos.data });
      } catch (error) {
        console.dir(error);
        setIsError(error.response.data.error || "Failed to fetch todo data.");
      } finally {
        setIsPending(false);
      }
    }
    const timeId = setTimeout(() => {
      fetchTodos();
    }, 500);

    return () => clearTimeout(timeId);
  }, [searchInput]);
  return (
    <div className="todo_main">
      <div>
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="search_input"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="todos">
          {isPending ? (
            <h1 className="pending">Loading...</h1>
          ) : (
            <>
              <Todos isError={isError} />
            </>
          )}
        </div>
      </div>
      <FormTodo />
    </div>
  );
}

export default Home;
