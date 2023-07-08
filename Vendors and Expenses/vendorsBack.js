data = {
    useremail: "...",
    vendorname: "...",
    email: "...",   
    company: "....",   
    phone: "..." ,
    payables: "..."
}
console.log("welcome to the vendors page.")


async function postJSON(data) {
    try {
        const response = await fetch("http://localhost:8000/api/v1/auth/addVendor", {
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

            window.location.href = "vendors.html"
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
    useremail=localStorage.getItem("email");
    //document.getElementById("inputEmail").value=useremail;
    console.log("This is the data collected: ", data);
    postJSON(data)
}

function handleName(event) {data.vendorname = event.target.value;}
function handleEmail(event) {data.email = event.target.value;}
function handleCompany(event) {data.company = event.target.value;}
function handlePhone(event) {data.phone = event.target.value;}
function handlePayables(event) {data.payables = event.target.value;}


document.getElementById("vendorname").addEventListener("change", handleName);
document.getElementById("email").addEventListener("change", handleEmail);
document.getElementById("company").addEventListener("change", handleCompany);
document.getElementById("phone").addEventListener("change", handlePhone);
document.getElementById("payables").addEventListener("change", handlePayables);
document.getElementById("mainForm").addEventListener("submit", handleSubmission);