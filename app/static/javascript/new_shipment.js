$('document').ready(() =>{
  $('#pickupdate').datepicker();
  $('#deliverydate').datepicker();

  // let autocomplete;
  // autocomplete = new google.maps.places.Autocomplete(
  //   document.querySelector('#pickuploc'),
  //   {
  //
  //   }
  // );

  document.querySelector("#rangeslider").onchange = () => {
    updateRangeValues();
  };

  document.querySelector("#submit").addEventListener('click', (e) => {
    e.preventDefault();
    performValidation();
  });
});

function updateRangeValues() {
  let sliderVal = $('#rangeslider').val();
  $('#efficiency-level').text("efficiency: "+(100-sliderVal)+"%");
  $('#sustainability-level').text("sustainability: "+(sliderVal)+"%");
}

function performValidation() {
  let pickuploc = $("#pickuploc").val().trim();
  let destloc = $("#destloc").val().trim();
  let pickupdate = $("#pickupdate").val().trim();
  let deliverydate = $("#deliverydate").val().trim();
  let cargoweight = $("#cargoweight").val().trim();

  if (pickuploc == "" || destloc == "" || pickupdate == "" || deliverydate == "" || cargoweight == "") {
    showError("Please fill in all the information correctly");
  } else if (!(/^\d+$/.test(cargoweight))) {
    showError("Please fill in all the information correctly");
  } else {
    submit(pickuploc, destloc, pickupdate, deliverydate, cargoweight);
  }

  return true;
}

function showError(msg) {
  $('#error-text').text(msg);
}

function submit(pickuploc, destloc, pickupdate, deliverydate, cargoweight) {
  // Send data to backend
  json = {
    "pickuploc": pickuploc,
    "destloc": destloc,
    "pickupdate": pickupdate,
    "deliverydate": deliverydate,
    "cargoweight": cargoweight
  };

  let xhr = new XMLHttpRequest();
  url = 'https://us-central1-eng-oven-342617.cloudfunctions.net/function-1';
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    let result = xhr.responseText;
    console.log(result);
    if (result == "success") {
      document.location = "/vendor_home";
    } else {
      showError("Sorry, we could not find the desired location");
    }
  };
  xhr.send(json);
}
