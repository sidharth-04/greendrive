$(document).ready(() => {
  let xhr = new XMLHttpRequest();
  xhr.open('POST','/vendor_home',true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    // let json = JSON.parse(xhr.response);
    // console.log(json);
  };
  xhr.send(null);

  shipments = [
    {
      id: 1,
      pickupDate: "10/10/22",
      deliveryDate: "02/04/22",
      percentageComplete: 100,
      currentVendorNumber: "9499994456",
      journeyDistribution: [
        ["truck", 20],
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
        ["truck", 20],
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
        ["truck", 20],
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
        ["truck", 20],
        ["truck", 50],
        ["truck", 30]
      ]
    }
  ]

  drawShipments(shipments);
});

function drawShipments(shipments) {
  for (let i = 0; i < shipments.length; i ++) {
    if (i == shipments.length-1) {
      $('.shipments-container').append("<div style='animation-delay: "+(i*50)+"ms; margin-bottom: 0;' class='shipment'></div>");
    } else {
      $('.shipments-container').append("<div style='animation-delay: "+(i*50)+"ms;' class='shipment'></div>");
    }
    let current = $('.shipments-container .shipment').last();
    current.on('click', () => {
      document.location = '/view_shipment/'+shipments[i].id;
    });
    current.append("<div class='topholder'><p>"+shipments[i].percentageComplete+"%</p><p>Shipment #"+shipments[i].id+"</p><a href='/view_shipment/"+shipments[i].id+"'>More Info</a></div>");

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
      middleholder += "<div class='journey-block' style='background: linear-gradient(to right, #1ABCC3 0% "+fillWidth+"%, white "+fillWidth+"% 100%); width: "+journey[j][1]+"%'><img src='./static/assets/"+journey[j][0]+".svg'></div>";
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
