data = {
    useremail: "...",
    paymentDate: "...",
    paymentNumber: "...",   
    reference: "....",   
    vendorname: "..." ,
    paymentMode: "...",
    paymentMade: "...",
    email: "....",
    paidThrough: "..."

}
async function getPayments() {
    try {
        const response = await fetch("http://localhost:8000/api/v1/auth/displaypayment");
        const data = await response.json();
        console.log("Payments data:", data.payments[0]);
        console.log("data type of data.payments", typeof data.payments);
        
        // Display the payments data in the table
        let tableData = "";

        (data.payments).map((payment) => {
            var checkemail=localStorage.getItem("email");
            if(checkemail===payment.useremail){
            //console.log(tableData);
            tableData += `
                <tr>
                    <td><input type="checkbox" class="entry-checkbox"></td>
                    <td>${payment.paymentDate}</td>
                    <td>${payment.paymentNumber}</td>
                    <td>${payment.reference}</td>
                    <td>${payment.vendorname}</td>
                    <td>${payment.paymentMode}</td>
                    <td>${payment.paymentMade}</td>
                    <td>${payment.email}</td>
                    <td><button class="btn btn-warning me-2" onclick="editItem('${payment._id}')">EDIT</button></td>
                    <td><button class="btn btn-danger me-2" onclick="removeItem('${payment._id}')">REMOVE</button></td>
                </tr>
            `;
        }});

        document.getElementById('tablebody').innerHTML = tableData;
    } catch (error) {
        console.log("Error fetching payments:", error);
    }
}

// Call the getPayments function to fetch and display payments data initially
getPayments();

async function removeItem(id) {
    try {
        const response = await fetch(`http://localhost:8000/api/v1/auth/deletepayment/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });
        const data = await response.json();
        console.log("Remove Payment response:", data);

        // Call getPayments function again to refresh the table after removing the payment
        getPayments();
    } catch (error) {
        console.log("Error removing payment:", error);
    }
}

async function editItem(id) {
    // You can add your own logic here to handle the edit functionality
    try {
      const response = await fetch("http://localhost:8000/api/v1/auth/displaypayment");
      const d = await response.json();
      console.log("payment data:", d.payments[0]);
      (d.payments).map((payment) => {
          if(id===payment._id){
              document.querySelector('#paymentDate').value=payment.paymentDate;
              document.querySelector('#paymentNumber').value=payment.paymentNumber;
              document.querySelector('#reference').value=payment.reference;
              document.querySelector('#vendorname').value=payment.vendorname;
              document.querySelector('#paymentMode').value=payment.paymentMode; 
              document.querySelector('#paymentMade').value=payment.paymentMade;
              document.querySelector('#email').value=payment.email;
              document.querySelector('#paidThrough').value=payment.paidThrough;
              
              data = {
                paymentDate: payment.paymentDate,
                paymentNumber: payment.paymentNumber,
                reference: payment.reference,   
                vendorname: payment.vendorname,   
                paymentMode: payment.paymentMode ,
                paymentMade: payment.paymentMade,
                email: payment.email,
                paidThrough: payment.paidThrough

              }       
}});  
} catch (error) {
  console.log("Error fetching payments:", error);
}
document.getElementsByClassName('main')[0].style.display="none";
document.getElementsByClassName('main2')[0].style.display="block";
removePayment(id);
  }

  async function postJSON(data) {
    try {
        const response = await fetch("http://localhost:8000/api/v1/auth/addPayment", {
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

            window.location.href = "paymentsmade.html"
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
    data.useremail=localStorage.getPayment("email");
    //document.getElementById("inputEmail").value=useremail;
    console.log("This is the data collected: ", data);
    postJSON(data)
}

function handlePaymentDate(event) {data.paymentDate = event.target.value;}
function handlePaymentNumber(event) {data.paymentNumber = event.target.value;}
function handleReference(event) {data.reference = event.target.value;}
function handleVendorname(event) {data.vendorname = event.target.value;}
function handlePaymentMode(event) {data.paymentMode = event.target.value;}
function handlePaymentMade(event) {data.paymentMade = event.target.value;}
function handleEmail(event) {data.email = event.target.value;}
function handlePaidThrough(event) {data.paidThrough = event.target.value;}

document.getElementById("paymentDate").addEventListener("change", handlePaymentDate);
document.getElementById("paymentNumber").addEventListener("change", handlePaymentNumber);
document.getElementById("email").addEventListener("change", handleEmail);
document.getElementById("reference").addEventListener("change", handleReference);
document.getElementById("vendorname").addEventListener("change", handleVendorname);
document.getElementById("paymentMode").addEventListener("change", handlePaymentMode);
document.getElementById("paymentMade").addEventListener("change", handlePaymentMade);
document.getElementById("paidThrough").addEventListener("change", handlePaidThrough);

document.getElementById("mainForm2").addEventListener("submit", handleSubmission);

