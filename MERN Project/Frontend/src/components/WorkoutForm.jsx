import { useState } from "react";
import { BASE_URI } from "../constant";
import { RxCross2 } from "react-icons/rx";
import { useWorkout } from "../context/WorkoutProvider";

function WorkoutForm() {
  const { dispatch } = useWorkout();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [isError, setIsError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(null);
    setIsPending(true);
    setIsSuccess(false);
    const workout = { title, load, reps };
    try {
      const response = await fetch(`${BASE_URI}/workouts`, {
        method: "POST",
        body: JSON.stringify(workout),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (!response.ok) {
        setEmptyFields(data.emptyFields);
        throw new Error(data.error || "Failed Workout to Create");
      }
      dispatch({ type: "CREATE_WORKOUT", payload: data });
      setTitle("");
      setLoad("");
      setReps("");
      setIsSuccess(true);
      setEmptyFields([]);
    } catch (error) {
      setIsError(error.message);
    } finally {
      setIsPending(false);
    }
  };
  return (
    <>
      <div>
        <h3 className="font-bold text-lg mb-4">Add a New Workout</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="font-medium text-neutral-600">
              Excercise Title:
            </label>
            <input
              type="text"
              id="title"
              className={`focus:outline-primary border-2 ${emptyFields.includes("title") ? "border-error" : "border-gray-200"} px-3 py-2 rounded-md bg-white`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="load" className="font-medium text-neutral-600">
              Load (in Kg's):
            </label>
            <input
              type="number"
              id="load"
              className={`focus:outline-primary border-2 ${emptyFields.includes("load") ? "border-error" : "border-gray-200"} px-3 py-2 rounded-md bg-white`}
              value={load}
              onChange={(e) => setLoad(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="reps" className="font-medium text-neutral-600">
              Reps:
            </label>
            <input
              type="number"
              id="reps"
              className={`focus:outline-primary border-2 ${emptyFields.includes("reps") ? "border-error" : "border-gray-200"} px-3 py-2 rounded-md bg-white`}
              value={reps}
              onChange={(e) => setReps(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="mt-2 px-6 py-2 rounded-md bg-primary text-white font-semibold cursor-pointer hover:scale-101 transition-transform"
          >
            {isPending ? "Adding..." : "Add Workout"}
          </button>
        </form>
        {isError && (
          <div className="border border-error text-error mt-5 px-4 py-2 rounded-md bg-red-50 font-medium flex items-center justify-between">
            <p>{isError}</p>
            <RxCross2 size={20} onClick={() => setIsError(null)} />
          </div>
        )}
        {isSuccess && (
          <div className="border border-green-500 text-green-700 mt-5 px-4 py-2 rounded-md bg-green-50 font-medium flex items-center justify-between">
            <p>Workout added successfully!</p>
            <RxCross2 size={20} onClick={() => setIsSuccess(false)} />
          </div>
        )}
      </div>
    </>
  );
}

export default WorkoutForm;
