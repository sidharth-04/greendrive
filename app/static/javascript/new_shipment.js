let autocompleteSrc;
let autocompleteDst;

$('document').ready(() => {
  $('#pickupdate').datepicker();
  $('#deliverydate').datepicker();

  autocompleteSrc = new google.maps.places.Autocomplete(
    document.querySelector('#pickuploc'),
    {
      types: ['establishment'],
      fields: ['place_id', 'geometry', 'name']
    }
  );
  autocompleteDst = new google.maps.places.Autocomplete(
    document.querySelector('#destloc'),
    {
      types: ['establishment'],
      fields: ['place_id', 'geometry', 'name']
    }
  );

  document.querySelector("#rangeslider").addEventListener('change', (e) => {
    updateRangeValues();
  });

  document.querySelector("#submit").addEventListener('click', (e) => {
    e.preventDefault();
    performValidation();
  });
});


async function getLatlong(address) {
  let geocoder = new google.maps.Geocoder();
  let result = [0,0]

  await geocoder.geocode({
    'address': address
  }, function(results, status) {
    let coords;
    if (status == 'OK') {
      // results[0].geometry.location.lat();
      result[0] = results[0].geometry.location.lat();
      result[1] = results[0].geometry.location.lng();
    }
  });

  if (result[0] == 0 && result[1] == 0) {
    return "not found";
  }
  return result;
}

function updateRangeValues() {
  let sliderVal = $('#rangeslider').val();
  $('#efficiency-level').text("efficiency: "+(100-sliderVal)+"%");
  $('#sustainability-level').text("sustainability: "+(sliderVal)+"%");
}

async function performValidation() {
  let pickuploc = $("#pickuploc").val().trim();
  let destloc = $("#destloc").val().trim();
  let pickupdate = $("#pickupdate").val().trim();
  let deliverydate = $("#deliverydate").val().trim();
  let cargoweight = $("#cargoweight").val().trim();

  if (pickuploc == "" || destloc == "" || pickupdate == "" || deliverydate == "" || cargoweight == "") {
    showError("Please fill in all the information correctly");
    return;
  }
  if (!(/^\d+$/.test(cargoweight))) {
    showError("Please use a number only for cargo weight");
    return;
  }
  let srcCoords = "not found";
  let dstCoords = "not found";
  try {
    srcCoords = await getLatlong(document.querySelector("#pickuploc").value);
    dstCoords = await getLatlong(document.querySelector("#destloc").value);
  } catch(error) {
    showError("Please choose an appropriate place");
    return;
  }
  if (srcCoords == "not found" || dstCoords == "not found") {
    showError("Please choose an appropriate place");
    return;
  }
  submit(srcCoords, dstCoords, pickupdate, deliverydate, cargoweight);
}

function showError(msg) {
  $('#error-text').text(msg);
}

function submit(srcCoords, dstCoords, pickupdate, deliverydate, cargoweight) {
  // Send data to backend
  let sliderVal = $('#rangeslider').val();
  let time = sliderVal/100;
  let sustainability = (100-sliderVal)/100;
  json = {
    "pickUpLocation0": srcCoords[0],
    "pickUpLocation1": srcCoords[1],
    "destination0": dstCoords[0],
    "destination1": dstCoords[1],
    "pickUpDate": pickupdate,
    "deliveryDate": deliverydate,
    "cargoweight": cargoweight,
    "time_fac": time,
    "sustainability_fac": sustainability
  };

  console.log(json);
  let xhr = new XMLHttpRequest();
  xhr.open('POST', '/new_shipment', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    let result = xhr.responseText;
    console.log(result);
    if (result == "success") {
      document.location = "/vendor_home";
    }
  };
  xhr.send(JSON.stringify(json));
}
