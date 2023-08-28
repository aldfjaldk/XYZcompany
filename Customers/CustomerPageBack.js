data = {
    useremail: "...",
    firstname: "...",
    email: "...",   
    companyname: "....",   
    workphone: "..." ,
    receivables: "..."
}
async function getCustomers() {
    try {
        const response = await fetch("http://localhost:8000/api/v1/auth/displaycustomer");
        const data = await response.json();
        console.log("Customers data:", data.customers[0]);
        console.log("data type of data.customers", typeof data.customers);
        
        // Display the customers data in the table
        let tableData = "";

        (data.customers).map((customer) => {
            var checkemail=localStorage.getItem("email");
            if(checkemail===customer.useremail){
            //console.log(tableData);
            tableData += `
                <tr>
                    <td><input type="checkbox" class="entry-checkbox"></td>
                    <td>${customer.firstname}</td>
                    <td>${customer.companyname}</td>
                    <td>${customer.email}</td>
                    <td>${customer.workphone}</td>
                    <td>${customer.receivables}</td>
                </tr>
            `;
    }});

        document.getElementById('customerTableBody').innerHTML = tableData;
    } catch (error) {
        console.log("Error fetching customers:", error);
    }
}

// Call the getCustomer function to fetch and display customer data initially
getCustomers();



async function removeItem(id) {
    try {
        const response = await fetch(`http://localhost:8000/api/v1/auth/deletecustomer/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });
        const data = await response.json();
        console.log("Remove Item response:", data);

        // Call getVendors function again to refresh the table after removing the item
        getCustomers();
    } catch (error) {
        console.log("Error removing item:", error);
    }
}

async function editItem(id) {
    // You can add your own logic here to handle the edit functionality
    try {
      const response = await fetch("http://localhost:8000/api/v1/auth/displaycustomer");
      const d = await response.json();
      console.log("customer data:", d.customers[0]);
      (d.customers).map((customer) => {
          if(id===customer._id){
              document.querySelector('#firstname').value=customer.firstname;
              document.querySelector('#companyname').value=customer.companyname;
              document.querySelector('#email').value=customer.email;
              document.querySelector('#workphone').value=customer.workphone;
              document.querySelector('#receivables').value=customer.receivables; 
            //   document.querySelector('#sourceofsupply').value=vendor.sourceofsupply;
            //   document.querySelector('#openingbalance').value=vendor.openingbalance;
            //   document.querySelector('#paymentterms').value=vendor.paymentterms;
            //   document.querySelector('#website').value=vendor.website;
            //   document.querySelector('#GSTtreatment').value=vendor.GSTtreatment;
            //   document.querySelector('#tds').value=vendor.tds;
              data = {
                useremail: customer.useremail,
                firstname: customer.firstname,
                email: customer.email,   
                companyname: customer.companyname,   
                workphone: customer.workphone ,
                receivables: customer.receivables,
                // sourceofsupply: vendor.sourceofsupply,
                // openingbalance: vendor.openingbalance,
                // paymentterms: vendor.paymentterms,
                // website: vendor.website,
                // GSTtreatment: vendor.GSTtreatment,
                // tds: vendor.tds

              }       
}});  
} catch (error) {
  console.log("Error fetching customers:", error);
}
document.getElementsByClassName('main')[0].style.display="none";
document.getElementsByClassName('main2')[0].style.display="block";
removeItem(id);
  }

  async function postJSON(data) {
    try {
        const response = await fetch("http://localhost:8000/api/v1/auth/addCustomer", {
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

            window.location.href = "customerPage.html"
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

function handleName(event) {data.firstname = event.target.value;}
function handleEmail(event) {data.email = event.target.value;}
function handleCompany(event) {data.companyname = event.target.value;}
function handlePhone(event) {data.workphone = event.target.value;}
function handlePayables(event) {data.receivables = event.target.value;}
// function handlesourceofsupply(event) {data.sourceofsupply = event.target.value;}
// function handleopeningbalance(event) {data.openingbalance = event.target.value;}
// function handlepaymentterms(event) {data.paymentterms = event.target.value;}
// function handlewebsite(event) {data.website = event.target.value;}
// function handleGSTtreatment(event) {data.GSTtreatment = event.target.value;}
// function handletds(event) {data.tds = event.target.value;}


document.getElementById("firstname").addEventListener("change", handleName);
document.getElementById("email").addEventListener("change", handleEmail);
document.getElementById("companyname").addEventListener("change", handleCompany);
document.getElementById("workphone").addEventListener("change", handlePhone);
document.getElementById("receivables").addEventListener("change", handlePayables);
// document.getElementById("sourceofsupply").addEventListener("change", handlesourceofsupply);
// document.getElementById("openingbalance").addEventListener("change", handleopeningbalance);
// document.getElementById("paymentterms").addEventListener("change", handlepaymentterms);
// document.getElementById("website").addEventListener("change", handlewebsite);
// document.getElementById("GSTtreatment").addEventListener("change", handleGSTtreatment);
// document.getElementById("tds").addEventListener("change", handletds);
document.getElementById("mainForm2").addEventListener("submit", handleSubmission);