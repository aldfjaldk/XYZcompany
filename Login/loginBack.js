email = ""
pass = ""

if (localStorage.getItem("email")) { //if the user is already logged in redirect it to the dashboard
    console.log("already logged in as: ", localStorage.getItem("email"))
    window.location.href = "../Dashboard/dashboard.html"
}

function handleEmail(event) { // changes the value of email 
    email = event.target.value;
}
function handlePass(event) { //changes the value of password
    pass = event.target.value;
}

async function postJSON(data) {
    try {
        const response = await fetch("http://localhost:8000/api/v1/auth/login", {
            method: "POST", //since we are posting data (and not getting data)
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const result = await response.json();
        console.log("Success: ", result);
        if (result.success) {
            localStorage.setItem("email", data.email) //store the currently logged in user's email to the local storage.
            window.location.href = "../Dashboard/dashboard.html"
        }
        else {
            alert("Email-password combination not found in our database. Please re-try")
        }
    }
    catch(error) {
        console.error("Error: ", error);
    }
}

function handleSubmission(event) {
    event.preventDefault(); // to prevent refreshing the page every time you hit the submit button
    console.log("email: ", email)
    console.log("pass: ", pass);
    data = {email: email, password: pass}
    postJSON(data);
}

document.getElementById("inputEmail").addEventListener("change", handleEmail);
document.getElementById("inputPass").addEventListener("change", handlePass);
document.getElementById("mainForm").addEventListener("submit", handleSubmission);