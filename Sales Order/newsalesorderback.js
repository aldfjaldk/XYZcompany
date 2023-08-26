data = {
    customerName: "...",
    salesOrder: "...",
    referenceNumber: "...",
    salesOrderDate: "...",
    expectedShipmentDate: "...",
    paymentTerms: "...",
    deliveryMethod: "...",
    customerNotes: "...",
    grandTotal: '...',
    item: "...",
    quantity: "...",
    rate: "...",
    discount: "...",
    amount: '...',
    email: "...",
}

async function postJSON(data) {
    console.log("worked")
    try {
        const response = await fetch("http://localhost:8000/api/v1/auth/new-sales-order", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const result = await response.json();
        console.log("Success: ", result);
        if (result.success) {
            localStorage.setItem("name", data.handleName)
            window.location.href = "./salesorder.html"
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
    data.email = localStorage.getItem("email");
    console.log("This is the data collected: ", data);
    console.log(data.amount);
    console.log(data.grandTotal);
    postJSON(data);
}

function handleName(event) {
    data.customerName = event.target.value;
}
function handleSalesOrder(event) {
    data.salesOrder = event.target.value;
}
function handleReferenceNumber(event) {
    data.referenceNumber = parseInt(event.target.value);
}
function handleSalesOrderDate(event) {
    data.salesOrderDate = event.target.value;
}
function handleExpectedShipmentDate(event) {
    data.expectedShipmentDate = event.target.value;
}
function handlePaymentTerms(event) {
    data.paymentTerms = event.target.value;
}
function handleDeliveryMethod(event) {
    data.deliveryMethod = event.target.value;
}
function handleCustomerNotes(event) {
    data.customerNotes = event.target.value;
}
function handleItem(event) {
    data.item = event.target.value;
}
function handleQuantity(event) {
    data.quantity = parseFloat(event.target.value);
}
function handleRate(event) {
    data.rate = parseFloat(event.target.value);
}
function handleDiscount(event) {
    data.discount = parseFloat(event.target.value);
}
function handleAmount(event) {
    data.amount = event.target.value;
    data.amount = (data.quantity * data.rate * (1 - data.discount / 100));
}
function handleGrandTotal() {
    data.grandTotal = parseFloat(document.getElementById('grandTotal').innerText);
}

document.getElementById("customerName").addEventListener("change", handleName);
document.getElementById("salesOrder").addEventListener("change", handleSalesOrder);
document.getElementById("referenceNumber").addEventListener("change", handleReferenceNumber);
document.getElementById("salesOrderDate").addEventListener("change", handleSalesOrderDate);
document.getElementById("expectedShipmentDate").addEventListener("change", handleExpectedShipmentDate);
document.getElementById("paymentTerms").addEventListener("change", handlePaymentTerms);
document.getElementById("deliveryMethod").addEventListener("change", handleDeliveryMethod);
document.getElementById("customerNotes").addEventListener("change", handleCustomerNotes);
document.getElementById("newOrder").addEventListener("submit", handleGrandTotal);
document.getElementById("item").addEventListener("change", handleItem);
document.getElementById("quantity").addEventListener("change", handleQuantity);
document.getElementById("rate").addEventListener("change", handleRate);
document.getElementById("discount").addEventListener("change", handleDiscount);
document.getElementById("newOrder").addEventListener("submit", handleAmount);
document.getElementById("newOrder").addEventListener("submit", handleSubmission);


