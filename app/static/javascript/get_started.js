$(document).ready(() => {
  document.querySelector("#submit").addEventListener('click', (e) => {
    e.preventDefault();
    performValidation();
  });
});

function performValidation() {
  let name = $("#name").val().trim();
  let businessname = $("#businessname").val().trim();
  let number = $("#number").val().trim();
  let username = $("#uname").val().trim();
  let password = $("#pword").val().trim();

  if (name == "" || businessname == "" || number == "" || username == "" || password == "") {
    showError("Please fill in all the information correctly");
  } else if (!(/^\d+$/.test(number))) {
    showError("Please fill in all the information correctly");
  } else {
    submit(name, businessname, number, username, password);
  }

  return true;
}

function showError(msg) {
  $('#error-text').text(msg);
}

function submit(name, businessname, number, username, password) {
  // Send data to backend
  json = {
    "name": name,
    "businessName": businessname,
    "number": number,
    "username": username,
    "password": password,
    "role": "vendor",
    "roleInfo": {

    }
  };

  let xhr = new XMLHttpRequest();
  xhr.open('POST', '/get_started', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    let result = xhr.responseText;
    if (result == "success") {
      document.location = "/login";
    } else {
      showError("Username already in use");
    }
  };
  xhr.send(JSON.stringify(json));
}
