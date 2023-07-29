data = {
    useremail: "...",
    fullname: "...",
    description: "...",   
    email: "....",   
    stock: "..." ,
    hsncode: "...",
    sku: "...",
    unit: "...",
    tax: "...",
    sp: "...",
    account: "..."

}
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
                    <td><button class="btn btn-warning me-2" onclick="editItem('${item._id}')">EDIT</button></td>
                    <td><button class="btn btn-danger me-2" onclick="removeItem('${item._id}')">REMOVE</button></td>
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

async function removeItem(id) {
    try {
        const response = await fetch(`http://localhost:8000/api/v1/auth/deleteitem/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });
        const data = await response.json();
        console.log("Remove Item response:", data);

        // Call getItems function again to refresh the table after removing the item
        getItems();
    } catch (error) {
        console.log("Error removing item:", error);
    }
}

async function editItem(id) {
    // You can add your own logic here to handle the edit functionality
    try {
      const response = await fetch("http://localhost:8000/api/v1/auth/displayitem");
      const d = await response.json();
      console.log("item data:", d.items[0]);
      (d.items).map((item) => {
          if(id===item._id){
              document.querySelector('#fullname').value=item.fullname;
              document.querySelector('#description').value=item.description;
              document.querySelector('#email').value=item.email;
              document.querySelector('#stock').value=item.stock;
              document.querySelector('#hsncode').value=item.hsncode; 
              document.querySelector('#sku').value=item.sku;
              document.querySelector('#unit').value=item.unit;
              document.querySelector('#tax').value=item.tax;
              document.querySelector('#sp').value=item.sp;
              document.querySelector('#account').value=item.account;
              data = {
                useremail: item.useremail,
                fullname: item.fullname,
                description: item.description,   
                email: item.email,   
                stock: item.stock ,
                hsncode: item.hsncode,
                sku: item.sku,
                unit: item.unit,
                tax: item.tax,
                sp: item.sp,
                account: item.account

              }       
}});  
} catch (error) {
  console.log("Error fetching items:", error);
}
document.getElementsByClassName('main')[0].style.display="none";
document.getElementsByClassName('main2')[0].style.display="block";
removeItem(id);
  }

  async function postJSON(data) {
    try {
        const response = await fetch("http://localhost:8000/api/v1/auth/addItem", {
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

            window.location.href = "itemspage.html"
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

function handleName(event) {data.fullname = event.target.value;}
function handleDescription(event) {data.description = event.target.value;}
function handleEmail(event) {data.email = event.target.value;}
function handleStock(event) {data.stock = event.target.value;}
function handleHsncode(event) {data.hsncode = event.target.value;}
function handleSKU(event) {data.sku = event.target.value;}
function handleUnit(event) {data.unit = event.target.value;}
function handleTax(event) {data.tax = event.target.value;}
function handleSp(event) {data.sp = event.target.value;}
function handleAccount(event) {data.account = event.target.value;}

document.getElementById("fullname").addEventListener("change", handleName);
document.getElementById("description").addEventListener("change", handleDescription);
document.getElementById("email").addEventListener("change", handleEmail);
document.getElementById("stock").addEventListener("change", handleStock);
document.getElementById("hsncode").addEventListener("change", handleHsncode);
document.getElementById("sku").addEventListener("change", handleSKU);
document.getElementById("unit").addEventListener("change", handleUnit);
document.getElementById("tax").addEventListener("change", handleTax);
document.getElementById("sp").addEventListener("change", handleSp);
document.getElementById("account").addEventListener("change", handleAccount);
document.getElementById("mainForm2").addEventListener("submit", handleSubmission);

