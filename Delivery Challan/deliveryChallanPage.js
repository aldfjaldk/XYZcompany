async function getDeliveryChallans() {
    try {
        const response = await fetch("http://localhost:8000/api/v1/auth/displayDeliveryChallan");
        const data = await response.json();
        console.log("DeliveryChallan data:", data.deliveryChallans[0]);
        console.log("data type of data.deliveryChallans", typeof data.deliveryChallans);

        // Display the DeliveryChallans data in the table
        let tableData = "";

        (data.deliveryChallans).map((dc) => {
            //console.log(tableData);
            tableData += `
                <tr>
                    <td>${dc.customerName}</td>
                    <td>${dc.deliveryChallan}</td>
                    <td>${dc.referenceNumber}</td>
                    <td>${dc.deliveryChallanDate}</td>
                    <td>${dc.challanType}</td>
                    <td>${dc.warehouseName}</td>
                    <td>${dc.subTotal}</td>
                </tr>
            `;
        });

        document.getElementById('customerTableBody').innerHTML = tableData;
    } catch (error) {
        console.log("Error fetching DeliveryChallans:", error);
    }
}

// Call the getDeliveryChallans function to fetch and display DeliveryChallans data initially
getDeliveryChallans();