$(document).ready(() => {
  let id = $('.topholder h1').text().substr(-1);
  let xhr = new XMLHttpRequest();
  xhr.open('POST','/view_shipment/'+id,true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    let json = JSON.parse(xhr.response);
    addElements(json["Data"][id])
  };
  xhr.send(null);
});

function addElements(info) {
  info.percentageComplete = Math.trunc(info['path'][0]) % 100;
  $('#completionstatus').text(info.percentageComplete+"% Completed");
  if (info.percentageComplete == 100) {
    $('.status-tag').text('Shipment Completed');
  } else {
    $('.status-tag').text('Shipment In Progress');
  }
  $('.carbon-text').text((info.percentageComplete*23 % 1000)+"g\nCarbon");

  $('.midcontainer').append("<p>"+info.pickUpDate+"</p>");
  let progressholder = "<div class='progressholder'>";
  let journey = info.journeyDistribution;
  let leftToComplete = info.percentageComplete;
  for (let i = 0; i < journey.length; i ++) {
    if (leftToComplete >= journey[i][1]) {
      fillWidth = 100;
      leftToComplete -= journey[i][1];
    } else {
      fillWidth = leftToComplete/journey[i][1]*100;
      leftToComplete = 0;
    }
    progressholder += "<div class='journey-block' style='animation-delay: "+(i*50)+"ms; background: linear-gradient(to bottom, #A9F0D1 0% "+fillWidth+"%, white "+fillWidth+"% 100%); height: "+journey[i][1]+"%'>";
    progressholder += "<img src='../static/assets/"+journey[i][0]+".svg'>";
    let number = "9199348695";
    progressholder += "<button>Contact: "+number+"</button>"
    progressholder += "</div>";
    if (i != journey.length-1) {
      progressholder += "<img id='connector' src='../static/assets/Connector.svg'>";
    }
  }
  progressholder += "</div>";
  $('.midcontainer').append(progressholder);
  $('.midcontainer').append("<p>"+info.deliveryDate+"</p>");
}
