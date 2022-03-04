$(document).ready(() => {
  document.querySelector("#submit").addEventListener('click', (e) => {
    e.preventDefault();
    if (performValidation()) {
      submit();
      document.location = "/login";
    }
  });
});

function performValidation() {
  let name = $("#name");
  let businessname = $("#businessname");
  let number = $("#number");
  let username = $("#uname");
  let password = $("#pword");

  return true;
}

function submit() {
  // Send data to backend
  // json = {};
  //
  // let xhr = new XMLHttpRequest();
  // url = ''
  // xhr.open('POST', url, true);
  // xhr.setRequestHeader('Content-Type', 'application/json');
  // xhr.onload = function() {
  // };
  // xhr.send(json);
}
