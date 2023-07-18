//For automatic formatted date
var date = new Date();
var year = date.toLocaleString("default", { year: "numeric" });
var month = date.toLocaleString("default", { month: "2-digit" });
var day = date.toLocaleString("default", { day: "2-digit" });
var formatteddate= year + "-" + month + "-" + day;


data = {
    useremail: "...",
    eno:"Not defined",
    date: formatteddate,
    expenseaccount: "Not defined",
    amount:"Not defined",  
    paidthrough: "Not defined",   
    vendor: "Not defined" ,
    invoice: "Not defined",
    customer:"Not defined"
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
    catch(error) {
        console.log("Error: ", error);
    }
}

function handleSubmission (event) {
    event.preventDefault();
    data.useremail=localStorage.getItem("email");
    console.log("This is the data collected: ", data);
    postJSON(data)
}

function handleEno(event) {data.eno = event.target.value;}
function handleDate(event) {data.date = event.target.value;}
function handleExpenseAccount(event) {data.expenseaccount = event.target.value;}
function handleAmount(event) {data.amount = event.target.value;}
function handlePaidThrough(event) {data.paidthrough = event.target.value;}
function handleVendor(event) {data.vendor = event.target.value;}
function handleInvoice(event) {data.invoice = event.target.value;}
function handleCustomer(event) {data.customer = event.target.value;}


window.onload=function(){
document.getElementById("eno").addEventListener("change", handleEno);

const el = document.getElementById('date');
if (el) {el.addEventListener("change", handleDate);}
else{formatteddate.addEventListener("change", handleDate);}

document.getElementById("expenseaccount").addEventListener("change", handleExpenseAccount);
document.getElementById("amount").addEventListener("change", handleAmount);
document.getElementById("paidthrough").addEventListener("change", handlePaidThrough);
document.getElementById("vendor").addEventListener("change", handleVendor);
document.getElementById("invoice").addEventListener("change", handleInvoice);
document.getElementById("customer").addEventListener("change", handleCustomer);
document.getElementById("mainForm").addEventListener("submit", handleSubmission);
}