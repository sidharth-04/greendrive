$(document).ready(() => {
  // let xhr = new XMLHttpRequest();
  // xhr.open('GET','/get_module_status',true);
  // xhr.setRequestHeader('Content-Type', 'application/json');
  // xhr.onload = function() {
  //   statusIndication(JSON.parse(xhr.response));
  // };
  // xhr.send(null);
  shipments = [
    {
      id: 1,
      pickupDate: "10/10/22",
      deliveryDate: "02/04/22",
      percentageComplete: 70,
      currentVendorNumber: "9499994456",
      journeyDistribution: [
        ["van", 20],
        ["truck", 50],
        ["truck", 30]
      ]
    }
  ]

  drawShipments(shipments);
});

function drawShipments(shipments) {
  for (let i = 0; i < shipments.length; i ++) {
    $('.shipments-container').append("<div class='shipment'></div>");
    let current = $('.shipments-container .shipment').last();
    current.append("<div class='d-flex'><p>"+shipments[i].percentageComplete+"</p><p>Shipment "+shipments[i].id+"</p><a href='/view_shipment/"+1+"'>More Info</a></div>");
  }
}
