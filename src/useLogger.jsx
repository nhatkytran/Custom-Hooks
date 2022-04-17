import { useEffect } from "react";

export function useStateLogger(name, state) {
  useEffect(() => {
    console.log(`NewState (${name}):`, state);

    return () => {
      console.log(`PrevState (${name}):`, state);
    };
  }, [name, state]);
}

export function useReducerLogger(reducer) {
  return (prevState, action) => {
    console.group(action);
    console.log("PrecState:", prevState);
    console.log("Action:", action.type);

    const newState = reducer(prevState, action);

    console.log("NewState:", newState);
    console.groupEnd();

    return newState;
  };
}
