data = {
    customerName: "...",
    deliveryChallan: "...",
    referenceNumber: "....",
    deliveryChallanDate: "...",
    challanType: "...",
    warehouseName: "...",
    subTotal: "..."
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


document.getElementById("customerName").addEventListener("change", handleCustomerName);
document.getElementById("deliveryChallan").addEventListener("change", handleDeliveryChallan);
document.getElementById("referenceNumber").addEventListener("change", handleReferenceNumber);
document.getElementById("deliveryChallanDate").addEventListener("change", handleDeliveryChallanDate);
document.getElementById("challanType").addEventListener("change", handleChallanType);
document.getElementById("warehouseName").addEventListener("change", handleWarehouseName);
document.getElementById("subTotal").addEventListener("change", handleSubTotal);
document.getElementById("mainForm").addEventListener("submit", handleSubmission);