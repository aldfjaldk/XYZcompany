$(function() {
    // Load header, footer, and sidebar
    $("#header").load("../Components/header.html");
    $("#footer").load("../Components/footer.html");
    $("#sidebar").load("../Components/sidebar.html");

    // Data for pagination
    var currentPage = 1;
    var pageSize = 5; //change this according to how many budgets you want on the page
    var budgets = [];

    // Function to display the budget cards for the current page
    function displayBudgets() {
      var budgetList = $("#budgetList");
      budgetList.empty();

      var startIndex = (currentPage - 1) * pageSize;
      var endIndex = startIndex + pageSize;
      for (var i = startIndex; i < endIndex && i < budgets.length; i++) {
        var budget = budgets[i];
        if(budget.user == localStorage.getItem("email")){
          var budgetCard = $("<div>").addClass("card").css("margin-top", "50px").css("margin-left", "20px").css("width","90%").attr("data-budget-id", budget._id);

          var cardHeader = $("<div>")
            .addClass("card-header")
            .css("border", "2px solid #56AFFF")
            .html(`
              <div class="pb-3 d-flex justify-content-between align-items-center">
                <h5 class="card-title" style="text-transform: none;">${budget.name}</h5>
                <button type="button" class="btn btn-link p-0" data-toggle="collapse" data-target="#collapseCard${i}">
                  <i class="fas fa-chevron-down"></i>
                </button>
              </div>`);
          var cardBody = $("<div>")
            .addClass("card-body collapse")
            .css({
              border: "2px solid #56AFFF",
              padding: "10px"
            })
            .attr("id", `collapseCard${i}`)
            .html(`
              <style>
                td{
                  padding: 12px;
                  word-break: break-word;
                }
                #bor{
                  border-top: 1px solid #ccc;
                }
                strong {
                  display: block;
                }
                .row {
                  display: flex;
                  flex-wrap: wrap;
                }
              </style>
              <div class="row">
                <div class="col-sm-6">
                  <table>
                    <tr>
                      <td><strong>Amount:</strong></td>
                      <td>$${budget.amount}</td>
                    </tr>
                    <tr>
                      <td><strong>Period:</strong></td>
                      <td>${budget.period}</td>
                    </tr>
                    <tr id = "bor">
                      <td><strong style="white-space: nowrap;">Description:</strong></td>
                      <td>${budget.description}</td>
                    </tr>
                  </table>
                  <p hidden>${budget._id}</p>
                </div>
                <div class="col-sm-5">
                  ${budget.expense ? `
                    <ul class="list-group list-group-flush">
                      <h6 style="padding: 15px 0px 0px 8px;" class="card-text"><strong>Expenses:</strong></h6>
                      <!-- List items for expenses here -->
                    </ul>
                  ` : ''}
                </div>
              </div>
            `);

          if (budget.expense) {
            var expenseList = cardBody.find(".list-group");

            for (var key in budget.expense) {
              if (budget.expense.hasOwnProperty(key)) {
                var expenseItem = $("<li>")
                  .addClass("list-group-item d-flex justify-content-between align-items-center")
                  .html(`
                    <span class="badge badge-success">${key}</span>
                    <span class="badge badge-success">$${budget.expense[key]}</span>`);
                expenseList.append(expenseItem);
              }
            }
          }

          var cardFooter = $("<div>")
            .addClass("card-footer text-right")
            .css({
              "background-color": "#EEEEEE",
              "border": "2px solid #56AFFF",
              "margin": "0"
            });
          var editButton = $("<button>")
            .attr("type", "button").css({"margin":"5px"})
            .addClass("btn btn-primary")
            .text("Edit");
          var deleteButton = $("<button>")
            .attr("type", "button")
            .addClass("btn btn-danger")
            .text("Delete");
          var printButton = $("<button>")
            .attr("type", "button").css({"margin":"5px"})
            .addClass("btn btn-info")
            .text("Print");
          cardFooter.append(printButton);

          cardFooter.append(editButton);
          cardFooter.append(deleteButton);

          budgetCard.append(cardHeader);
          budgetCard.append(cardBody);
          budgetCard.append(cardFooter);

          budgetList.append(budgetCard);
        }
      }

      // Enable the collapse functionality
      $(".card-header .btn").click(function() {
        var target = $(this).attr("data-target");
        var icon = $(this).find("i");

        $(target).collapse("toggle");

        if ($(target).hasClass("show")) {
          icon.removeClass("fa-chevron-up");
          icon.addClass("fa-chevron-down");
        } else {
          icon.removeClass("fa-chevron-down");
          icon.addClass("fa-chevron-up");
        }
      });

      // Update pagination links
      var previousPage = $("#previousPage");
      var nextPage = $("#nextPage");

      previousPage.toggleClass("disabled", currentPage === 1);
      nextPage.toggleClass("disabled", currentPage === Math.ceil(budgets.length / pageSize));

      // Update current page indicator
      $("#currentPage").find(".page-link").text(currentPage);
    }

    // AJAX request to fetch budgets
    $.ajax({
      url: "http://localhost:8000/Budgets/budget.html",
      type: "GET",
      success: function(response) {
        budgets = response.filter(response => response.user === localStorage.getItem("email"));

        // Display the budgets for the current page
        currentPage = 1;

        displayBudgets();
      },
      error: function(error) {
        console.log("Error:", error);
      }
    });

    // Event handler for delete button click
    $(document).on("click", ".btn-danger", function() {
      var card = $(this).closest(".card");
      var budgetId = card.attr("data-budget-id");
      console.log("DELETED");

      // AJAX request to delete the budget document
      $.ajax({
        url: "http://localhost:8000/api/v1/budgets/" + budgetId,
        type: "DELETE",
        success: function(response) {
          console.log("Budget deleted successfully");

          // Remove the card from the DOM
          card.remove();
        },
        error: function(error) {
          console.log("Error:", error);
        }
      });
    });

    // Event handler for edit button click
    $(document).on("click", ".btn-primary", function() {
      var budgetId = $(this).closest(".card").attr("data-budget-id");
      localStorage.setItem("budgetId", budgetId); // Store the budgetId in localStorage
      window.location.href = "./budgetform.html"; // Redirect to the budget form page
    });

    // Event handler for previous page navigation
    $("#previousPage").click(function(e) {
      e.preventDefault();

      if (currentPage > 1) {
        currentPage--;
        displayBudgets();
      }
    });

    // Event handler for next page navigation
    $("#nextPage").click(function(e) {
      e.preventDefault();

      if (currentPage < budgets.length / pageSize) {
        currentPage++;
        displayBudgets();
      }
    });
  });


  // ... Existing code ...

// Event handler for print button click
// Event handler for print button click
$(document).on("click", ".btn-info", function() {
var card = $(this).closest(".card");
var budgetName = card.find(".card-title").text();
var budgetid= card.find("p").text();
var budgetAmount = card.find("table tr:nth-child(1) td:nth-child(2)").text();
var budgetPeriod = card.find("table tr:nth-child(2) td:nth-child(2)").text();
var budgetDescription = card.find("table tr:nth-child(3) td:nth-child(2)").text();

// Extract expenses list
var expensesList = [];
card.find(".list-group-item").each(function() {
  var expenseName = $(this).find(".badge-success:first-child").text();
  var expenseAmount = $(this).find(".badge-success:last-child").text();
  expensesList.push(`${expenseName}: ${expenseAmount}`);
});


// Extract the date the budget was created
var creationDate = card.find(".card-footer small").text();


    // Create a string with all the information to be printed
    var printContent = `
      <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">Budget Id:</td>
          <td style="padding: 8px; border: 1px solid #ccc;">${budgetid}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">Budget Name:</td>
          <td style="padding: 8px; border: 1px solid #ccc;">${budgetName}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">Amount:</td>
          <td style="padding: 8px; border: 1px solid #ccc;">${budgetAmount}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">Period:</td>
          <td style="padding: 8px; border: 1px solid #ccc;">${budgetPeriod}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">Expenses:</td>
          <td style="padding: 8px; border: 1px solid #ccc; margin-left: 20px;">${expensesList.join("<br>")}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">Description:</td>
          <td style="padding: 8px; border: 1px solid #ccc;">${budgetDescription}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">Email:</td>
          <td style="padding: 8px; border: 1px solid #ccc; margin-left: 20px;">${localStorage.email}</td>
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
