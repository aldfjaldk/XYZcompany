async function getItems() {
    try {
        const response = await fetch("http://localhost:8000/api/v1/auth/displayitem");
        const data = await response.json();
        console.log("Items data:", data.items[0]);
        console.log("data type of data.items", typeof data.items);
        
        // Display the items data in the table
        let tableData = "";

        (data.items).map((item) => {
            var checkemail=localStorage.getItem("email");
            if(checkemail===item.useremail){
            //console.log(tableData);
            tableData += `
                <tr>
                    <td><input type="checkbox" class="entry-checkbox"></td>
                    <td>${item.fullname}</td>
                    <td>${item.description}</td>
                    <td>${item.email}</td>
                    <td>${item.stock}</td>
                    <td>${item.hsncode}</td>
                    <td>${item.sku}</td>
                </tr>
            `;
        }});

        document.getElementById('itemTableBody').innerHTML = tableData;
    } catch (error) {
        console.log("Error fetching items:", error);
    }
}

// Call the getItems function to fetch and display items data initially
getItems();
