async function getVendors() {
    try {
        const response = await fetch("http://localhost:8000/api/v1/auth/displayvendor");
        const data = await response.json();
        console.log("Vendors data:", data.vendors[0]);
        console.log("data type of data.vendors", typeof data.vendors);
        
        // Display the vendors data in the table
        let tableData = "";

        (data.vendors).map((vendor) => {
            //console.log(tableData);
            tableData += `
                <tr>
                    <td>${vendor.vendorname}</td>
                    <td>${vendor.company}</td>
                    <td>${vendor.email}</td>
                    <td>${vendor.phone}</td>
                    <td>${vendor.payables}</td>
                </tr>
            `;
        });

        document.getElementById('vendorTableBody').innerHTML = tableData;
    } catch (error) {
        console.log("Error fetching vendors:", error);
    }
}

// Call the getVendors function to fetch and display vendors data initially
getVendors();
