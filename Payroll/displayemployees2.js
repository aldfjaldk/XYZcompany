fetch("http://localhost:8000/api/v1/auth/displayemployee")
    .then((response) => {
        return response.json();
    })
    .then((data)=> {
        console.log("myData: ", data);
        displayData(data) //complete this function
    })
    .catch((err) => [
        console.error("Error: ", err)
    ])
    
function displayData(data) {
    let msgToBeDisplayed = ""
    msgToBeDisplayed += ("name: " + data.employees[0].name)
    msgToBeDisplayed += (", id: " + data.employees[0].id)
    msgToBeDisplayed += (", gender: " + data.employees[0].gender)
    document.getElementById("box").innerHTML = msgToBeDisplayed;
}