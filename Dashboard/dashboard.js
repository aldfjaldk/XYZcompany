function fetchAndUpdateDashboardData() {
  const email = localStorage.getItem('email');

  if (email) {
    fetch('http://localhost:8000/api/dashboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
      .then(response => response.json())
      .then(dashboardData => {
        console.log('Dashboard data:', dashboardData);

        const amountToPayElement = document.getElementById('amountToPay');
        amountToPayElement.textContent = `₹${dashboardData.amountToPay || 0}`;

        // const amountToReceiveElement = document.getElementById('amountToReceive');
        // amountToReceiveElement.textContent = `$${dashboardData.amountToReceive || 0}`;

        const currentBalanceElement = document.getElementById('currentBalance');
        currentBalanceElement.textContent = `Current balance: $${dashboardData.currentBalance || 0}`;

        const overdueElement = document.getElementById('overdue');
        overdueElement.textContent = `Over Due: $${dashboardData.overDue || 0}`;

        const currentBalanceElement2 = document.getElementById('currentBalance2');
        currentBalanceElement2.textContent = `Current balance: $${dashboardData.currentBalance || 0}`;

        const overdueElement2 = document.getElementById('overdue2');
        overdueElement2.textContent = `Over Due: $${dashboardData.overDue || 0}`;

        // const expenseElement = document.getElementById('expenses');
        // expenseElement.textContent = `$${dashboardData.expenses || 0}`;

        const followerElement = document.getElementById('followers');
        const followersValue = dashboardData.followers ? `+${dashboardData.followers}` : '+0';
        followerElement.textContent = followersValue;

        const projectElement = document.getElementById('projects');
        const projectsValue = dashboardData.projects ? `+${dashboardData.projects}` : '+0';
        projectElement.textContent = projectsValue;

        const recordElement = document.getElementById('records');
        const recordsValue = dashboardData.records ? `+${dashboardData.records}` : '+0';
        recordElement.textContent = recordsValue;

        // Update the graph data
        const incomeData = dashboardData.income || [];
        const expenseData = dashboardData.expenseArr || [];

        myChart.data.datasets[0].data = incomeData;
        myChart.data.datasets[1].data = expenseData;
        myChart.update();
      })
      .catch(error => {
        console.error('Error fetching or updating dashboard data:', error);
      });
  } else {
    console.log('User is not logged in');
  }
}

fetchAndUpdateDashboardData();

let yourExpenses = 0;
async function getTotalExpenses() {
  try {
    const response = await fetch("http://localhost:8000/api/v1/auth/displayexpense");
    const data = await response.json();
    console.log("Expenses data:", data.expenses[0]);

    (data.expenses).map((expense) => {
      var checkemail = localStorage.getItem("email");
      if (checkemail === expense.useremail) {
        yourExpenses += Number(expense.amount);
      }
    });
    console.log("Here is the total expenses: ", yourExpenses);
  } catch (error) {
    console.log("Error fetching expenses:", error);
  }
}
getTotalExpenses().then(() => {
  yourExpenses = '₹' + yourExpenses;
  document.getElementById('expenses').innerHTML = yourExpenses
})

let amountToBeReceived = 0;
async function getSalesOrders() {
  try {
    const response = await fetch("http://localhost:8000/api/v1/auth/display-sales-order");
    const data = await response.json();
    var checkemail = localStorage.getItem("email");
    (data.salesOrder).map((dc) => {
      if (checkemail === dc.email) {
        amountToBeReceived += Number(dc.grandTotal)
      }
    });
  } catch (error) {
    console.log("Error fetching SalesOrders:", error);
  }
}



async function getpr() {
  try {
    const response = await fetch("http://localhost:8000/api/v1/auth/displaypr");
    const data = await response.json();

    (data.prs).map((pr) => {
      var checkemail = localStorage.getItem("email");
      if (checkemail === pr.useremail) {
        amountToBeReceived -= Number(pr.amount);
      }
    });
  } catch (error) {
    console.log("Error fetching prs:", error);
  }
}
getSalesOrders().then(() => {
  getpr().then( ()=> {
    amountToBeReceived = '₹' + Math.floor(amountToBeReceived);
    document.getElementById('amountToReceive').innerHTML = amountToBeReceived;
  })
})
