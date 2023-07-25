data = {
    useremail: "...",
    fullname: "...",
    description: "...",   
    email: "....",   
    stock: "..." ,
    hsncode: "...",
    sku: "...",
    unit: "...",
    tax: "...",
    sp: "...",
    account: "..."
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
function handleDescription(event) {data.description = event.target.value;}
function handleEmail(event) {data.email = event.target.value;}
function handleStock(event) {data.stock = event.target.value;}
function handleHsncode(event) {data.hsncode = event.target.value;}
function handleSKU(event) {data.sku = event.target.value;}
function handleUnit(event) {data.unit = event.target.value;}
function handleTax(event) {data.tax = event.target.value;}
function handleSp(event) {data.sp = event.target.value;}
function handleAccount(event) {data.account = event.target.value;}

document.getElementById("fullname").addEventListener("change", handleName);
document.getElementById("description").addEventListener("change", handleDescription);
document.getElementById("email").addEventListener("change", handleEmail);
document.getElementById("stock").addEventListener("change", handleStock);
document.getElementById("hsncode").addEventListener("change", handleHsncode);
document.getElementById("sku").addEventListener("change", handleSKU);
document.getElementById("unit").addEventListener("change", handleUnit);
document.getElementById("tax").addEventListener("change", handleTax);
document.getElementById("sp").addEventListener("change", handleSp);
document.getElementById("account").addEventListener("change", handleAccount);
document.getElementById("mainForm").addEventListener("submit", handleSubmission);

