import Model from "./components/Model";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useState } from "react";
import { useTodo } from "./context/TodoProvider";
import SearchBar from "./components/SearchBar";

function App() {
  const [modelOpen, setModelOpen] = useState(false);
  const ModelOpen = () => setModelOpen(true);
  const ModelClose = () => setModelOpen(false);
  const { isEdit, EditClose } = useTodo();
  return (
    <>
      <div className="bg-neutral-50 min-h-dvh font-manrope pt-px">
        <div className="max-w-3xl mx-auto px-4">
          <SearchBar ModelOpen={ModelOpen} />
          {(modelOpen || isEdit) && (
            <Model ModelClose={isEdit ? EditClose : ModelClose} w="xl">
              <TodoForm ModelClose={isEdit ? EditClose : ModelClose} />
            </Model>
          )}
          <TodoList />
        </div>
      </div>
    </>
  );
}

export default App;
