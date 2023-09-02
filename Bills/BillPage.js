var currentPage = 1;
var pageSize = 5; //change this according to how many budgets you want on the page
var budgets = [];
async function getbills() {
    try {
        const response = await fetch("http://localhost:8000/api/v1/auth/displaybill");
        const data = await response.json();
        console.log(data)
        // Get a reference to the table
        const table = document.getElementById('data-table');

        // Clear any existing table data
        table.innerHTML = '';

        // Create and append the table header
        const tableHeader = document.createElement('thead');
        tableHeader.innerHTML = `
            <tr>
                <th><input type="checkbox" id="select-all-checkbox"></th>
                <th>Vendor Name</th>
                <th>Bill Number</th>
                <th>Order Id</th>
                <th>Bill Date</th>
                <th>Due Type</th>
                <th>Terms</th>
                <th>Reference</th>
            </tr>
        `;
        table.appendChild(tableHeader);
        data.Billss.forEach((dc) => {
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
                    <td>${dc.VendorName}</td>
                    <td>${dc.billNumber}</td>
                    <td>${dc.order}</td>
                    <td>${dc.billDate.split('T')[0]}</td>
                    <td>${dc.duedate.split('T')[0]}</td>
                    <td>${dc.terms}</td>
                    <td>${dc.reference}</td>
                `;

                // Create and append the details row
                const detailsRow = document.createElement('tr');
                detailsRow.classList.add('details-row');
                detailsRow.innerHTML = `
                    <td colspan="8">
                        <table class="item-table">
                            <thead>
                                <tr>
                                    <th>Item Names</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${dc.items.map(item => `
                                    <tr class="pr">
                                        <td>${item[0]}</td>
                                        <td>${item[1]}</td>
                                        <td>${item[2]}</td>
                                    </tr>
                                `).join('')}
                                <tr> 
                                <td></td>
                                <td></td>
                                <td class="grand">Grand Total   :   ${dc.grandInput}</td>
                                </tr>
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
        console.log("Error fetching bills:", error);
    }
}

getbills();


$(document).on("click", ".btn-danger", function () {
    var dcId = $(this).attr("dc");
    var wrapperTbody = $(this).closest(".record-wrapper");
    console.log("DELETED");

    // AJAX request to delete the Delivery Challan
    $.ajax({
        url: "http://localhost:8000/api/v1/deletebill/" + dcId,
        type: "DELETE",
        success: function (response) {
            console.log("Bill deleted successfully");

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
        var billId = $(this).closest(".record-wrapper").attr("data-dc-id");
        localStorage.setItem("billId", billId); // Store the budgetId in localStorage
        window.location.href = "./BillForm.html"; // Redirect to the budget form page
});

$(document).on("click", ".btn-info", function () {
    var tbody = $(this).closest(".record-wrapper");
    var VendorName = tbody.find(".rrr td:nth-child(2)").text();
    var billNumber= tbody.find(".rrr td:nth-child(3)").text();
    var order = tbody.find(".rrr td:nth-child(4)").text();
    var billDate = tbody.find(".rrr td:nth-child(5)").text();
    var duedate = tbody.find(".rrr td:nth-child(6)").text();
    var terms = tbody.find(".rrr td:nth-child(7)").text();
    var reference = tbody.find(".rrr td:nth-child(8)").text();
    var grandInput = parseFloat(tbody.find(".grand").text());

    // Extract items list
    var itemsList = [];

    tbody.find(".details-row .item-table tbody .pr").each(function () {
        var itemName = $(this).find("td:nth-child(1)").text();
        var quantity = $(this).find("td:nth-child(2)").text();
        var price = $(this).find("td:nth-child(3)").text();
        itemsList.push([itemName, quantity, price]);
        console.log(itemName);
      });
    console.log(itemsList)
    
    // Create a string with all the information to be printed
    var printContent = `
        <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
        <tr>
        <td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">Vendor Name:</td>
        <td style="padding: 8px; border: 1px solid #ccc;">${VendorName}</td>
        </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">Bill Number:</td>
            <td style="padding: 8px; border: 1px solid #ccc;">${billNumber}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">Order Id:</td>
            <td style="padding: 8px; border: 1px solid #ccc;">${order}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">Bill Date:</td>
            <td style="padding: 8px; border: 1px solid #ccc;">${billDate}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">Due Type:</td>
            <td style="padding: 8px; border: 1px solid #ccc;">${duedate}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">Terms:</td>
            <td style="padding: 8px; border: 1px solid #ccc;">${terms}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">Reference:</td>
            <td style="padding: 8px; border: 1px solid #ccc;">${reference}</td>
          </tr>
          <td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">Grand Total:</td>
          <td style="padding: 8px; border: 1px solid #ccc;">${grandInput}</td>
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
                  </tr>
                </thead>
                <tbody>
                  ${itemsList.map(item => `
                    <tr style="text-align:center;">
                      <td>${item[0]}</td>
                      <td>${item[1]}</td>
                      <td>${item[2]}</td>
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