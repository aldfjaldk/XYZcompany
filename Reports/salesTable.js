function getSalesData() {
    const email = localStorage.getItem('email');
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
        let salesTableData = "";
        let totalSales = 0;

        (salesData).map((report) => {
          const salesWithTax = parseInt(report.salesWithTax);
          totalSales += salesWithTax;

            salesTableData += `
                <tr>
                    <td>${report.name}</td>
                    <td>${report.invoiceCount}</td>
                    <td>${report.sales}</td>
                    <td>${report.salesWithTax}</td>
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