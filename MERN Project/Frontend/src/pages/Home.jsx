import { useState, useEffect } from "react";
import { BASE_URI } from "../constant";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkout } from "../context/WorkoutProvider";

function Home() {
  // const [workouts, setWorkouts] = useState(null);
  const {
    state: { workouts },
    dispatch,
  } = useWorkout();
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(null);
  useEffect(() => {
    setIsError(null);
    async function fetchWorkouts() {
      try {
        const response = await fetch(`${BASE_URI}/workouts`);
        if (!response.ok) {
          throw new Error("Failed workouts to fetch.");
        }
        const data = await response.json();
        // setWorkouts(data);
        dispatch({ type: "SET_WORKOUT", payload: data });
      } catch (error) {
        setIsError(error.message || "Something Went Wrong!");
      } finally {
        setIsPending(false);
      }
    }
    fetchWorkouts();
  }, []);
  if (isPending) {
    return <h1 className="font-semibold text-xl text-center">Loading . . .</h1>;
  }
  if (isError) {
    return (
      <h1 className="font-semibold text-xl text-center text-error">
        {isError}
      </h1>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
      <div className="md:col-span-2 flex flex-col gap-5">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} {...workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
}

export default Home;
