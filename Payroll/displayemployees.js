async function getEmployees() {
    try {
        const response = await fetch("http://localhost:8000/api/v1/auth/displayemployee");
        const data = await response.json();
        console.log("Employees data:", data.employees[0]);
        console.log("data type of data.employees", typeof data.employees);
        
        // Display the vendors data in the table
        let tableData = "";

        (data.employees).map((employee) => {
            var checkemail=localStorage.getItem("email");
            if(checkemail===employee.useremail){
            console.log(tableData);
            tableData += `
                <div>
                <button type="button" class="collapsible"><p class="d1">${employee.name}</p><p class="d2">Employee Id: ${employee.id}</p><p class="d3">${employee.designation}</p></button>
                <div class="content">
                    <p>Gender: ${employee.gender}</p>
                    <p>Date of Joining: ${employee.doj}</p>
                    <p>Email: ${employee.email}</p>
                    <p>Mobile Number: ${employee.phone}</p>
                    <p>Date of Birth: ${employee.dob}</p>
                    <p>Department: ${employee.department}</p>
                    <p>Salary(CTC): ${employee.ctc}</p>
                </div>
                </div>
            `;
    }});

        document.getElementById('box').innerHTML = tableData;
    } catch (error) {
        console.log("Error fetching employees:", error);
    }
}

getEmployees();