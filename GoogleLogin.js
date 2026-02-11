function handleCredentialResponse(response) {
    console.log("JWT Token: " + response.credential);
            
    const userObject = parseJwt(response.credential);
    console.log("User data:", userObject);
            
    alert("Logged in!\nName: " + userObject.name + "\nEmail: " + userObject.email);
    document.getElementById("Title").innerHTML = "Welcome, " + userObject.name + "!";
    }

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
    }