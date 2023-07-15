async function getVendors() {
    try {
        const response = await fetch("http://localhost:8000/api/v1/auth/displayvendor");
        const data = await response.json();
        console.log("Vendors data:", data.vendors[0]);
        console.log("data type of data.vendors", typeof data.vendors);
        
        // Display the vendors data in the table
        let tableData = "";

        (data.vendors).map((vendor) => {
            var checkemail=localStorage.getItem("email");
            if(checkemail===vendor.useremail){
            //console.log(tableData);
            tableData += `
                <tr>
                    <td>${vendor.vendorname}</td>
                    <td>${vendor.company}</td>
                    <td>${vendor.email}</td>
                    <td>${vendor.phone}</td>
                    <td>${vendor.payables}</td>
                    <td><button class="btn btn-outline-danger me-2" onclick="removeItem('${vendor._id}')">REMOVE</button></td>
                </tr>
            `;
    }});

        document.getElementById('vendorTableBody').innerHTML = tableData;
    } catch (error) {
        console.log("Error fetching vendors:", error);
    }
}

// Call the getVendors function to fetch and display vendors data initially

getVendors();

async function removeItem(id) {
    try {
        const response = await fetch(`http://localhost:8000/api/v1/auth/deletevendor/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });
        const data = await response.json();
        console.log("Remove Item response:", data);

        // Call getVendors function again to refresh the table after removing the item
        getVendors();
    } catch (error) {
        console.log("Error removing item:", error);
    }
}
