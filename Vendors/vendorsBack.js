data = {
    useremail: "...",
    vendorname: "...",
    email: "...",   
    company: "....",   
    phone: "..." ,
    payables: "...",
    sourceofsupply: "...",
    openingbalance: "...",
    paymentterms: "...",
    website: "...",
    GSTtreatment: "...",
    tds: "..."

}
console.log("welcome to the vendors page.")


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
function handlesourceofsupply(event) {data.sourceofsupply = event.target.value;}
function handleopeningbalance(event) {data.openingbalance = event.target.value;}
function handlepaymentterms(event) {data.paymentterms = event.target.value;}
function handlewebsite(event) {data.website = event.target.value;}
function handleGSTtreatment(event) {data.GSTtreatment = event.target.value;}
function handletds(event) {data.tds = event.target.value;}


document.getElementById("vendorname").addEventListener("change", handleName);
document.getElementById("email").addEventListener("change", handleEmail);
document.getElementById("company").addEventListener("change", handleCompany);
document.getElementById("phone").addEventListener("change", handlePhone);
document.getElementById("payables").addEventListener("change", handlePayables);
document.getElementById("sourceofsupply").addEventListener("change", handlesourceofsupply);
document.getElementById("openingbalance").addEventListener("change", handleopeningbalance);
document.getElementById("paymentterms").addEventListener("change", handlepaymentterms);
document.getElementById("website").addEventListener("change", handlewebsite);
document.getElementById("GSTtreatment").addEventListener("change", handleGSTtreatment);
document.getElementById("tds").addEventListener("change", handletds);
document.getElementById("mainForm").addEventListener("submit", handleSubmission);
