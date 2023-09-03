function getSalesData() {
    const email = localStorage.getItem('email');
    console.log(email) ;
    if (email){
      fetch('http://localhost:8000/api/salesReport', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
      .then(response => response.json())
      .then(salesData => {
        console.log(salesData) ;
        let salesTableData = "";
        let totalSales = 0;

        (salesData).map((report) => {
          const salesWithTax = parseInt(report.amount);
          totalSales += salesWithTax;
          console.log(report) ;
            salesTableData += `
                <tr>
                    <td>${report.date}</td>
                    <td>${report.reference}</td>
                    <td>${report.edd}</td>
                    <td>${report.customer}</td>
                    <td>${report.amount}</td>
                </tr>
            `;
        });

        
        document.getElementById('salesTableBody').innerHTML = salesTableData;
        document.getElementById('totalSalesValue').textContent = `Total Sales : ${ totalSales || 0}`;
      })
      .catch(error => {
        console.error('Error fetching or updating sales data:', error);
      });
    }else{
        console.log('User is not logged in');
    }
}
getSalesData();
