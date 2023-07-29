var currentPage = 1;
var pageSize = 5; //change this according to how many budgets you want on the page
var budgets = [];
async function getDeliveryChallans() {
    try {
        const response = await fetch("http://localhost:8000/api/v1/auth/displayDeliveryChallan");
        const data = await response.json();
        console.log("DeliveryChallan data:", data.deliveryChallans[0]);
        console.log("data type of data.deliveryChallans", typeof data.deliveryChallans);

        // Get a reference to the table
        const table = document.getElementById('data-table');

        // Clear any existing table data
        table.innerHTML = '';

        // Create and append the table header
        const tableHeader = document.createElement('thead');
        tableHeader.innerHTML = `
            <tr>
                <th><input type="checkbox" id="select-all-checkbox"></th>
                <th>Customer Name</th>
                <th>Delivery Challan</th>
                <th>Reference Number</th>
                <th>Delivery Challan Date</th>
                <th>Challan Type</th>
                <th>Warehouse Name</th>
                <th>Sub Total</th>
            </tr>
        `;
        table.appendChild(tableHeader);

        // Create and append each table row with associated data
        data.deliveryChallans.forEach((dc) => {
            var checkemail = localStorage.getItem("email");
            if (checkemail === dc.user_email) {
                const tbody = document.createElement('tbody');
                tbody.setAttribute('data-dc-id', dc._id)
                tbody.classList.add('record-wrapper');
                const row = document.createElement('tr');
                row.classList.add('rrr')

                // Add the first cell with the toggle icon
                const toggleCell = document.createElement('td');
                toggleCell.innerHTML = '<span class="toggle-icon">+</span>';
                row.appendChild(toggleCell);

                // Add the remaining cells with data
                row.innerHTML += `
                    <td>${dc.customerName}</td>
                    <td>${dc.deliveryChallan}</td>
                    <td>${dc.referenceNumber}</td>
                    <td>${dc.deliveryChallanDate.split('T')[0]}</td>
                    <td>${dc.challanType}</td>
                    <td>${dc.warehouseName}</td>
                    <td>${dc.subTotal}</td>
                `;

                // Create and append the details row
                const detailsRow = document.createElement('tr');
                detailsRow.classList.add('details-row');
                detailsRow.innerHTML = `
                    <td colspan="8">
                        <table class="item-table">
                            <thead>
                                <tr>
                                    <th>Item Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Tax</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${dc.items.map(item => `
                                    <tr class="pr">
                                        <td>${item[0]}</td>
                                        <td>${item[1]}</td>
                                        <td>${item[2]}</td>
                                        <td>${item[3]}</td>
                                    </tr>
                                `).join('')}
                                <tr>
                                    <td colspan="4">
                                        <div class="item-actions">
                                            <button class="btn btn-info" dc="${dc._id}" type="button">Print</button>
                                            <button class="btn btn-primary" dc="${dc._id}" type="button">Edit</button>
                                            <button class="btn btn-danger" dc="${dc._id}" type="button">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                `;

                // Append the main row and the details row to the table
                tbody.appendChild(row)
                tbody.appendChild(detailsRow)
                table.appendChild(tbody);

                // Add event listener to the trigger row to toggle the details row on click
                row.addEventListener('click', function () {
                    detailsRow.classList.toggle('expanded');
                    const icon = this.querySelector('.toggle-icon');
                    icon.textContent = icon.textContent === '+' ? '-' : '+';
                });
            }
        });
    } catch (error) {
        console.log("Error fetching DeliveryChallans:", error);
    }
}

getDeliveryChallans();


$(document).on("click", ".btn-danger", function () {
    var dcId = $(this).attr("dc");
    var wrapperTbody = $(this).closest(".record-wrapper");
    console.log("DELETED");

    // AJAX request to delete the Delivery Challan
    $.ajax({
        url: "http://localhost:8000/api/v1/deleteDeliveryChallan/" + dcId,
        type: "DELETE",
        success: function (response) {
            console.log("Delivery Challan deleted successfully");

            // Remove the entire record (wrapper tbody)
            wrapperTbody.remove();
        },
        error: function (error) {
            console.log("Error:", error);
        }
    });
});


    // Event handler for edit button click
$(document).on("click", ".btn-primary", function() {
        var challanId = $(this).closest(".record-wrapper").attr("data-dc-id");
        localStorage.setItem("ChallanId", challanId); // Store the budgetId in localStorage
        window.location.href = "./deliveryChallanForm.html"; // Redirect to the budget form page
});

$(document).on("click", ".btn-info", function () {
    var tbody = $(this).closest(".record-wrapper");
    var customerName = tbody.find(".rrr td:nth-child(2)").text();
    var deliveryChallan = tbody.find(".rrr td:nth-child(3)").text();
    var referenceNumber = tbody.find(".rrr td:nth-child(4)").text();
    var deliveryChallanDate = tbody.find(".rrr td:nth-child(5)").text();
    var challanType = tbody.find(".rrr td:nth-child(6)").text();
    var warehouseName = tbody.find(".rrr td:nth-child(7)").text();
    var subTotal = tbody.find(".rrr td:nth-child(8)").text();

    // Extract items list
    var itemsList = [];

    tbody.find(".details-row .item-table tbody .pr").each(function () {
        var itemName = $(this).find("td:nth-child(1)").text();
        var quantity = $(this).find("td:nth-child(2)").text();
        var price = $(this).find("td:nth-child(3)").text();
        var tax = $(this).find("td:nth-child(4)").text();
        itemsList.push([itemName, quantity, price, tax]);
        console.log(itemName);
      });
    console.log(itemsList)
    
    // Create a string with all the information to be printed
    var printContent = `
        <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
        <tr>
        <td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">Customer Name:</td>
        <td style="padding: 8px; border: 1px solid #ccc;">${customerName}</td>
        </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">Delivery Challan:</td>
            <td style="padding: 8px; border: 1px solid #ccc;">${deliveryChallan}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">Reference Number:</td>
            <td style="padding: 8px; border: 1px solid #ccc;">${referenceNumber}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">Delivery Challan Date:</td>
            <td style="padding: 8px; border: 1px solid #ccc;">${deliveryChallanDate}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">Challan Type:</td>
            <td style="padding: 8px; border: 1px solid #ccc;">${challanType}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">Warehouse Name:</td>
            <td style="padding: 8px; border: 1px solid #ccc;">${warehouseName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">Sub Total:</td>
            <td style="padding: 8px; border: 1px solid #ccc;">${subTotal}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">Items:</td>
            <td style="padding: 8px; border: 1px solid #ccc; margin-left: 20px;">
              <table style="border-collapse: collapse; width: 100%;">
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Tax</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsList.map(item => `
                    <tr style="text-align:center;">
                      <td>${item[0]}</td>
                      <td>${item[1]}</td>
                      <td>${item[2]}</td>
                      <td>${item[3]}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </td>
          </tr>
        </table>
      `;
  
    // Call the print function to print the content
    printText(printContent);
  });
  
function printText(content) {
    var printWindow = window.document.createElement("iframe");
    printWindow.style.display = "none";
    document.body.appendChild(printWindow);
    var printDocument = printWindow.contentDocument;
    printDocument.open();
    printDocument.write(`<pre>${content}</pre>`);
    printDocument.close();
    printWindow.focus();
    printWindow.contentWindow.print();
    document.body.removeChild(printWindow);
    }