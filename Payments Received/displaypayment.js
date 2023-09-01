data = {
    useremail: "...",
    por:"...",
    date: "...",
    reference: "...",
    amount:"Not defined",
    edd: "Not defined",   
    vendor: "Not defined" ,
    customer:"Not defined"
}

async function getpr() {
    try {
        const response = await fetch("http://localhost:8000/api/v1/auth/displaypr");
        const data = await response.json();
        console.log("Payments data:", data.prs[0]);
        
        let tableData = "";
        (data.prs).map((pr) => {
            var checkemail=localStorage.getItem("email");
            if(checkemail===pr.useremail){
            tableData += `
                <tr>
                    <td>${pr.por}</td>
                    <td>${pr.date}</td>
                    <td>${pr.reference}</td>
                    <td>${pr.amount}</td>
                    <td>${pr.edd}</td>
                    <td>${pr.vendor}</td>
                    <td><button id="edit-btn" onclick="edit('${pr._id}')">EDIT</button></td>
                    <td><button id="delete-btn" onclick="deleteItem('${pr._id}')">DELETE</button></td>
                    <td><button id="download-btn" onclick="download('${pr._id}')" id="download">DOWNLOAD</button></td>
                </tr>
            `;
    }});

        document.getElementById('tablebody').innerHTML = tableData;
    } catch (error) {
        console.log("Error fetching prs:", error);
    }
}
getpr();

async function deleteItem(id) {
    try {
        const response = await fetch(`http://localhost:8000/api/v1/auth/deletepr/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });
        const data = await response.json();
        console.log("Delete Item response:", data);

        getpr();
    } catch (error) {
        console.log("Error removing item:", error);
    }
}

async function edit(id){
    try {
        const response = await fetch("http://localhost:8000/api/v1/auth/displaypr");
        const d = await response.json();
        (d.prs).map((pr) => {
            if(id==pr._id){
                document.querySelector('#por2').value=pr.por;
                document.querySelector('#date2').value=pr.date;
                document.querySelector('#reference2').value=pr.reference;
                document.querySelector('#amount2').value=pr.amount;
                document.querySelector('#edd2').value=pr.edd;
                document.querySelector('#vendor2').value=pr.vendor;
                document.querySelector('#customer2').value=pr.customer;

                data={
                    useremail: pr.useremail,
                    por:pr.por,
                    date: pr.date,
                    reference: pr.reference,
                    amount:pr.amount,  
                    edd: pr.edd,   
                    vendor: pr.vendor ,
                    customer:pr.customer
                }
}});  
} catch (error) {
    console.log("Error fetching prs:", error);
}
document.getElementsByClassName('main')[0].style.display="none";
document.getElementsByClassName('main2')[0].style.display="block";
deleteItem(id);
function handlePor(event) {data.por = event.target.value;}
function handleDate(event) {data.date = event.target.value;}
function handleReference(event) {data.reference = event.target.value;}
function handleAmount(event) {data.amount = event.target.value;}
function handleEdd(event) {data.edd = event.target.value;}
function handleVendor(event) {data.vendor = event.target.value;}
function handleCustomer(event) {data.customer = event.target.value;}

document.getElementById("por2").addEventListener("change", handlePor);
document.getElementById("date2").addEventListener("change", handleDate);
document.getElementById("reference2").addEventListener("change", handleReference);
document.getElementById("amount2").addEventListener("change", handleAmount);
document.getElementById("edd2").addEventListener("change", handleEdd);
document.getElementById("vendor2").addEventListener("change", handleVendor);
document.getElementById("customer2").addEventListener("change", handleCustomer);
document.getElementById("mainForm2").addEventListener("submit", handleSubmission);
}

async function postJSON(data) {
    try {
        const response = await fetch("http://localhost:8000/api/v1/auth/addpr", {
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
    catch(error) {}
}

function handleSubmission (event) {
    event.preventDefault();
    data.useremail=localStorage.getItem("email");
    postJSON(data)
}



async function download(dataid) {
    try {
        const response = await fetch("http://localhost:8000/api/v1/auth/displaypr");
        const data = await response.json();
        console.log("ello");
        (data.prs).map((pr) => {
            if(dataid===pr._id){
                document.getElementById('por').innerHTML=pr.por;
                document.getElementById('date').innerHTML=pr.date;
                document.getElementById('reference').innerHTML=pr.reference;
                document.getElementById('amount').innerHTML=pr.amount;
                document.getElementById('edd').innerHTML=pr.edd;
                document.getElementById('vendor').innerHTML=pr.vendor;
                document.getElementById('customer').innerHTML=pr.customer;

                const invoice = this.document.getElementById("invoice");
                var opt = {
                    margin: 1,
                    filename: 'prReceipt.pdf',
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
                };
                document.getElementById('invoice').style.display="block";
                html2pdf().from(invoice).set(opt).save();   
                console.log("hii"); 
    }}); 
    } catch (error) {}
    setTimeout(() => {document.getElementById('invoice').style.display="none";},0.00001);
}
