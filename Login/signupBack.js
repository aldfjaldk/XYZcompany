data = {
    name: "...",
    email: "...",
    country: "...",
    company: "....",
    job: "...",
    password: "...",
    confirm: "...",
    phone: "...",
    address: "...",
    answer: "...",
    role: "..."
}
console.log("welcome to the signup screen.")


async function postJSON(data) {
    try {
        const response = await fetch("http://localhost:8000/api/v1/auth/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const result = await response.json();
        console.log("Success: ", result);
        if (result.success) {
            localStorage.setItem("email", data.email)
            window.location.href = "../Dashboard/dashboard.html"
        }
        else {
            alert("try again");
        }
    }
    catch(error) {
        console.error("Error: ", error);
    }
}

function handleSubmission (event) {
    event.preventDefault();
    console.log("This is the data collectec: ", data);
    postJSON(data)
}

function handleName(event) {data.name = event.target.value;}
function handleEmail(event) {data.email = event.target.value;}
function handleCountry(event) {data.country = event.target.value;}
function handleCompany(event) {data.company = event.target.value;}
function handleJob(event) {data.job = event.target.value;}
function handleRole(event) {data.role = event.target.value;}
function handlePassword(event) {data.password = event.target.value;}
function handleConfirm(event) {data.confirm = event.target.value;}

document.getElementById("inputName").addEventListener("change", handleName);
document.getElementById("inputEmail").addEventListener("change", handleEmail);
document.getElementById("inputCountry").addEventListener("change", handleCountry);
document.getElementById("inputCompany").addEventListener("change", handleCompany);
document.getElementById("inputJob").addEventListener("change", handleJob);
document.getElementById("inputRole").addEventListener("change", handleRole);
document.getElementById("inputPassword").addEventListener("change", handlePassword);
document.getElementById("inputConfirm").addEventListener("change", handleConfirm);
document.getElementById("mainForm").addEventListener("submit", handleSubmission);