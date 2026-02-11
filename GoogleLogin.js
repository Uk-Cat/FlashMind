async function handleCredentialResponse(response) {
    console.log("JWT Token: " + response.credential);
    
    const userObject = parseJwt(response.credential);
    console.log("User data:", userObject);
    
    // Save to Supabase
    const result = await saveUserToSupabase(userObject);
    
    if (result.success) {
        // Save user to localStorage to remember login
        localStorage.setItem('vividmind_user', JSON.stringify(userObject));
        
        alert("Logged in!\nName: " + userObject.name + "\nEmail: " + userObject.email);
        document.getElementById("Title").innerHTML = "Welcome, " + userObject.name + "!";
        
        // Hide the login button
        document.getElementById("g_id_onload").style.display = "none";
        document.querySelector(".g_id_signin").style.display = "none";
    } else {
        alert("Login successful but couldn't save to database: " + result.error.message);
    }
}

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

// Check if user is already logged in when page loads
window.onload = function() {
    const savedUser = localStorage.getItem('vividmind_user');
    
    if (savedUser) {
        const userObject = JSON.parse(savedUser);
        console.log("User already logged in:", userObject);
        
        // Update UI for logged-in user
        document.getElementById("Title").innerHTML = "Welcome back, " + userObject.name + "!";
        
        // Hide the login button
        document.getElementById("g_id_onload").style.display = "none";
        document.querySelector(".g_id_signin").style.display = "none";
    }
}

// Optional: Add a logout function
function logout() {
    localStorage.removeItem('vividmind_user');
    location.reload();
}