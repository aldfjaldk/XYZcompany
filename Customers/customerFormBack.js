data = {
    useremail: "...",
    firstname: "...",
    customeremail: "...",   
    companyname: "....",   
    workphone: "..." ,
    receivables: "..."
}
console.log("welcome to the Customers page.")


async function postJSON(data) {
    try {
        const response = await fetch("http://localhost:8000/api/v1/auth/addCustomer", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const result = await response.json();
        console.log("Success: ", result);
        if (result.success) {
            console.log("data added", data);
            window.location.href = "customerPage.html"
        }
        else {
            alert("try again");
        }
    }
    catch(error) {
        console.log("Error: ", error);
    }
}

function handleSubmission (event) {
    event.preventDefault();
    data.useremail=localStorage.getItem("customeremail");
    console.log("This is the data collected: ", data);
    postJSON(data)
}

function handleName(event) {data.firstname = event.target.value;}
function handleEmail(event) {data.customeremail = event.target.value;}
function handleCompany(event) {data.companyname = event.target.value;}
function handlePhone(event) {data.workphone = event.target.value;}
function handlePayables(event) {data.receivables = event.target.value;}


document.getElementById("firstname").addEventListener("change", handleName);
document.getElementById("customeremail").addEventListener("change", handleEmail);
document.getElementById("companyname").addEventListener("change", handleCompany);
document.getElementById("workphone").addEventListener("change", handlePhone);
document.getElementById("receivables").addEventListener("change", handlePayables);
document.getElementById("mainForm").addEventListener("submit", handleSubmission);