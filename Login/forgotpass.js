email = ""
answer = ""
newPassword = ""


function handleEmail(event) { // changes the value of email 
    console.log(event.target.value)
    email = event.target.value;
}
function handleAnswer(event) { //changes the value of password
    console.log(event.target.value)
    answer = event.target.value;
}

function handlePass(event) { 
    console.log(event.target.value)
    newPassword = event.target.value;
}

async function postJSON(data) {
    try {
        const response = await fetch("http://localhost:8000/api/v1/auth/forgot-password", {
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
            window.location.href = "./login.html"
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
    console.log("pass: ", newPassword);
    data = {email: email, answer:answer,newPassword: newPassword}
    postJSON(data);
}

document.getElementById("inputEmail").addEventListener("change", handleEmail);
document.getElementById("inputNickname").addEventListener("change", handleAnswer );
document.getElementById("inputPassword").addEventListener("change", handlePass);

document.getElementById("mainForm").addEventListener("submit", handleSubmission);