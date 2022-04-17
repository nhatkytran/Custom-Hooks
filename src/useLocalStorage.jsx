import { useEffect, useState } from "react";

function getState(key, initialState) {
  const state = JSON.parse(localStorage.getItem(key));

  if (state) return state;
  if (initialState instanceof Function) return initialState();
  return initialState;
}

function useLocalStorage(key, initialState) {
  const [state, setState] = useState(getState.bind(null, key, initialState));

  useEffect(() => {
    localStorage.setItem("count", JSON.stringify(state));
  }, [state]);

  return [state, setState];
}

export default useLocalStorage;
