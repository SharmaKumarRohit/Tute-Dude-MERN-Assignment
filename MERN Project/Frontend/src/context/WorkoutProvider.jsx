import { createContext, useContext, useReducer } from "react";
import { BASE_URI } from "../constant";

const WorkoutContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "SET_WORKOUT":
      return { workouts: action.payload };
    case "CREATE_WORKOUT":
      return { workouts: [action.payload, ...state.workouts] };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter(
          (workout) => workout._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
}

function WorkoutProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { workouts: null });
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${BASE_URI}/workouts/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed workout to delete.");
      }
      const data = await response.json();
      dispatch({ type: "DELETE_WORKOUT", payload: data });
    } catch (error) {}
  };
  return (
    <WorkoutContext.Provider value={{ state, dispatch, handleDelete }}>
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  return useContext(WorkoutContext);
}

export default WorkoutProvider;
