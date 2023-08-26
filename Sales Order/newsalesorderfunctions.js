function addAnotherRow() {
    var itemDetails = document.querySelector('.item-details');

    var newRow = document.createElement('div');
    newRow.classList.add('item-row');

    newRow.innerHTML = `
        <input type="text" placeholder="Item" id="item" name="item" style="width: 125rem;">
        <input type="number" placeholder="Quantity" id="quantity" name="quantity" onchange="calculateAmount(this)">
        <input type="number" step="1" placeholder="Rate (INR)" id="rate" name="rate" onchange="calculateAmount(this)">
        <input type="number" step="0.01" placeholder="Discount (%)" id="discount" name="discount" onchange="calculateAmount(this)">
        <input type="number" step="0.1" placeholder="Amount (INR)" id="amount" name="amount" disabled>
    `;

    itemDetails.insertBefore(newRow, itemDetails.lastElementChild);
}

// Calculate and update the amount and grand total
function calculateAmount(input) {
    var itemRow = input.parentNode;
    var quantity = parseFloat(itemRow.querySelector('input[name="quantity"]').value) || 0;
    var rate = parseFloat(itemRow.querySelector('input[name="rate"]').value) || 0;
    var discount = parseFloat(itemRow.querySelector('input[name="discount"]').value) || 0;

    var amount = (quantity * rate * (1 - discount / 100)).toFixed(2);
    itemRow.querySelector('input[name="amount"]').value = amount;

    calculateGrandTotal();
}

// Calculate and update the grand total
function calculateGrandTotal() {
    var amountInputs = document.querySelectorAll('.item-row input[name="amount"]');
    var grandTotal = 0;

    amountInputs.forEach(function (input) {
        grandTotal += parseFloat(input.value) || 0;
    });

    var grandTotalElement = document.getElementById('grandTotal');
    grandTotalElement.innerText = grandTotal.toFixed(2);
}

// Add event listeners to calculate the amount and grand total whenever the input values change
var quantityInputs = document.querySelectorAll('.item-row input[name="quantity"]');
var rateInputs = document.querySelectorAll('.item-row input[name="rate"]');
var discountInputs = document.querySelectorAll('.item-row input[name="discount"]');

quantityInputs.forEach(function (input) {
    input.addEventListener('input', function () {
        calculateAmount(this);
    });
});

rateInputs.forEach(function (input) {
    input.addEventListener('input', function () {
        calculateAmount(this);
    });
});

discountInputs.forEach(function (input) {
    input.addEventListener('input', function () {
        calculateAmount(this);
    });
});

function saveAndSend() {
    var body = document.getElementById("customerName").value;
    var sales_order = document.getElementById("salesOrder").value;
    var SubjectLine = "Sales Order from abc (Sales Order #: " + sales_order + ")";
    var orderDate = document.getElementById("salesOrderDate").value;
    var amount = document.getElementById("amount").value;
    window.location.href = "mailto:@gmail.com?subject=" + SubjectLine + "&body=" + "Dear " + body + "," + "%0d%0a %0d%0a Thanks for your interest in our services.%0d%0a %0d%0a Please find our sales order attached with this mail. %0d%0a %0d%0a An overview of the sales order is available below for your reference: %0d%0a %0d%0a ---------------------------------------------------------------------------------------- %0d%0a %0d%0a Sales Order #:" + sales_order + "%0d%0a %0d%0a ---------------------------------------------------------------------------------------- %0d%0a %0d%0a Order Date      : " + orderDate + "%0d%0a %0d%0a Amount           : ₹" + amount + "%0d%0a %0d%0a ---------------------------------------------------------------------------------------- %0d%0a %0d%0a Assuring you of our best services at all times. %0d%0a %0d%0a Regards, %0d%0a %0d%0a Employee BlueBuck";
}

var Gmail = localStorage.getItem("email");
module.export(Gmail);