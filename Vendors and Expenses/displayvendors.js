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

async function editItem(id) {
    // You can add your own logic here to handle the edit functionality
    try {
      // Fetch the vendor data with the provided ID from the server
      const response = await fetch(`http://localhost:8000/api/v1/auth/showvendor/${id}`);
      const data = await response.json();
      console.log("previous data", data);
      console.log("vendorname: ",document.getElementById("vendorname"));
      // Assuming you have a form for editing the vendor data, you can populate the form fields with the fetched data
      
      document.getElementById("vendorname").value = data.vendor.vendorname;
      document.getElementById("company").value = data.vendor.company;
      document.getElementById("email").value = data.vendor.email;
      document.getElementById("phone").value = data.vendor.phone;
      document.getElementById("payables").value = data.vendor.payables;
      
  
      // Add an event listener to the form's submit button to update the vendor data on the server
      document.getElementById('mainForm').addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const updatedData = {
          vendorname: document.getElementById("vendorname").value,
          company: document.getElementById("company").value,
          email: document.getElementById("email").value,
          phone: document.getElementById("phone").value,
          payables: document.getElementById("payables").value,
        };
  
        // Send a PUT request to update the vendor data on the server
        const updatedresponce= await fetch(`http://localhost:8000/api/v1/auth/editvendor/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        });
        const data= await updatedresponce.json();

        // Refresh the table after the update
        getVendors();
      });
    } catch (error) {
      console.log("Error editing item:", error);
    }
  }