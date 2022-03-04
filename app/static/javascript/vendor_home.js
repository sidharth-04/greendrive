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
      percentageComplete: 100,
      currentVendorNumber: "9499994456",
      journeyDistribution: [
        ["van", 20],
        ["truck", 50],
        ["truck", 30]
      ]
    },
    {
      id: 2,
      pickupDate: "10/10/22",
      deliveryDate: "02/04/22",
      percentageComplete: 0,
      currentVendorNumber: "9499994456",
      journeyDistribution: [
        ["van", 20],
        ["truck", 50],
        ["truck", 30]
      ]
    },
    {
      id: 3,
      pickupDate: "10/10/22",
      deliveryDate: "02/04/22",
      percentageComplete: 10,
      currentVendorNumber: "9499994456",
      journeyDistribution: [
        ["van", 20],
        ["truck", 50],
        ["truck", 30]
      ]
    },
    {
      id: 4,
      pickupDate: "10/10/22",
      deliveryDate: "02/04/22",
      percentageComplete: 90,
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
    current.append("<div class='topholder'><p>"+shipments[i].percentageComplete+"%</p><p>Shipment #"+shipments[i].id+"</p><a href='/view_shipment/"+1+"'>More Info</a></div>");

    let journey = shipments[i].journeyDistribution;
    let middleholder = "<div class='middleholder'>";
    let leftToComplete = shipments[i].percentageComplete;
    for (let j = 0; j < journey.length; j ++) {
      if (leftToComplete >= journey[j][1]) {
        fillWidth = 100;
        leftToComplete -= journey[j][1];
      } else {
        fillWidth = leftToComplete/journey[j][1]*100;
        leftToComplete = 0;
      }
      middleholder += "<div class='journey-block' style='background: linear-gradient(to right, #1ABCC3 0% "+fillWidth+"%, white "+fillWidth+"% 100%); width: "+journey[j][1]+"%'><img src='./static/assets/TruckIcon.svg'></div>";
    }
    middleholder += "</div>";
    current.append(middleholder);

    let bottomholder = "<div class='bottomholder'>";
    bottomholder += "<p>"+shipments[i].pickupDate+"</p>";
    if (shipments[i].percentageComplete == 100) {
      bottomholder += "<button class='completed-shipment-tag'>Completed</button>"
    } else {
      bottomholder += "<button>Contact: "+shipments[i].currentVendorNumber+"</button>"
    }
    bottomholder += "<p>"+shipments[i].deliveryDate+"</p>";
    bottomholder += "</div>";
    current.append(bottomholder);
  }
}
