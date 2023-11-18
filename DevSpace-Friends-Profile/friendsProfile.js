const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const username = urlParams.get('username');

console.log(username);

const token = localStorage.getItem('token');

function getContainerElements() {
  const avatarContainer = document.getElementById('avatarContainer');
  const favoritesContainer = document.getElementById('favoritesContainer');
  const top8FriendsContainer = document.getElementById('top8FriendsContainer');
  const biographyContainer = document.getElementById('biographyContainer');
}

const response = fetch(
  `https://devspace.cyclic.app/api/v1/auth/friendsProfile/${username}`,
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
)
  .then((res) => res.json())
  .then((data) => {
    setHTML(data.data);
  })
  .catch((err) => console.log(`Error ${err}`));

function setHTML(data) {
  document.body.style.backgroundColor = data.backgroundColor;

  document.documentElement.style.color = data.fontColor;

  const avatar = data.avatar;
  const username = data.username;
  const friendCount = data.friendCount;
  const firstName = data.firstName;
  const lastName = data.lastName;
  const favSlogan = data.favSlogan;
  const favMusic = data.favMusic;
  const topEight = data.topEight;
  const biography = data.biography;

  getContainerElements();

  document.body.style.backgroundColor = data.backgroundColor;

  document.body.style.color = data.complimentingColor;

  avatarContainer.innerHTML = `<img class="avatar" src="${avatar}" alt="Avatar of ${username}" />
  <h2 class='username'>${username}</h2>
  <p class="total-friends"> Total Friends: ${friendCount}</p>`;

  favoritesContainer.innerHTML = `
  <div class="name-details">
  <p class="first-name"> First Name: ${firstName}</p>
  <p class="last-name"> Last Name: ${lastName}</p>
  </div>
  <div class="favorites">
  <p class="favorite-slogan">${
    favSlogan ? favSlogan : 'I chose to be lazy and not pick a favorite slogan'
  }</p>
  <p class="favorite-music"> ${
    favMusic ? favMusic : 'I chose to be lazy and not pick my favorite music'
  }</p>
  </div>`;

  if (topEight && topEight.length > 0) {
    topEight.forEach((friend) => {
      top8FriendsContainer.innerHTML += `<div class="avatar-wrapper">
      <img class="avatar" src=${friend.avatarURL} alt="Avatar of ${friend.username}" />
    <p>${friend.username}</p>
    </div>`;

      top8FriendsContainer.addEventListener('click', () => {
        window.location.href = `../Devspace-Friends-Profile/friendsProfile.html?username=${friend.username}`;
      });
    });

    //  top8FriendsContainer.innerHTML =

    biographyContainer.innerHTML = `<div class="biography-section">
          <h2>Biography</h2>
          <p class="biography">${
            biography ? biography : 'I chose to be lazy and not write one'
          }</p>
        </div>`;
  }
}
