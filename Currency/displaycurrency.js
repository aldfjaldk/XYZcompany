data = {
    date: "...",
    amount_to_convert : "...",   
    from : "...",
    to: "...",   
    notes: "..."
   

}
async function getCurrencys() {
    try {
        const response = await fetch("http://localhost:8000/api/v1/auth/displaycurrency");
        const data = await response.json();
        console.log("Currencys data:", data.currencys[0]);
        console.log("data type of data.currencys", typeof data.currencys);
        
        // Display the currencys data in the table
        let tableData = "";

        (data.currencys).map((currency) => {
            var checkemail=localStorage.getCurrency("email");
            if(checkemail===item.useremail){
            //console.log(tableData);
            tableData += `
                <tr>
                   
                    <td>${currency.date}</td>
                    <td>${currency.amount_to_convert}</td>
                    <td>${currency.from}</td>
                    <td>${currency.to}</td>
                    <td>${currency.notes}</td>
                    <td><button class="btn btn-warning me-2" onclick="editCurrency('${currency._id}')">EDIT</button></td>
                    <td><button class="btn btn-danger me-2" onclick="removeCurrency('${currency._id}')">REMOVE</button></td>
                </tr>
            `;
        }});

        document.getElementById('tableBody').innerHTML = tableData;
    } catch (error) {
        console.log("Error fetching items:", error);
    }
}

// Call the getItems function to fetch and display currency data initially
getCurrencys();

async function removeItem(id)  {
    try {
        const response = await fetch(`http://localhost:8000/api/v1/auth/deletecurrency/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });
        const data = await response.json();
        console.log("Remove Item response:", data);

        // Call getCurrencys function again to refresh the table after removing the Currency
        getCurrencys();
    } catch (error) {
        console.log("Error removing item:", error);
    }
}

async function editCurrency(id) {
    // You can add your own logic here to handle the edit functionality
    try {
      const response = await fetch("http://localhost:8000/api/v1/auth/displaycurrency");
      const d = await response.json();
      (d.currencys).map((currency) => {
          if(id==currency._id){
            
              document.querySelector('#date').value=currency.date;
              document.querySelector('#amount_to_convert').value=currency.amount_to_convert;
              document.querySelector('#from').value=currency.from;
              document.querySelector('#to').value=currency.to;
              document.querySelector('#notes').value=currency.notes; 
              
              data = {
                date: currency.date,
                amount_to_convert: currency.amount_to_convert,
                from: currency.from,   
                to: currency.to,
                notes: currency.notes,
               }       
}});  
} catch (error) {
  console.log("Error fetching currencys:", error);
}
document.getElementsByClassName('main')[0].style.display="none";
document.getElementsByClassName('main2')[0].style.display="block";
removeItem(id);
  }

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

            window.location.href = "currency covertor page.html"
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
document.getElementById("mainForm2").addEventListener("submit", handleSubmission);

