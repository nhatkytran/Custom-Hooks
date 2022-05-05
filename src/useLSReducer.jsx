import { useEffect, useReducer } from "react";

// Why 'runtime' variable === 2 => return?
// When state changes => it will cause re-render and useLSReducer runs => getLSReducer runs
// Set runtime variable to prevent getLSReducer from running again and again
// Why set runtime to 2 instead of 1 => To make sure useLSReducer works fine even with React.StrictMode or not

const debounce = function (fn) {
  let runtime = 0;

  return (...args) => {
    if (runtime === 2) return;
    runtime++;

    return fn(...args);
  };
};

const getLSReducer = debounce((key, initState) => {
  const data = JSON.parse(localStorage.getItem(key));

  if (data) return data;
  if (typeof initState === "function") return initState();
  return initState;
});

function useLSReducer(key, reducer, initState) {
  const [state, dispatch] = useReducer(reducer, getLSReducer(key, initState));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, dispatch];
}

export default useLSReducer;
