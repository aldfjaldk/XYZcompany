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
                    <td><a class='edt' onclick='edit(this)'>Edit</td> 
                    <td><a class='dlt' onclick='delete(this)'>Delete</td> 
                </tr>
            `;
    }});

        document.getElementById('tablebody').innerHTML = tableData;
    } catch (error) {
        console.log("Error fetching expenses:", error);
    }
}

getExpenses();

function edit(y){
    var selectedtr=y.parentElement.parentElement;
    //alert(selectedtr.cells[6].innerHTML);
    document.querySelector('.amount2').value=selectedtr.cells[3].innerHTML;
}

