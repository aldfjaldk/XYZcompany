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
        amountToPayElement.textContent = `$${dashboardData.amountToPay || 0}`;

        const amountToReceiveElement = document.getElementById('amountToReceive');
        amountToReceiveElement.textContent = `$${dashboardData.amountToReceive || 0}`;

        const currentBalanceElement = document.getElementById('currentBalance');
        currentBalanceElement.textContent = `Current balance: $${dashboardData.currentBalance || 0}`;

        const overdueElement = document.getElementById('overdue');
        overdueElement.textContent = `Over Due: $${dashboardData.overDue || 0}`;
        
        const currentBalanceElement2 = document.getElementById('currentBalance2');
        currentBalanceElement2.textContent = `Current balance: $${dashboardData.currentBalance || 0}`;

        const overdueElement2 = document.getElementById('overdue2');
        overdueElement2.textContent = `Over Due: $${dashboardData.overDue || 0}`;

        const expenseElement = document.getElementById('expenses');
        expenseElement.textContent = `$${dashboardData.expenses || 0}`;

        const followerElement = document.getElementById('followers');
        const followersValue = dashboardData.followers ? `+${dashboardData.followers}` : '+0';
        followerElement.textContent = followersValue;

        const projectElement = document.getElementById('projects');
        const projectsValue = dashboardData.projects ? `+${dashboardData.projects}` : '+0';
        projectElement.textContent = projectsValue;

        const recordElement = document.getElementById('records');
        const recordsValue  = dashboardData.records ? `+${dashboardData.records}` : '+0';
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
