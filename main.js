// Constants for local storage keys and URLs
const USER_STATE_KEY = "userState";
const ACCESS_TOKEN_KEY = "accessToken";
const SIGNUP_PAGE_URL = "signup.html";
const PROFILE_PAGE_URL = "profile.html";

// Utility function to generate random 16-byte access token
function generateAccessToken() {
	const array = new Uint8Array(16);
	window.crypto.getRandomValues(array);
	return Array.from(array, (byte) => ('0' + byte.toString(16)).slice(-2)).join('');
}

// Function to handle signup button click
function handleSignup() {
	const name = document.getElementById("name").value.trim();
	const email = document.getElementById("email").value.trim();
	const password = document.getElementById("password").value.trim();

	if (!name || !email || !password) {
		// Show error message if any field is empty
		document.getElementById("signup-error").style.display = "block";
		return;
	}

	// Save user state to local storage
	const accessToken = generateAccessToken();
	const userState = {
		name,
		email,
		password,
		accessToken
	};
	localStorage.setItem(USER_STATE_KEY, JSON.stringify(userState));

	// Show success message and redirect to profile page
	document.getElementById("signup-success").style.display = "block";
	setTimeout(() => {
		window.location.href = PROFILE_PAGE_URL;
	}, 3000);
}

// Function to handle logout button click
function handleLogout() {
	// Clear user state from local storage
	localStorage.removeItem(USER_STATE_KEY);
	localStorage.removeItem(ACCESS_TOKEN_KEY);

	// Redirect to signup page
	window.location.href = SIGNUP_PAGE_URL;
}

// Function to check if user is logged in
function isLoggedIn() {
	const userState = localStorage.getItem(USER_STATE_KEY);
	return user
