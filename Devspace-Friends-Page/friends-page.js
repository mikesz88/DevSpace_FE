const token = localStorage.getItem("token");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const username = urlParams.get("username");

console.log(username);

function getContainerElements() {
  const avatar = document.getElementById("avatar");
  const favorites = document.getElementById("favorites");
  const top8friends = document.getElementById("top8friends");
  const biography = document.getElementById("biography");
}

const response = fetch(
  `https://devspace.cyclic.app/api/v1/auth/friendsProfile/richard-olpindo`,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
)
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.log(`Error ${err}`));
