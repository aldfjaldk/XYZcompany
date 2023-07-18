data = {
    name: "...",
    id: "...",
    gender: "...",   
    doj: "...",   
    email: "..." ,
    dob: "...",
    phone:"...",
    department:"...",
    designation:"...",
    basic:"...",
    rent:"...",
    conveyance:"...",
    fixed:"...",
    ctc:"..."
}
console.log("welcome to the employees page.")


async function postJSON(data) {
    try {
        const response = await fetch("http://localhost:8000/api/v1/auth/addEmployee", {
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

            window.location.href = "employees.html"
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
    console.log(event.target.value);
    console.log("This is the data collected: ", data);
    postJSON(data)
}

function handleName(event) {data.name = event.target.value;}
function handleId(event) {data.id = event.target.value; }
function handleGender(event) {data.gender = event.target.value;}
function handleDoj(event) {data.doj = event.target.value;}
function handleEmail(event) {data.email = event.target.value;}
function handleDob(event) {data.dob = event.target.value;}
function handlePhone(event) {data.phone = event.target.value;}
function handleDepartment(event) {data.department = event.target.value;}
function handleDesignation(event) {data.designation = event.target.value;}
function handleBasic(event) {data.basic = event.target.value;}
function handleRent(event) {data.rent = event.target.value; }
function handleConveyance(event) {data.conveyance = event.target.value;}
function handleFixed(event) {data.fixed = event.target.value;}
function handleCtc(event) {data.ctc = event.target.value;}


document.getElementById("name").addEventListener("change", handleName);
document.getElementById("id").addEventListener("change", handleId);
document.getElementById("gender").addEventListener("change", handleGender);
document.getElementById("doj").addEventListener("change", handleDoj);
document.getElementById("email").addEventListener("change", handleEmail);
document.getElementById("dob").addEventListener("change", handleDob);
document.getElementById("phone").addEventListener("change", handlePhone);
document.getElementById("department").addEventListener("change", handleDepartment);
document.getElementById("designation").addEventListener("change", handleDesignation);
document.getElementById("basic").addEventListener("change", handleBasic);
document.getElementById("rent").addEventListener("change", handleRent);
document.getElementById("conveyance").addEventListener("change", handleConveyance);
document.getElementById("fixed").addEventListener("change", handleFixed);
document.getElementById("ctc").addEventListener("change", handleCtc);
document.getElementById("mainForm").addEventListener("submit", handleSubmission);