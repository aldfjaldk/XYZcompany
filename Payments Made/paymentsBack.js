data = {
    useremail: "...",
    paymentDate: "...",
    paymentNumber: "...",   
    reference: "....",   
    vendorname: "..." ,
    paymentMode: "...",
    paymentMade: "...",
    email: "....",
    paidThrough: "..."
}
console.log("welcome to the payments page.")

async function postJSON(data) {
    try {
        const response = await fetch("http://localhost:8000/api/v1/auth/addPayment", {
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
            window.location.href = "paymentsmade.html"
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


function handlePaymentDate(event) {data.paymentDate = event.target.value;}
function handlePaymentNumber(event) {data.paymentNumber = event.target.value;}
function handleReference(event) {data.reference = event.target.value;}
function handleVendorname(event) {data.vendorname = event.target.value;}
function handlePaymentMode(event) {data.paymentMode = event.target.value;}
function handlePaymentMade(event) {data.paymentMade = event.target.value;}
function handleEmail(event) {data.email = event.target.value;}
function handlePaidThrough(event) {data.paidThrough = event.target.value;}

document.getElementById("paymentDate").addEventListener("change", handlePaymentDate);
document.getElementById("paymentNumber").addEventListener("change", handlePaymentNumber);
document.getElementById("email").addEventListener("change", handleEmail);
document.getElementById("reference").addEventListener("change", handleReference);
document.getElementById("vendorname").addEventListener("change", handleVendorname);
document.getElementById("paymentMode").addEventListener("change", handlePaymentMode);
document.getElementById("paymentMade").addEventListener("change", handlePaymentMade);
document.getElementById("paidThrough").addEventListener("change", handlePaidThrough);

document.getElementById("mainForm").addEventListener("submit", handleSubmission);
