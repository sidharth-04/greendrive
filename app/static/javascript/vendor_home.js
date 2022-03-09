$(document).ready(() => {
  let xhr = new XMLHttpRequest();
  xhr.open('POST','/vendor_home',true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    let json = JSON.parse(xhr.response);
    if (json["Data"]["deliveryDate"] == []) {
      alertNoShipments();
    } else {
      drawShipments(json["Data"]);
    }
  };
  xhr.send(null);
});

function alertNoShipments() {
  $('.shipments-container').append("<p>You don't have any shipments currently.</p>");
}

function drawShipments(shipments) {
  console.log(shipments);
  for (let i = 0; i < Object.keys(shipments).length; i ++) {
    if (shipments[i]['journeyDistribution'] == "No Journey") {
      continue;
    }
    if (i == shipments.length-1) {
      $('.shipments-container').append("<div style='animation-delay: "+(i*50)+"ms; margin-bottom: 0;' class='shipment'></div>");
    } else {
      $('.shipments-container').append("<div style='animation-delay: "+(i*50)+"ms;' class='shipment'></div>");
    }
    let current = $('.shipments-container .shipment').last();
    current.on('click', () => {
      document.location = '/view_shipment/'+i;
    });

    // Delete when all good
    shipments[i].percentageComplete = Math.trunc(shipments[i]['path'][0]) % 100;
    current.append("<div class='topholder'><p>"+shipments[i].percentageComplete+"%</p><p>Shipment #"+i+"</p><a href='/view_shipment/"+i+"'>More Info</a></div>");

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
    bottomholder += "<p>"+shipments[i].pickUpDate+"</p>";
    let number = "9199348695"
    if (shipments[i].percentageComplete == 100) {
      bottomholder += "<button class='completed-shipment-tag'>Completed</button>"
    } else {
      bottomholder += "<button>Contact: "+number+"</button>"
    }
    bottomholder += "<p>"+shipments[i].deliveryDate+"</p>";
    bottomholder += "</div>";
    current.append(bottomholder);
  }
}
