const token = localStorage.getItem("token");

function deleteMe() {
  fetch("https://devspace.cyclic.app/api/v1/auth/deleteMe", {
    method: "DELETE",
    Authorization: `Bearer ${token}`,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert(data.message);
    })
    .catch((error) => {
      alert(`ERROR: ${error}`);
    });
}