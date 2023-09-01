//For automatic formatted date
var date = new Date();
var year = date.toLocaleString("default", { year: "numeric" });
var month = date.toLocaleString("default", { month: "2-digit" });
var day = date.toLocaleString("default", { day: "2-digit" });
var formatteddate= year + "-" + month + "-" + day;


data = {
    useremail: "...",
    por:"Not defined",
    date: formatteddate,
    reference: "Not defined",
    amount:"Not defined",  
    edd: "Not defined",   
    vendor: "Not defined" ,
    customer:"Not defined"
}

async function postJSON(data) {
    try {
        const response = await fetch("http://localhost:8000/api/v1/auth/addPr", {
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
            window.location.href = "paymentreceived.html"
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

function handlepor(event) {data.por = event.target.value;}
function handleDate(event) {data.date = event.target.value;}
function handlereference(event) {data.reference = event.target.value;}
function handleAmount(event) {data.amount = event.target.value;}
function handleedd(event) {data.edd = event.target.value;}
function handleVendor(event) {data.vendor = event.target.value;}
function handleCustomer(event) {data.customer = event.target.value;}


window.onload=function(){
document.getElementById("por").addEventListener("change", handlepor);

const el = document.getElementById('date');
if (el) {el.addEventListener("change", handleDate);}
else{formatteddate.addEventListener("change", handleDate);}

document.getElementById("reference").addEventListener("change", handlereference);
document.getElementById("amount").addEventListener("change", handleAmount);
document.getElementById("edd").addEventListener("change", handleedd);
document.getElementById("vendor").addEventListener("change", handleVendor);
document.getElementById("customer").addEventListener("change", handleCustomer);
document.getElementById("mainForm").addEventListener("submit", handleSubmission);
}

//Code for fetching vendors name list
async function getVendors() {
    try {
        const response = await fetch("http://localhost:8000/api/v1/auth/displayvendor");
        const data = await response.json();
        let v = `<option>Select Vendor</option>`;
        (data.vendors).map((vendor) => {
            if(localStorage.getItem("email")==vendor.useremail){
            v += `<option value="${vendor.vendorname}">${vendor.vendorname}</option>`;
    }});
    document.getElementById('vendor').innerHTML = v;
    } catch (error) {}
}
getVendors();

//Code for fetching customers list
async function getCustomers() {
    try {
        const response = await fetch("http://localhost:8000/api/v1/auth/displaycustomer");
        const data = await response.json();
        let c=`<option>Select Customer</option>`;
        (data.customers).map((customer) => {
            if(localStorage.getItem("email")==customer.useremail){
            c += `<option value="${customer.firstname}">${customer.firstname}</option>`;
    }});
    document.getElementById('customer').innerHTML = c;
    } catch (error) {
    }
}
getCustomers();