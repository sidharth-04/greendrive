// const DATA = {
//     "deliveryDate": "03/09/2022",
//     "id": "03/01/2022",
//     "journeyDistribution": [
//         [
//             "bike",
//             20
//         ],
//         [
//             "ship",
//             40
//         ],
//         [
//             "lorry",
//             40
//         ]
//     ],
//     "path": [
//         560.4337856505688,
//         "4"
//     ],
//     "pickUpDate": "03/01/2022",
//     "percentageComplete": 40,
//     "pickUpLocation": [
//         18.5492471,
//         73.9424232
//     ],
//     "destinationLocation": [
//         18.5432183,
//         73.5846743
//     ]
// }

$(document).ready(() => {
  let id = $('.topholder h1').text().substr(-1);
  let xhr = new XMLHttpRequest();
  xhr.open('POST','/view_shipment/'+id,true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    let json = JSON.parse(xhr.response);
    addElements(json["Data"][id], id)
  };
  xhr.send(null);
});

function addElements(info, id) {
  info.percentageComplete = (Math.trunc(info['path'][0]) * (parseInt(id)+1)) % 100;
  info.pickUpLocation = [18.5492471, 73.9424232];
  info.destinationLocation = [18.5432183, 73.5846743];
  let geocoder = new google.maps.Geocoder();
  const latlngPick = {
    lat: parseFloat(info.pickUpLocation[0]),
    lng: parseFloat(info.pickUpLocation[1])
  };
  const latlngDrop = {
    lat: parseFloat(info.destinationLocation[0]),
    lng: parseFloat(info.destinationLocation[1])
  };
  geocoder.geocode({location: latlngPick}).then((response) => {
    if (response.results[0]) {
      let name = response.results[0].formatted_address;
      if (name.length > 25) name = name.substring(0,22)+"...";
      $('#pickupdetails').text(name+": "+info.pickUpDate);
    } else {
      $('#pickupdetails').text(info.pickUpDate);
    }
  });
  geocoder.geocode({location: latlngDrop}).then((response) => {
    if (response.results[0]) {
      let name = response.results[0].formatted_address;
      if (name.length > 25) name = name.substring(0,22)+"...";
      $('#destinationdetails').append(name+": "+info.deliveryDate);
    } else {
      $('#destinationdetails').append(info.deliveryDate);
    }
  });
  $('#completionstatus').text(info.percentageComplete+"% Completed");
  if (info.percentageComplete == 100) {
    $('.status-tag').text('Shipment Completed');
  } else {
    $('.status-tag').text('Shipment In Progress');
  }
  $('.carbon-text').text((info.percentageComplete*23 % 1000)+"g\nCarbon");

  let progressholder = $('#progressholder');
  let journey = info.journeyDistribution;
  let leftToComplete = info.percentageComplete;
  let toAdd = "";
  for (let i = 0; i < journey.length; i ++) {
    if (leftToComplete >= journey[i][1]) {
      fillWidth = 100;
      leftToComplete -= journey[i][1];
    } else {
      fillWidth = leftToComplete/journey[i][1]*100;
      leftToComplete = 0;
    }
    toAdd += "<div class='journey-block' style='animation-delay: "+(i*50)+"ms; background: linear-gradient(to bottom, #A9F0D1 0% "+fillWidth+"%, white "+fillWidth+"% 100%); height: "+journey[i][1]+"%'>";
    toAdd += "<img src='../static/assets/"+journey[i][0]+".svg'>"
    toAdd += "<p style='font-size: 3vw;'>"+fillWidth+"% Complete</p>";
    let number = "91933592";
    toAdd += "<button>Contact: "+number+"</button>";
    toAdd += "</div>";
    if (i != journey.length-1) {
      toAdd += "<img id='connector' src='../static/assets/Connector.svg'>";
    }
  }
  toAdd += "</div>";
  progressholder.append(toAdd);
}
