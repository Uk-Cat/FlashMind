async function handleCredentialResponse(response) {
    console.log("JWT Token: " + response.credential);
    
    const userObject = parseJwt(response.credential);
    console.log("User data:", userObject);
    
    // Prepare user data for Supabase
    const userData = {
        email: userObject.email,
        name: userObject.name,
        Google_Login: userObject.sub
    };
    
    // Save to Supabase using the flexible function
    const result = await saveUserToSupabase(userData);
    
    if (result.success) {
        alert("Logged in!\nName: " + userObject.name + "\nEmail: " + userObject.email);
        document.getElementById("Title").innerHTML = "Welcome, " + userObject.name + "!";
    } else {
        alert("Login successful but couldn't save to database");
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