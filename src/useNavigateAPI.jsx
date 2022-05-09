import { useNavigate } from "react-router-dom";

// Introduction
// "useNavigateWithAPI is a custom hook
//helps state fetching API programmatically
//when you navigate to another page and throw
//back an error if there is something wrong

async function fetchAPI(url) {
  try {
    const res = await fetch(url);

    if (!res.ok) throw new Error("Something went wrong!");

    return await res.json();
  } catch (error) {
    throw error;
  }
}

function useNavigateWithAPI(url) {
  const navigate = useNavigate();

  return async function (path) {
    let data;

    navigate(path);

    try {
      data = await fetchAPI(url);
    } catch (error) {
      throw error;
    }

    return data;
  };
}

export default useNavigateWithAPI;

// Demo: Using useNavigateWithAPI in App,jsx

// Flow
// 1. Run "useNavigateWithAPI" with "url argument" return a function (call "navigateWithAPI" function)
// 2. Create async function "handleNavigateWithAPI" and button in App.jsx
// 3. Click the button in App.jsx => run "handleNavigateWithAPI" => run "navigateWithAPI" (use try and catch to handle data and error)
// 4. setData to state
