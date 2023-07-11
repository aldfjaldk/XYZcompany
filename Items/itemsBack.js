data = {
    useremail: "...",
    fullname: "...",
    description: "...", 
    email:  "...",
    stock: "...",
    hsncode: "....",   
    sku: "..." ,
}
console.log("welcome to the items page.")


async function postJSON(data) {
    try {
        const response = await fetch("http://localhost:8000/api/v1/auth/addItem", {
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
            window.location.href = "itemspage.html"
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
    data.useremail=localStorage.getItem("email");
    console.log("This is the data collected: ", data);
    postJSON(data)
}

function handleName(event) {data.fullname = event.target.value;}
function handleEmail(event) {data.description = event.target.value;}
function handleRate(event) {data.email = event.target.value;}
function handleStock(event) {data.stock = event.target.value;}
function handleCompany(event) {data.hsncode = event.target.value;}
function handlePhone(event) {data.sku = event.target.value;}


document.getElementById("fullname").addEventListener("change", handleName);
document.getElementById("description").addEventListener("change", handleEmail);
document.getElementById("email").addEventListener("change", handleRate);
document.getElementById("stock").addEventListener("change", handleStock);
document.getElementById("hsncode").addEventListener("change", handleCompany);
document.getElementById("sku").addEventListener("change", handlePhone);
document.getElementById("mainForm").addEventListener("submit", handleSubmission);