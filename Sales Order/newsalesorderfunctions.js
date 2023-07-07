function addAnotherRow() {
    var itemDetails = document.querySelector('.item-details');

    var newRow = document.createElement('div');
    newRow.classList.add('item-row');

    newRow.innerHTML = `
        <input type="text" placeholder="Item" id="item" name="item">
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
    var SubjectLine = document.createElement("salesOrder").value;
    window.location.href = "mailto:primekeliye02@gmail.com?subject=" + SubjectLine + "&body=" + body;
}