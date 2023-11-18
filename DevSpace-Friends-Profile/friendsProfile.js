const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const username = urlParams.get('username');

console.log(username);

const token = localStorage.getItem("token");

function getContainerElements() {
  const avatarContainer = document.getElementById("avatarContainer");
  const favoritesContainer = document.getElementById("favoritesContainer");
  const top8FriendsContainer = document.getElementById("top8FriendsContainer");
  const biographyContainer = document.getElementById("biographyContainer");
}

function declareData (data) {
  const avatar = data.avatar;
  const friendCount = data.friendCount;
  const favSlogan = data.favSlogan;
  const favMusic = data.favMusic;
  const top8Friends = data.top8Friends;
  const biography = data.biography;
  console.log(avatar,friendCount,favSlogan,favMusic,top8Friends,biography)
}

const response = fetch(
  `https://devspace.cyclic.app/api/v1/auth/friendsProfile/${username}`,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
)
  .then((res) => res.json())
  .then((data) => {console.log(data);
  declareData(data.data)})
  .then(getContainerElements())
  .then(setHTML())
  .catch((err) => console.log(`Error ${err}`));

function setHTML() {
  
}