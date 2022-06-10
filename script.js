const url = 'http://localhost:5500/api';
const renderApiResult = document.getElementById('renderApiResult'); // not in use
const userAvatar = document.getElementById('userAvatar');
const userName = document.getElementById('userName');
const userCity = document.getElementById('userCity');
const addUserBtn = document.getElementById('addUserBtn');
const modalForm = document.getElementById('modalForm');
const closeModalBtn = document.getElementById('closeModalBtn');
const userNameInput = document.getElementById('userNameInput');
const userCityInput = document.getElementById('userCityInput');
const userAvatarInput = document.getElementById('userAvatarInput');
const saveUserBtn = document.getElementById('saveUserBtn');
const userId = document.getElementById('userId');
const alert = document.getElementById('alert');
const api = document.getElementById('api');
const updateUserBtn = document.getElementById('updateUserBtn');
const deleteUserBtn = document.getElementById('deleteUserBtn');
const modalUpdateForm = document.getElementById('modalUpdateForm');
const closeUpdateModalBtn = document.getElementById('closeUpdateModalBtn');
const updateUserNameInput = document.getElementById('updateUserNameInput');
const updateUserCityInput = document.getElementById('updateUserCityInput');
const updateUserAvatarInput = document.getElementById('updateUserAvatarInput');
const saveUpdateBtn = document.getElementById('saveUpdateBtn');

const newUser = {
  name: '',
  avatar: '',
  city: ''
};

const updatedUser = {
  name: '',
  avatar: '',
  city: ''
};

function updateUserInfos() {
  updatedUser.name = updateUserNameInput.value;
  updatedUser.avatar = updateUserAvatarInput.value;
  updatedUser.city = updateUserCityInput.value;
}

function addUserInfos() {
  newUser.name = userNameInput.value;
  newUser.avatar = userAvatarInput.value;
  newUser.city = userCityInput.value;
}

async function getUsers() {
  const response = await fetch(url);
  const data = await response.json();
  api.textContent = JSON.stringify(data);
}

async function getUser() {
  const response = await fetch(`${url}/${userId.value}`);
  const data = await response.json();
  userAvatar.src = data.avatar;
  userName.textContent = data.name;
  userCity.textContent = data.city;
}

async function addUser(newUser) {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(newUser),
    headers: {
      'content-type': 'application/json; charset=UTF-8'
    }
  });
  const data = await response.json();
  alert.textContent = data;
}

async function updateUser(updatedUser) {
  const response = await fetch(`${url}/${userId.value}`, {
    method: 'PUT',
    body: JSON.stringify(updatedUser),
    headers: {
      'content-type': 'application/json; charset=UTF-8'
    }
  });
  const data = await response.json();
  alert.textContent = data;
}

async function deleteUser() {
  const response = await fetch(`${url}/${userId.value}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json; charset=UTF-8'
    }
  });
  const data = await response.json();
  alert.textContent = data;
}

window.addEventListener('load', () => {
  getUser().catch(err => console.error(err));
});

closeModalBtn.addEventListener('click', () => {
  modalForm.classList.remove('d-block');
});

closeUpdateModalBtn.addEventListener('click', () => {
  modalUpdateForm.classList.remove('d-block');
});

addUserBtn.addEventListener('click', () => {
  modalForm.classList.add('d-block');
});

updateUserBtn.addEventListener('click', () => {
  modalUpdateForm.classList.add('d-block');
});

saveUserBtn.addEventListener('click', () => {
  addUserInfos();
  addUser(newUser);
});

saveUpdateBtn.addEventListener('click', () => {
  updateUserInfos();
  updateUser(updatedUser);
  getUser();
});

deleteUserBtn.addEventListener('click', () => {
  deleteUser();
  getUser();
})
userId.addEventListener('change', () => {
  getUser().catch(err => console.error(err));
});
