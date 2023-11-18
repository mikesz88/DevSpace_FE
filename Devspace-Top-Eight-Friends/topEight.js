const token = localStorage.getItem('token');

const fetchAndPopulateFriends = async () => {
  try {
    const response = await fetch(
      'https://devspace.cyclic.app/api/v1/auth/myFriendsUsernames',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const friendsData = await response.json();
    console.log(friendsData);

    if (response.ok) {
      const friendListSelect = document.getElementById('friendListSelect');

      friendListSelect.innerHTML = '';

      friendsData.data.forEach((username) => {
        const option = document.createElement('option');
        option.value = username;
        option.textContent = username;
        console.log({ option });
        friendListSelect.appendChild(option);
      });
    } else {
      console.log('Error fetching friends:', friendsData);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

window.addEventListener('load', fetchAndPopulateFriends);

const confirmTopFriendsButton = document.getElementById(
  'confirmTopFriendsButton'
);

const updateTopFriends = async () => {
  const friendListSelect = document.getElementById('friendListSelect');
  const selectedFriends = [...friendListSelect.selectedOptions].map(
    (option) => option.value
  );

  console.log({ selectedFriends });

  const requestData = {
    myChosenFriendsUsernames: selectedFriends,
  };

  try {
    const response = await fetch(
      'https://devspace.cyclic.app/api/v1/auth/createTop8Friends',
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      }
    );

    const responseData = await response.json();

    if (response.ok) {
      console.log('Success:', responseData);
      window.location.href = '../../../friends-dashboard.html';
    } else {
      console.log('Error:', responseData);
      alert(responseData.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

confirmTopFriendsButton.addEventListener('click', updateTopFriends);
