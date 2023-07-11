data = {
    customerName: "...",
    deliveryChallan: "...",
    referenceNumber: "....",
    deliveryChallanDate: "...",
    challanType: "...",
    warehouseName: "...",
    subTotal: "...",
    item: "...",
    quantity: "...",
    rate: "...",
    tax: "...",
    amount: "..."
}
console.log("welcome to the Delivery Challan page.")


async function postJSON(data) {
    try {
        const response = await fetch("http://localhost:8000/api/v1/auth/addDeliveryChallan", {
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
            //window.location.href = "deliveryChallanPage.html"
        }
        else {
            alert("try again");
        }
    }
    catch (error) {
        console.log("Error: ", error);
    }
}

function handleSubmission(event) {
    event.preventDefault();
    console.log("This is the data collected: ", data);
    postJSON(data)
}

function handleCustomerName(event) { data.customerName = event.target.value; }
function handleDeliveryChallan(event) { data.deliveryChallan = event.target.value; }
function handleReferenceNumber(event) { data.referenceNumber = event.target.value; }
function handleDeliveryChallanDate(event) { data.deliveryChallanDate = event.target.value; }
function handleChallanType(event) { data.challanType = event.target.value; }
function handleWarehouseName(event) { data.warehouseName = event.target.value; }
function handleSubTotal(event) { data.subTotal = event.target.value; }
function handleItem(event) { data.item = event.target.value; }
function handleQuantity(event) { data.quantity = event.target.value; }
function handleRate(event) { data.rate = event.target.value; }
function handleDiscount(event) { data.tax = event.target.value; }
function handleAmount(event) { data.amount = event.target.value; }

document.getElementById("customerName").addEventListener("change", handleCustomerName);
document.getElementById("deliveryChallan").addEventListener("change", handleDeliveryChallan);
document.getElementById("referenceNumber").addEventListener("change", handleReferenceNumber);
document.getElementById("deliveryChallanDate").addEventListener("change", handleDeliveryChallanDate);
document.getElementById("challanType").addEventListener("change", handleChallanType);
document.getElementById("warehouseName").addEventListener("change", handleWarehouseName);
document.getElementById("subTotal").addEventListener("change", handleSubTotal);
document.getElementById("item").addEventListener("change", handleItem);
document.getElementById("quantity").addEventListener("change", handleQuantity);
document.getElementById("rate").addEventListener("change", handleRate);
document.getElementById("discount").addEventListener("change", handleDiscount);
document.getElementById("amount").addEventListener("change", handleAmount);
document.getElementById("mainForm").addEventListener("submit", handleSubmission);
