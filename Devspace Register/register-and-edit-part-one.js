//const registerData = fetch("")
//.then((response) => response.text());

//console.log(registerData);

function verifyRegistrationInfo() {
  let errorLog = [];
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const username = document.getElementById("username").value;
  const jobTitle = document.getElementById("jobTitle").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password.length < 8) {
    errorLog.push("Passwords must be a minimum of 8 characters");
   } else if (password !== confirmPassword) {
    errorLog.push("Passwords do not match.");
    return false
  } else {
    alert("Registered Successfully");
    window.location.href = './register-and-edit-part-two.html'
  }
    alert(errorLog);
}
