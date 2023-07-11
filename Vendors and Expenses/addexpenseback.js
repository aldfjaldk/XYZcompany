data = {
    date: "...",
    expense: "...",
    sac: "...",
    amount: "...",
    paymentthrough: "...",
    vendor: "...",
    gsttype: "...",
    destinationofsupply: "...",
    tax: "...",
    taxamount: "...",
    invoice: "...",
    note: "...",
    file: "...",
    
}

async function postJSON(data) {
    console.log("frontend posted the data successfully to the backend")
    try {
        const response = await fetch("http://localhost:8000/api/v1/auth/add-expenses", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const result = await response.json();
        console.log("Success: ", result);
        if (result.success) {
            alert("data sent to backend successfully.")
            // localStorage.setItem("name", data.handleName) //no need for this line for your work
            // window.location.href = "../Dashboard/dashboard.html" //no need of this line to re-direct
        }
        else {
            alert("try again");
        }
    }
    catch (error) {
        console.error("Error: ", error);
    }
}

function handleSubmission(event) {
    event.preventDefault();
    console.log("This is the data collected: ", data);
    postJSON(data)
}

function handleDate(event) {
    data.date = event.target.value;
}
function handleExpense(event) {
    data.expense = event.target.value;
}
function handleSac(event) {
    data.sac = event.target.value;
}
function handleAmount(event) {
    data.amount = event.target.value;
}
function handlePaymentThrough(event) {
    data.paymentthrough = event.target.value;
}
function handleVendor(event) {
    data.vendor = event.target.value;
}
function handleGstType(event) {
    data.gsttype = event.target.value;
}
function handleDestinationOfSupply(event) {
    data.destinationofsupply = event.target.value;
}
function handleTax(event) {
    data.tax = event.target.value;
}
function handleTaxAmount(event) {
    data.taxamount = event.target.value;
}
function handleInvoice(event) {
    data.invoice= event.target.value;
}
function handleNote(event) {
    data.note = event.target.value;
}
function handleFile(event) {
    data.file = event.target.value;
}


document.getElementById("date").addEventListener("change", handleDate);
document.getElementById("expense").addEventListener("change", handleExpense);
document.getElementById("sac").addEventListener("change", handleSac);
document.getElementById("amount").addEventListener("change", handleAmount);
document.getElementById("paymentthrough").addEventListener("change", handlePaymentThrough);
document.getElementById("vendor").addEventListener("change", handleVendor);
document.getElementById("gsttype").addEventListener("change", handleGstType);
document.getElementById("destinationofsupply").addEventListener("change", handleDestinationOfSupply);
document.getElementById("tax").addEventListener("change", handleTax);
document.getElementById("taxamount").addEventListener("change", handleTaxAmount);
document.getElementById("invoice").addEventListener("change", handleInvoice);
document.getElementById("note").addEventListener("change", handleNote);
document.getElementById("file").addEventListener("change", handleFile);
