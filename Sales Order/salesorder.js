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

async function getSalesOrders() {
    try {
        const response = await fetch("http://localhost:8000/api/v1/auth/display-sales-order");
        const data = await response.json();
        let tableData = "";
        (data.salesOrder).map((dc) => {
            var checkemail = localStorage.getItem("email");
            if (checkemail === dc.email) {
                tableData += `<tr>
                    <td>${dc.salesOrderDate}</td>
                    <td>${dc.salesOrder}</td>
                    <td>${dc.referenceNumber}</td>
                    <td>${dc.customerName}</td>
                    <td>Draft</td>
                    <td>${dc.grandTotal}</td>
                    <td><button style="width: 100px;" class="btn btn-outline-danger me-2" onclick="deleteItem('${dc._id}')">REMOVE</button>
                    <button style="width: 100px;" class="btn btn-outline-warning me-2" onclick="editItem('${dc._id}')">EDIT</button>
                    </tr>`;
            }
        });
        document.getElementById('table_body').innerHTML = tableData;
    } catch (error) {
        console.log("Error fetching SalesOrders:", error);
    }
}

getSalesOrders();

async function deleteItem(id) {
    try {
        const response = await fetch(`http://localhost:8000/api/v1/auth/deletesalesorder/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });
        const data = await response.json();
        console.log("Delete Item response:", data);

        getSalesOrders();
    } catch (error) {
        console.log("Error removing item:", error);
    }
}

async function editItem(id) {
    try {
        const response = await fetch("http://localhost:8000/api/v1/auth/display-sales-order");
        const d = await response.json();
        console.log("Sales Order data:", d.salesOrder[0]);
        print("hey");
        console.log("Hey");
        (d.salesOrder).forEach((dc) => {
            if (id === dc._id) {
                document.querySelector('#customerName').value = dc.customerName;
                document.querySelector('#salesOrder').value = dc.salesOrder;
                document.querySelector('#referenceNumber').value = dc.referenceNumber;
                document.querySelector('#salesOrderDate').value = dc.salesOrderDate;
                document.querySelector('#expectedShipmentDate').value = dc.expectedShipmentDate;
                document.querySelector('#paymentTerms').value = dc.paymentTerms;
                document.querySelector('#deliveryMethod').value = dc.deliveryMethod;
                document.querySelector('#customerNotes').value = dc.customerNotes;
                document.querySelector('#grandTotal').value = dc.grandTotal;
                document.querySelector('#item').value = dc.item;
                document.querySelector('#rate').value = dc.rate;
                document.querySelector('#discount').value = dc.discount;
                document.querySelector('#quantity').value = dc.quantity;
                document.querySelector('#amount').value = dc.amount;
                data = {
                    customerName: dc.customerName,
                    salesOrder: dc.salesOrder,
                    referenceNumber: dc.referenceNumber,
                    salesOrderDate: dc.salesOrderDate,
                    expectedShipmentDate: dc.expectedShipmentDate,
                    paymentTerms: dc.paymentTerms,
                    deliveryMethod: dc.deliveryMethod,
                    customerNotes: dc.customerNotes,
                    grandTotal: dc.grandTotal,
                    item: dc.item,
                    quantity: dc.quantity,
                    rate: dc.rate,
                    discount: dc.discount,
                    amount: dc.amount,
                    email: dc.email
                }
            }
        });
    } catch (error) {
        console.log("Error fetching vendors:", error);
    }
    document.getElementsByClassName('main')[0].style.display = "none";
    document.getElementsByClassName('main2')[0].style.display = "block";
    deleteItem(id);
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
    postJSON(data);
}

function handleName(event) {
    data.customerName = event.target.value;
    print(data);
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
}
function handleGrandTotal(event) {
    data.grandTotal = event.target.value;
}

document.getElementById("customerName").addEventListener("change", handleName);
document.getElementById("salesOrder").addEventListener("change", handleSalesOrder);
document.getElementById("referenceNumber").addEventListener("change", handleReferenceNumber);
document.getElementById("salesOrderDate").addEventListener("change", handleSalesOrderDate);
document.getElementById("expectedShipmentDate").addEventListener("change", handleExpectedShipmentDate);
document.getElementById("paymentTerms").addEventListener("change", handlePaymentTerms);
document.getElementById("deliveryMethod").addEventListener("change", handleDeliveryMethod);
document.getElementById("customerNotes").addEventListener("change", handleCustomerNotes);
document.getElementById("grandTotal").addEventListener("change", handleGrandTotal);
document.getElementById("item").addEventListener("change", handleItem);
document.getElementById("quantity").addEventListener("change", handleQuantity);
document.getElementById("rate").addEventListener("change", handleRate);
document.getElementById("discount").addEventListener("change", handleDiscount);
document.getElementById("amount").addEventListener("change", handleAmount);
document.getElementById("mainForm2").addEventListener("submit", handleSubmission);
