const token = localStorage.getItem('token');

const fetchAndPopulateFriendUsernames = async () => {
  try {
    const response = await fetch(
      'https://devspace.cyclic.app/api/v1/auth/myFriendsUsernames',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const friendsData = await response.json();

    if (response.ok) {
      const friendListSelect = document.getElementById('friendListSelect');

      friendListSelect.innerHTML = '';

      friendsData.data.forEach((username) => {
        const option = document.createElement('option');
        option.value = username;
        option.textContent = username;
        friendListSelect.appendChild(option);
      });
    } else {
      console.log('Error fetching friends:', friendsData);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const removeSelectedFriends = async () => {
  const friendListSelect = document.getElementById('friendListSelect');
  const selectedOptions = [...friendListSelect.selectedOptions];

  const selectedValues = selectedOptions.map((option) => option.value);

  const requestData = {
    friendUsernames: selectedValues,
  };

  try {
    const response = await fetch(
      'https://devspace.cyclic.app/api/v1/auth/removeFriends',
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
      window.location.href =
        '/Devspace-Friends-Dashboard/friends-dashboard.html';
    } else {
      console.log('Error:', responseData);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const deleteFriendButton = document.getElementById('deleteFriendButton');
deleteFriendButton.addEventListener('click', removeSelectedFriends);

window.addEventListener('load', fetchAndPopulateFriendUsernames);
