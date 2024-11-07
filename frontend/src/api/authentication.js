// Function to check if the user is authenticated
function authentication() {
  // Retrieve data from localStorage
  const userId = localStorage.getItem("userId");
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  const password = localStorage.getItem("password"); // If using a token

  // Verify if all necessary data exists in localStorage
  if (email && role && password) {
    // User is authenticated (based on the assumption that userId, email, and role exist)
    return userId;
  }

  return 0;
}

// Function to log the user out by clearing localStorage
function logout() {
  // Remove user-related data from localStorage
  localStorage.removeItem("userId");
  localStorage.removeItem("email");
  localStorage.removeItem("role");
  localStorage.removeItem("password"); // If using a token

  // Optionally, you could redirect the user to the login page or another page
  // window.location.href = "/login"; // Uncomment to redirect to login page

  // Return true to indicate logout was successful
  return true;
}

export { authentication, logout };
