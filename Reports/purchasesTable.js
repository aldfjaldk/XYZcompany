function getPurchasesData() {
    const email = localStorage.getItem('email');
    if (email){
      fetch('http://localhost:8000/api/purchasesReport', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
      .then(response => response.json())
      .then(purchasesData => {
        let purchasesTableData = "";
        let totalPurchases = 0;

        (purchasesData).map((report) => {
          const purchasesWithTax = parseInt(report.purchasesWithTax);
          totalPurchases += purchasesWithTax;

            purchasesTableData += `
                <tr>
                    <td>${report.name}</td>
                    <td>${report.invoiceCount}</td>
                    <td>${report.purchases}</td>
                    <td>${report.purchasesWithTax}</td>
                </tr>
            `;
        });
        document.getElementById('purchasesTableBody').innerHTML = purchasesTableData;
        document.getElementById('totalPurchasesValue').textContent = `Total Purchases : ${ totalPurchases || 0}`;
      })
      .catch(error => {
        console.error('Error fetching or updating purchases data:', error);
      });
    }else{
        console.log('User is not logged in');
    }
}
getPurchasesData();