async function getCustomers() {
    try {
        const response = await fetch("http://localhost:8000/api/v1/auth/displaycustomer");
        const data = await response.json();
        console.log("Customers data:", data.customers[0]);
        console.log("data type of data.customers", typeof data.customers);
        
        // Display the customers data in the table
        let tableData = "";

        (data.customers).map((customer) => {
            //console.log(tableData);
            tableData += `
                <tr>
                    <td>${customer.firstname}</td>
                    <td>${customer.companyname}</td>
                    <td>${customer.customeremail}</td>
                    <td>${customer.workphone}</td>
                    <td>${customer.receivables}</td>
                </tr>
            `;
        });

        document.getElementById('customerTableBody').innerHTML = tableData;
    } catch (error) {
        console.log("Error fetching customers:", error);
    }
}

// Call the getCustomer function to fetch and display customer data initially
getCustomers();
