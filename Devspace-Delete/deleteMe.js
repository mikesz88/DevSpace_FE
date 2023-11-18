function deleteMe() {
fetch("https://devspace.cyclic.app/api/v1/auth/deleteMe",{
  method: 'DELETE',
}).then (response => response.json())
.then(alert(response.message))
.catch((error)=>{alert(`ERROR: ${error}`)});
}