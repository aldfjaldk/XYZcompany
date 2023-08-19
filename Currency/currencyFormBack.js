data = {
    date: "...",
    amount_to_convert : "...",   
    from : "...",
    to: "...",   
    notes: "..."
}
console.log("welcome to the currency page.")

async function postJSON(data) {
    try {
        const response = await fetch("http://localhost:8000/api/v1/auth/addCurrency", {
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
            window.location.href = "currencypage.html"
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
    data.useremail=localStorage.getCurrency("email");
    console.log("This is the data collected: ", data);
    postJSON(data)
}

function handleDate(event) {data.date = event.target.value;}
function handleAmount_to_convert(event) {data.amount_to_convert = event.target.value;}
function handleFrom(event) {data. from = event.target.value;}
function handleTo(event) {data.to = event.target.value;}
function handleNotes(event) {data.notes = event.target.value;}

document.getElementById("date").addEventListener("change", handleDate);
document.getElementById("amount_to_convert").addEventListener("change", handleAmount_to_convert);
document.getElementById(" from").addEventListener("change", handleFrom);
document.getElementById("to").addEventListener("change", handleTo);
document.getElementById("notes").addEventListener("change", handleNotes);
document.getElementById("mainForm").addEventListener("submit", handleSubmission);




