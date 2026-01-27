import { Search } from "lucide-react";
import { useTodo } from "../context/TodoProvider";

function SearchBar({ ModelOpen }) {
  const { search, setSearch } = useTodo();
  return (
    <>
      <div className="group relative mt-10 flex max-sm:flex-col gap-3 font-manrope">
        <input
          type="text"
          placeholder="Search task..."
          className="border border-neutral-200 bg-white rounded-lg focus:outline-none pl-10 py-3 pr-3 flex-1 focus:ring-1 focus:ring-neutral-800 font-medium placeholder:text-neutral-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search
          size={20}
          className="absolute top-3.5 left-3 text-neutral-400 font-medium group-focus-within:text-neutral-800"
        />
        <button
          className="btn px-6 py-3 bg-neutral-800 text-white tracking-wide max-sm:w-full"
          onClick={ModelOpen}
        >
          Create
        </button>
      </div>
    </>
  );
}

export default SearchBar;
