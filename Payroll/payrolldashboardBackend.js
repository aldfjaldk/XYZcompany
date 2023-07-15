function fetchAndUpdatePayrollDashboardData() {
    const email = localStorage.getItem('email');
  
    if (email) {
      fetch('http://localhost:8000/api/payrolldashboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })
        .then(response => response.json())
        .then(payrolldashboardData => {
          console.log('Payroll Dashboard data:', payrolldashboardData);
  
          const epfAmountElement = document.getElementById('epfAmount');
          epfAmountElement.textContent = `$${payrolldashboardData.epfAmount || 0}`;
  
          const esiAmountElement = document.getElementById('esiAmount');
          esiAmountElement.textContent = `$${payrolldashboardData.esiAmount || 0}`;

          const tdsAmountElement = document.getElementById('tdsAmount');
          tdsAmountElement.textContent = `$${payrolldashboardData.tdsAmount || 0}`;
  
          const activeEmployeesElement = document.getElementById('activeEmployeesCount');
          const activeEmployeesValue = payrolldashboardData.activeEmployeesCount ? `+${payrolldashboardData.activeEmployeesCount}` : '+0';
          activeEmployeesElement.textContent = activeEmployeesValue;
  
          // Update the graph data
          const totalCostData = payrolldashboardData.totalCostArr || [];
          myChart.data.datasets[0].data = totalCostData;
          myChart.update();
        })
        .catch(error => {
          console.error('Error fetching or updating dashboard data:', error);
        });
    } else {
      console.log('User is not logged in');
    }
  }
  
  fetchAndUpdatePayrollDashboardData();
  