data = {
    useremail: "...",
    eno:"...",
    date: "...",
    expenseaccount: "...",
    amount:"Not defined",  
    paidthrough: "Not defined",   
    vendor: "Not defined" ,
    invoice: "Not defined",
    customer:"Not defined"
}

async function getExpenses() {
    try {
        const response = await fetch("http://localhost:8000/api/v1/auth/displayexpense");
        const data = await response.json();
        console.log("Expenses data:", data.expenses[0]);
        
        let tableData = "";
        (data.expenses).map((expense) => {
            var checkemail=localStorage.getItem("email");
            if(checkemail===expense.useremail){
            tableData += `
                <tr>
                    <td>${expense.eno}</td>
                    <td>${expense.date}</td>
                    <td>${expense.expenseaccount}</td>
                    <td>${expense.amount}</td>
                    <td>${expense.vendor}</td>
                    <td><button id="edit-btn" onclick="edit('${expense._id}')">EDIT</button></td>
                    <td><button id="delete-btn" onclick="deleteItem('${expense._id}')">DELETE</button></td>
                    <td><button id="download-btn" onclick="download('${expense._id}')" id="download">DOWNLOAD</button></td>
                </tr>
            `;
    }});

        document.getElementById('tablebody').innerHTML = tableData;
    } catch (error) {
        console.log("Error fetching expenses:", error);
    }
}
getExpenses();

async function deleteItem(id) {
    try {
        const response = await fetch(`http://localhost:8000/api/v1/auth/deleteexpense/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });
        const data = await response.json();
        console.log("Delete Item response:", data);

        getExpenses();
    } catch (error) {
        console.log("Error removing item:", error);
    }
}

async function edit(id){
    try {
        const response = await fetch("http://localhost:8000/api/v1/auth/displayexpense");
        const d = await response.json();
        (d.expenses).map((expense) => {
            if(id==expense._id){
                document.querySelector('#eno2').value=expense.eno;
                document.querySelector('#date2').value=expense.date;
                document.querySelector('#expenseaccount2').value=expense.expenseaccount;
                document.querySelector('#amount2').value=expense.amount;
                document.querySelector('#paidthrough2').value=expense.paidthrough;
                document.querySelector('#vendor2').value=expense.vendor;
                //document.getElementById('invoice').innerHTML=expense.invoice;
                document.querySelector('#customer2').value=expense.customer;

                data={
                    useremail: expense.useremail,
                    eno:expense.eno,
                    date: expense.date,
                    expenseaccount: expense.expenseaccount,
                    amount:expense.amount,  
                    paidthrough: expense.paidthrough,   
                    vendor: expense.vendor ,
                    invoice:expense.invoice,
                    customer:expense.customer
                }
}});  
} catch (error) {
    console.log("Error fetching expenses:", error);
}
document.getElementsByClassName('main')[0].style.display="none";
document.getElementsByClassName('main2')[0].style.display="block";
deleteItem(id);
function handleEno(event) {data.eno = event.target.value;}
function handleDate(event) {data.date = event.target.value;}
function handleExpenseAccount(event) {data.expenseaccount = event.target.value;}
function handleAmount(event) {data.amount = event.target.value;}
function handlePaidThrough(event) {data.paidthrough = event.target.value;}
function handleVendor(event) {data.vendor = event.target.value;}
function handleInvoice(event) {data.invoice = event.target.value;}
function handleCustomer(event) {data.customer = event.target.value;}

document.getElementById("eno2").addEventListener("change", handleEno);
document.getElementById("date2").addEventListener("change", handleDate);
document.getElementById("expenseaccount2").addEventListener("change", handleExpenseAccount);
document.getElementById("amount2").addEventListener("change", handleAmount);
document.getElementById("paidthrough2").addEventListener("change", handlePaidThrough);
document.getElementById("vendor2").addEventListener("change", handleVendor);
document.getElementById("invoice2").addEventListener("change", handleInvoice);
document.getElementById("customer2").addEventListener("change", handleCustomer);
document.getElementById("mainForm2").addEventListener("submit", handleSubmission);
}

async function postJSON(data) {
    try {
        const response = await fetch("http://localhost:8000/api/v1/auth/addExpense", {
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
            window.location.href = "expenses.html"
        }
        else {
            alert("try again");
        }
    }
    catch(error) {}
}

function handleSubmission (event) {
    event.preventDefault();
    data.useremail=localStorage.getItem("email");
    postJSON(data)
}



async function download(dataid) {
    try {
        const response = await fetch("http://localhost:8000/api/v1/auth/displayexpense");
        const data = await response.json();
        (data.expenses).map((expense) => {
            if(dataid==expense._id){
                document.getElementById('eno').innerHTML=expense.eno;
                document.getElementById('date').innerHTML=expense.date;
                document.getElementById('expenseaccount').innerHTML=expense.expenseaccount;
                document.getElementById('amount').innerHTML=expense.amount;
                document.getElementById('paidthrough').innerHTML=expense.paidthrough;
                document.getElementById('vendor').innerHTML=expense.vendor;
                //document.getElementById('invoice').innerHTML=expense.invoice;
                document.getElementById('customer').innerHTML=expense.customer;

                const invoice = this.document.getElementById("invoice");
                var opt = {
                    margin: 1,
                    filename: 'ExpenseReceipt.pdf',
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
                };
                document.getElementById('invoice').style.display="block";
                html2pdf().from(invoice).set(opt).save();    
    }}); 
    } catch (error) {}
    setTimeout(() => {document.getElementById('invoice').style.display="none";},0.00001);
}
