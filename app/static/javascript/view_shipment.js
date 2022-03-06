$(document).ready(() => {
  info = {
  	pickupDate: "12/3/22",
    deliveryDate: "22/3/22",
  	percentageComplete: 80,
  	carbonEmitted: 43,
  	journeyDistribution: [
      ["bike", 20, '1233234', 'fuel'],
      ["truck", 50, '2324342', 'diesel'],
      ["helicopter", 30, '1222344', 'hydrogen fusion']
    ]
  }

  $('#completionstatus').text(info.percentageComplete+"% Completed");
  if (info.percentageComplete == 100) {
    $('.status-tag').text('Shipment Completed');
  } else {
    $('.status-tag').text('Shipment In Progress');
  }
  $('.carbon-text').text(info.carbonEmitted+"g\nCarbon");
  addElements();
});

function addElements() {
  $('.midcontainer').append("<p>"+info.pickupDate+"</p>");
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
    progressholder += "<button>Contact: "+journey[i][2]+"</button>"
    progressholder += "</div>";
    if (i != journey.length-1) {
      progressholder += "<img id='connector' src='../static/assets/Connector.svg'>";
    }
  }
  progressholder += "</div>";
  $('.midcontainer').append(progressholder);
  $('.midcontainer').append("<p>"+info.deliveryDate+"</p>");
}
