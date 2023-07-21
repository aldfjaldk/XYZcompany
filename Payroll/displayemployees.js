document.addEventListener("DOMContentLoaded", function() {
    fetch("http://localhost:8000/api/v1/auth/displayemployee")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log("myData: ", data);
            displayData(data); //complete this function
        })
        .catch((err) => {
            console.error("Error: ", err);
        });
});

function displayData(data) {
    let msgToBeDisplayed = '';

    for (let i = 0; i < data.employees.length; i++) {
        msgToBeDisplayed += `
        <div>
            <button class="collapsible">
                <p class="d1">Name: ${data.employees[i].name}</p>
                <p class="d2">Employee Id: ${data.employees[i].id}</p>
                <p class="d3">Designation: ${data.employees[i].designation}</p>
                <p class="d4" onclick="deleteEmployee('${data.employees[i]._id}')">Del</p>
                <p class="d5" onclick="deleteEmployee('${data.employees[i]._id}')">Del</p>
            </button>
            <div class="content">
                <p>Gender: ${data.employees[i].gender}</p>
                <p>Date of Joining: ${data.employees[i].doj}</p>
                <p>Email: ${data.employees[i].email}</p>
                <p>Mobile Number: ${data.employees[i].phone}</p>
                <p>Date of Birth: ${data.employees[i].dob}</p>
                <p>Department: ${data.employees[i].department}</p>
                <p>Salary(CTC): ${data.employees[i].ctc}</p>
            </div>
        </div>`;
    }

    document.getElementById("box").innerHTML = msgToBeDisplayed;

    // var coll = document.getElementsByClassName("collapsible");
    // var i;

    // for (i = 0; i < coll.length; i++) {
    //     coll[i].addEventListener("click", function () {
    //         this.classList.toggle("active");
    //         var content = this.nextElementSibling;
    //         if (content.style.maxHeight) {
    //             content.style.maxHeight = null;
    //         } else {
    //             content.style.maxHeight = content.scrollHeight + "px";
    //         }
    //     });
    // }
}

function deleteEmployee(id) {
    // Send a DELETE request to the server to delete the employee with the given ID
    fetch(`http://localhost:8000/api/v1/auth/deleteemployee/${id}`, {
        method: 'DELETE',
    })
    .then((response) => {
        if (!response.ok) {
            console.log(response);
            throw new Error('Network response was not ok');
        }
        // If the employee is successfully deleted, fetch the updated data and refresh the display
        return fetch("http://localhost:8000/api/v1/auth/displayemployee");
    })
    .then((response) => response.json())
    .then((data) => {
        console.log("myData: ", data);
        displayData(data); // Refresh the display with updated data
    })
    .catch((err) => {
        console.error('Error deleting employee:', err);
    });
}
