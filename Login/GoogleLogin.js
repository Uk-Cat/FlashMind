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
        // Redirect to main page only after localStorage is set
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 200);
    } else {
        // Do not redirect if Supabase save fails
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