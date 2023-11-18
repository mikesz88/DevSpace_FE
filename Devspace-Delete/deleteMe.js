function deleteMe() {
fetch("https://devspace.cyclic.app/api/v1/auth/deleteMe",{
  method: 'DELETE',
}).then (response => response.json)
.catch((error)=>{console.log(`ERROR: ${error}`)});
}