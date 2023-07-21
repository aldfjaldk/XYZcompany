data = {
  useremail: "...",
  vendorname: "...",
  email: "...",   
  company: "....",   
  phone: "..." ,
  payables: "..."
}
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
                    <td><button class="btn btn-warning me-2" onclick="editItem('${vendor._id}')">EDIT</button></td>
                    <td><button class="btn btn-danger me-2" onclick="removeItem('${vendor._id}')">REMOVE</button></td>
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
      const response = await fetch("http://localhost:8000/api/v1/auth/displayvendor");
      const d = await response.json();
      console.log("vendor data:", d.vendors[0]);
      (d.vendors).map((vendor) => {
          if(id===vendor._id){
              document.querySelector('#vendorname').value=vendor.vendorname;
              document.querySelector('#company').value=vendor.company;
              document.querySelector('#email').value=vendor.email;
              document.querySelector('#phone').value=vendor.phone;
              document.querySelector('#payables').value=vendor.payables; 
              data = {
                useremail: vendor.useremail,
                vendorname: vendor.vendorname,
                email: vendor.email,   
                company: vendor.company,   
                phone: vendor.phone ,
                payables: vendor.payables
              }       
}});  
} catch (error) {
  console.log("Error fetching vendors:", error);
}
document.getElementsByClassName('main')[0].style.display="none";
document.getElementsByClassName('main2')[0].style.display="block";
removeItem(id);
  }

  async function postJSON(data) {
    try {
        const response = await fetch("http://localhost:8000/api/v1/auth/addVendor", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const result = await response.json();
        console.log("Success: ", result);
        if (result.success) {
            console.log("data added", data);

            window.location.href = "vendors.html"
        }
        else {
            alert("try again");
        }
    }
    catch(error) {
        console.log("Error: ", error);
    }
}

function handleSubmission (event) {
    event.preventDefault();
    data.useremail=localStorage.getItem("email");
    //document.getElementById("inputEmail").value=useremail;
    console.log("This is the data collected: ", data);
    postJSON(data)
}

function handleName(event) {data.vendorname = event.target.value;}
function handleEmail(event) {data.email = event.target.value;}
function handleCompany(event) {data.company = event.target.value;}
function handlePhone(event) {data.phone = event.target.value;}
function handlePayables(event) {data.payables = event.target.value;}


document.getElementById("vendorname").addEventListener("change", handleName);
document.getElementById("email").addEventListener("change", handleEmail);
document.getElementById("company").addEventListener("change", handleCompany);
document.getElementById("phone").addEventListener("change", handlePhone);
document.getElementById("payables").addEventListener("change", handlePayables);
document.getElementById("mainForm2").addEventListener("submit", handleSubmission);